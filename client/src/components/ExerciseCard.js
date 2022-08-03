import { React } from "react";
import styled from "styled-components";

function ExerciseCard({ exercise }) {
  return (
    <StyledRoot>
      <StyledContainer>
        <StyledPhoto src={exercise.image_url} alt={exercise.name} />
        <Title>{exercise.name}</Title>
        <Detail>
          <b>Target area: </b>
          {exercise.target_area}
        </Detail>
        <Detail>
          <b>Equipment: </b>
          {exercise.equipment}
        </Detail>
        <Description>{exercise.description}</Description>
      </StyledContainer>
    </StyledRoot>
  );
}

// Styling assistance from https://jsmanifest.com/build-reusable-responsive-react-card-with-styled-components/
const StyledRoot = styled.div`
  padding: 50px 12px;
`;

const StyledContainer = styled.div`
  max-width: 550px;
  width: 100%;
  margin: auto;
`;
//color: #fff;
const Title = styled.h2`
  font-weight: 300;
`;
//color: #ccc;
const Detail = styled.div`
  font-weight: 300;
  margin: 6px 0;
`;

//color: #fff;
const Description = styled.p`
  font-weight: 300;
`;

const StyledPhoto = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export default ExerciseCard;
