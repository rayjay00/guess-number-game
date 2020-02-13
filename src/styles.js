import styled from "styled-components";

export const colors = {
  primary: "#4157d4",
  secondary: "#41a1d4",
  tertiary: "#7541d4"
};

export const StyledButton = styled.button`
  border-radius: 0;
  padding: 1rem 2rem;
  background-color: ${props =>
    props.primary ? colors.primary : colors.secondary};
  color: white;
  font-size: 1rem;
  width: 100%;
`;

export const StyledHeading = styled.h1`
  text-align: center;
  font-family: Helvetica, sans-serif;
`;

export const StyledParagraph = styled.p`
  text-align: center;
  font-size: 1rem;
  font-family: Helvetica, sans-serif;
`;
