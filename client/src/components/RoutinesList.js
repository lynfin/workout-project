import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, ButtonFixedWidth } from "../styles";
import ExerciseCard from "./ExerciseCard";

function RoutinesList() {
  const [routines, setRoutines] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState({});

  function handleRoutineClick(e) {
    fetch(`/routines/${e.target.id}`)
      .then((r) => r.json())
      .then((routine) => {
        setExercises(routine.exercises);
      });
  }
  function handleExerciseClick(e) {
    const exercise = exercises.find(
      (exercise) => exercise.id === Number(e.target.id)
    );
    setSelectedExercise(exercise);
  }
  useEffect(() => {
    fetch("/routines")
      .then((r) => r.json())
      .then(setRoutines);
  }, []);

  return (
    <Wrapper>
      <RoutineBar>
        {routines.map((routine) => (
          <ButtonFixedWidth
            id={routine.id}
            key={routine.id}
            onClick={handleRoutineClick}
          >
            {routine.name.replace(" Day", "")}
          </ButtonFixedWidth>
        ))}
      </RoutineBar>
      <SplitScreen>
        <ExerciseSelectionContainer>
          <ExerciseList>
            {exercises.map((exercise, index) => (
              <ExerciseListEntry
                id={exercise.id}
                index={index}
                key={exercise.id}
                onClick={handleExerciseClick}
              >
                {exercise.name}
              </ExerciseListEntry>
            ))}
          </ExerciseList>
        </ExerciseSelectionContainer>
        <ExerciseDisplayContainer>
          <ExerciseCard exercise={selectedExercise} />
        </ExerciseDisplayContainer>
      </SplitScreen>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  max-width: 1200px;
  margin: 40px auto;
`;

const SplitScreen = styled.section`
  display: flex;
  flex-flow: row;
  height: 1600px;
`;

const ExerciseDisplayContainer = styled.div`
  background: #36393e;
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
  width: 75%;
  height: 100%;
`;

const Routine = styled.article`
  margin-bottom: 24px;
`;

const RoutineBar = styled.nav`
  display: flex;
  gap: 4px;
`;

// Exercise container layout
// FlexBox example here: https://javascript.plainenglish.io/how-to-react-vertical-scrolling-list-grid-with-flexbox-714a61a07c9
const ExerciseSelectionContainer = styled.div`
  background: #36393e;
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
  width: 25%;
  height: 100%;
`;
const ExerciseList = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-flow: column wrap;
`;

const ExerciseListEntry = styled.div`
  margin: 20px;
  background: #fff;
  height: 50px;
  width: 250px;
  border-radius: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
`;

export default RoutinesList;
