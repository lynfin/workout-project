import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, ButtonFixedWidth } from "../styles";

function RoutinesList() {
  const [routines, setRoutines] = useState([]);
  function handleRoutineClick() {}
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
            <ButtonFixedWidth key={routine.id} onClick={handleRoutineClick}>
              {routine.name.replace(" Day", "")}
            </ButtonFixedWidth>
          ))
        ) : (
          <>
            <h2>No Routines Found</h2>
          </>
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
