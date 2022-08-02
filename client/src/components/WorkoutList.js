import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";

function WorkoutList({ id }) {
  const [workouts, setWorkouts] = useState([]);
  
 

  function deleteWorkout(id) {
    fetch(`/workouts/${id}`, {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        setWorkouts(workouts.filter((workout) => workout.id !== id));
      }
    }).catch((err) => console.log(err));
  } 

  function updateWorkout(id, date, comments, routine_id) {
    fetch(`/workouts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ date, comments, routine_id }),
    }).then((r) => {
      if (r.ok) {
        setWorkouts(workouts.map((workout) => (workout.id === id ? { ...workout, date, comments, routine_id } : workout)));
      } else {
        r.json().then((err) => console.log(err));
      }
    });
  }


  useEffect(() => {
    fetch("/workouts")
      .then((r) => r.json())
      .then(setWorkouts);
  }, []);


  
return (
    <Wrapper>
      {workouts.length > 0 ? (
        workouts.map((workout) => (
          <Workout key={workout.id}>
            <Box>
              <h3>{workout.date}</h3>
              {/* <h2>{workout.name}</h2> */}
              <p>
              <em style={{textDecoration: 'underline'}}>How Was The Workout?
                <br/>
              {workout.comments}  {workouts.exercises}</em>
               <br/>
              {/* &nbsp;·&nbsp; */}
              <br/>
              <br/>
              <cite>By {workout.user.username}</cite>
            </p>
            <Button onClick={()=> deleteWorkout(workout.id)}>🗑️ Delete</Button>
            <Button onClick={()=> updateWorkout(workout.id)}>Update </Button>
            <ReactMarkdown>{workout.exercises}</ReactMarkdown>
            </Box>
          </Workout>
        ))
      ) : (
        <>
          <h2>No Workouts Found</h2>
          <Button as={Link} to="/new">
            Make a New Workout
          </Button>
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.section`
  max-width: 800px;
  margin: 40px auto;
`;

const Workout = styled.article`
  margin-bottom: 24px;
`;

export default WorkoutList;


