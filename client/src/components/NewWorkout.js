import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import MiniCard from "./Minicard";

import {
  Button,
  Error,
  FormField,
  Input,
  Label,
  Select,
  Textarea,
} from "../styles";

function pad2(number) {
  return (number < 10 ? "0" : "") + number;
}

function NewWorkout({ user }) {
  const current = new Date();
  const today = `${current.getFullYear()}-${pad2(
    current.getMonth() + 1
  )}-${pad2(current.getDate())}`;
  const [date, setDate] = useState(today);
  const [comments, setComments] = useState(`Comments: 
-
- 
-  
Exercises:
  `);

  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const [routines, setRoutines] = useState([]);
  const [selectedRoutine, setSelectedRoutine] = useState("Please Select...");
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    fetch("/routines")
      .then((r) => r.json())
      .then((routinesArray) => setRoutines(routinesArray));
  }, []);

  useEffect(() => {
    fetch("/exercises")
      .then((r) => r.json())
      .then((exerciseArray) => setExercises(exerciseArray));
  }, []);

  const exercisesToDisplay = exercises.filter(
    (exercise) => exercise.routine_id === parseInt(selectedRoutine)
  );

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
        history.push("/app-workouts");
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  function handleChange(exerciseName) {
    if (comments.includes(exerciseName)) {
      setComments(comments.replace("\n   " + exerciseName, ""));
    } else setComments(`${comments} \n   ${exerciseName}`);
  }

  function handleSelect(selection) {
    setSelectedRoutine(selection);
  }

  return (

    <div style={{width: '100%', background: '#d3d3d3', padding: '50px'}}>
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
            <Select onChange={(e) => handleSelect(e.target.value) }>
              <option>Please Select...</option>
              {routines.map((routine) => (
                <option key={routine.id} value={routine.id} name={routine.name}>
                  {routine.name}
                </option>
              ))}
            </FormField>
          </form>
        </WrapperChild>

        <WrapperChild style={{ margin: "70px" }}>
          {exercisesToDisplay.map((exercise) => (
            <MiniCard exercise={exercise} handleChange={handleChange} />
          ))}
        </WrapperChild>
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.section`
  max-width: 1000px;
  min-width: fit-content;
  margin: 40px auto;
  padding: 16px;
  display: flex;
  gap: 24px;
  background: white;
  border-radius: 6px;
`;

const WrapperChild = styled.div`
  flex: 1;
`;

export default NewWorkout;
