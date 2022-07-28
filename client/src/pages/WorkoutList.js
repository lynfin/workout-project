import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";

function WorkoutList() {
  const [workouts, setWorkouts] = useState([]);

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
              <h2>{workout.title}</h2>
              <p>
                <em>Time to Complete: {workout.minutes_to_complete} minutes</em>
                &nbsp;·&nbsp;
                <cite>By {workout.user.username}</cite>
              </p>
              <ReactMarkdown>{workout.instructions}</ReactMarkdown>
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
