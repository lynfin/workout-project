import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import { Button, Error, FormField, Input, Label, Textarea } from "../styles";

function NewWorkout({ user }) {

  const current = new Date();
  const today = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`
  const [date, setDate] = useState(today);
  const [comments, setComments] = useState(`   Comments: 

  
  
  
  Exercises: `);
  

  
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const [routines, setRoutines] = useState([])
  const [selectedRoutine, setSelectedRoutine] = useState("Please Select...")
  const [exercises, setExercises] = useState([])
  const [checked, setChecked] = useState([])

  useEffect(() => {
    fetch("/routines")
    .then(r => r.json())
    .then(routinesArray => setRoutines(routinesArray))
  },[])

  useEffect(() => {
    fetch("/exercises")
    .then(r => r.json())
    .then(exerciseArray => setExercises(exerciseArray));
  },[])

  function handleSubmit(e) { 
    e.preventDefault(); 
    setIsLoading(true);
    fetch("/workouts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: date,
        comments: comments,
        routine_id: selectedRoutine,
      }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        history.push("/");
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  
  const exercisesToDisplay = exercises.filter(exercise => parseInt(exercise.routine_id) === parseInt(selectedRoutine))
  //const [filteredExercises, setFilteredExercises] = useState("")

  return (
    <Wrapper>
      <WrapperChild>
        <h2>Create Workout</h2>
        <form onSubmit={handleSubmit}>
          <FormField>
            <Label htmlFor="date">Date</Label>
            <Input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </FormField>
          <FormField>
            <Label>Routine</Label>
            <select  onChange={(e) => setSelectedRoutine(e.target.value)}>
              <option>Please Select...</option>
              {routines.map(routine => (
                  <option 
                  key={routine.id}
                  value={routine.id}
                  >{routine.name}</option>
              ))}
            </select>
          </FormField>
          <FormField>
            <Label htmlFor="comments">Comments</Label>
            <Textarea
              id="comments"
              rows="10"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
            />
            
          </FormField>
          <FormField>
            <Button color="primary" type="submit">
              {isLoading ? "Loading..." : "Submit Workout"}
            </Button>
          </FormField>
          <FormField>
            {errors.map((err) => (
              <Error key={err}>{err}</Error>
            ))}
          </FormField>
        </form>
      </WrapperChild>
      <WrapperChild>
        {/* <h1>{date}</h1>
        <p>
          &nbsp;·&nbsp;
          <cite>By {user.username}</cite>
        </p>
        <ReactMarkdown>{comments}</ReactMarkdown> */}
        {exercisesToDisplay.map(exercise => (
          <label key={exercise.id}>
            <input type="checkbox" value={exercise.name} onChange={(e) => setComments(`${comments} -${e.target.value}    `)}></input>
            <span>{exercise.name}&nbsp;&nbsp;&nbsp;&nbsp;</span>
          </label>
        ))}
      </WrapperChild>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  max-width: 1000px;
  margin: 40px auto;
  padding: 16px;
  display: flex;
  gap: 24px;
`;

const WrapperChild = styled.div`
  flex: 1;
`;

export default NewWorkout;


