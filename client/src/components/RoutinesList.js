import { useEffect, useState } from "react";
import styled from "styled-components";
import { ButtonFixedWidth } from "../styles";
import ExerciseCard from "./ExerciseCard";

function RoutinesList() {
  const [routines, setRoutines] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState({});

  function retrieveExerciseGroup(id) {
    fetch(`/routines/${id}`)
      .then((r) => r.json())
      .then((routine) => {
        setExercises(routine.exercises);
      });
  }

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
      .then((routines) => {
        setRoutines(routines);
        retrieveExerciseGroup(routines[0].id);
      });
  }, []);

  useEffect(() => {
    if (exercises.length > 0) setSelectedExercise(exercises[0]);
  }, [exercises]);

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
                exercise={exercise}
                selectedExercise={selectedExercise}
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
//max-width: 1200px;
const Wrapper = styled.section`
  background: #d3d3d3;
  margin: 5px auto;
`;

const SplitScreen = styled.section`
  display: flex;
  flex-flow: row;
  height: 1600px;
`;

const ExerciseDisplayContainer = styled.div`
  background: #d3d3d3;
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
  width: 75%;
  height: 100%;
`;

const RoutineBar = styled.nav`
  background: #d3d3d3;
  display: flex;
  justify-content: center;
  gap: 4px;
  padding: 8px 16px;
`;

// Exercise container layout
// FlexBox example here: https://javascript.plainenglish.io/how-to-react-vertical-scrolling-list-grid-with-flexbox-714a61a07c9
const ExerciseSelectionContainer = styled.div`
  background: #d3d3d3;
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
  background: ${props => props.exercise === props.selectedExercise ? 'red' : '#fff'};
  color: ${props => props.exercise === props.selectedExercise ? '#fff' : 'black'};
  height: 50px;
  width: 250px;
  border-radius: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
    background: red;
    color: #fff
  }
`;

export default RoutinesList;
