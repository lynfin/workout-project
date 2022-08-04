import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button, Textarea } from "../styles";

function WorkoutList({ user }) {
  const [workouts, setWorkouts] = useState([]);
  const [newComments, setNewComments] = useState("");

  function deleteWorkout(id) {
    fetch(`/workouts/${id}`, {
      method: "DELETE",
    })
      .then((r) => {
        if (r.ok) {
          setWorkouts(workouts.filter((workout) => workout.id !== id));
        }
      })
      .catch((err) => console.log(err));
  }

  function updateWorkout(id, comments) {
    fetch(`/workouts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comments: newComments }),
    }).then((r) => {
      if (r.ok) {
        setWorkouts(
          workouts.map((workout) =>
            workout.id === id ? { ...workout, comments } : workout
          )
        );
      } else {
        r.json().then((err) => console.log(err));
      }
    });
  }

  useEffect(() => {
    fetch("/workouts")
      .then((r) => r.json())
      .then((workoutsArray) =>
        setWorkouts(
          workoutsArray.filter((workout) => workout.user.id === user.id)
        )
      );
  }, [user.id]); //this is new

  return (

    <div style={{width: '100%', minHeight: '100vh', background: '#d3d3d3', padding: '50px'}}>
    <Wrapper>
      {workouts.length > 0 ? (
        workouts.map((workout) => (
          <Workout key={workout.id}>
            <Box>
              <h3>{workout.date}</h3>
              <cite>By {workout.user.username}</cite>
              <p>
                <em style={{ textDecoration: "underline" }}>
                  How Was The Workout? <br />
                                  </em>
              </p>
                  <form onSubmit={() => updateWorkout(workout.id)}>
                    <Textarea
                      defaultValue={workout.comments}
                      onChange={(e) => setNewComments(e.target.value)}
                      style={{ height: "200px" }}
                    />
                    <Button>Update </Button>
                    <Button onClick={() => deleteWorkout(workout.id)}>
                      🗑️ Delete
                    </Button>
                  </form>

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
    </div>
  );
}

const Wrapper = styled.section`
  max-width: 800px;
  margin: 40px auto;
`;

const Workout = styled.article`
  margin-bottom: 24px;
  background: white;
  border-radius: 6px;
`;

export default WorkoutList;
