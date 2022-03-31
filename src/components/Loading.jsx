import styled from "styled-components";
import react from "react";

export const StyledDiv = styled.div`
  width: 100%;
  height: calc(100vh - 100px);
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 300;

  color: rgb(37, 34, 34);
`;
function Loading() {
  return (
    <StyledDiv>
      <span>Loading...</span>
    </StyledDiv>
  );
}

export default Loading;
