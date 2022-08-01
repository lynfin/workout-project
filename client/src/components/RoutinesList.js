import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";

function RoutinesList() {
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    fetch("/routines")
      .then((r) => r.json())
      .then(setRoutines);
  }, []);

  return (
    <Wrapper>
      {routines.length > 0 ? (
        routines.map((routine) => (
          <Routine key={routine.id}>
            <Box>
              <h2>{routine.name}</h2>
            </Box>
          </Routine>
        ))
      ) : (
        <>
          <h2>No Routines Found</h2>
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.section`
  max-width: 800px;
  margin: 40px auto;
`;

const Routine = styled.article`
  margin-bottom: 24px;
`;

export default RoutinesList;
