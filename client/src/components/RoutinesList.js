import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, ButtonFixedWidth } from "../styles";

function RoutinesList() {
  const [routines, setRoutines] = useState([]);
  const [exercises, setExercises] = useState([]);

  function handleRoutineClick(e) {
    console.log(`${e.target} clicked`);
    console.log(e.target);
    fetch(`/routines/${e.target.id}`)
      .then((r) => r.json())
      .then((routine) => {
        console.log(routine.exercises);
        setExercises(routine.exercises);
      });
  }
  useEffect(() => {
    fetch("/routines")
      .then((r) => r.json())
      .then(setRoutines);
  }, []);

  return (
    <Wrapper>
      <RoutineBar>
        {routines.length > 0 ? (
          routines.map((routine) => (
            <ButtonFixedWidth
              id={routine.id}
              key={routine.id}
              onClick={handleRoutineClick}
            >
              {routine.name.replace(" Day", "")}
            </ButtonFixedWidth>
          ))
        ) : (
          <h2></h2>
        )}
      </RoutineBar>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  max-width: 1200px;
  margin: 40px auto;
`;

const Routine = styled.article`
  margin-bottom: 24px;
`;

const RoutineBar = styled.nav`
  display: flex;
  gap: 4px;
`;

export default RoutinesList;
