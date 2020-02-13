import React, { useEffect, useReducer } from "react";
import styled from "styled-components";

import Form from "./Form";
import InputAction from "./InputAction";

import { colors, StyledButton, StyledHeading, StyledParagraph } from "./styles";
import { initialState, reducer } from "./state";
import { formatNumText, generateRandomNumber, isValidEntry } from "./utils";

export const StyledInputWrapper = styled.div`
  border: 1px solid ${colors.primary};
  padding: 0 1rem 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
`;

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
`;

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { currentScore, highNum, lowNum, randomNum, scores } = state;
  const mismatchedNums = lowNum > highNum;

  const updateNum = (key, val) => {
    dispatch({
      type: "NUM_UPDATE",
      payload: {
        [key]: val
      }
    });
  };

  const calculateScores = () => {
    dispatch({
      type: "NUMS_CALCULATE"
    });
  };

  const increaseAttempts = () => {
    dispatch({
      type: "ATTEMPTS_INCREASE"
    });
  };

  const resetNums = () => {
    dispatch({
      type: "NUMS_RESET"
    });
  };

  useEffect(() => {
    if (isValidEntry(highNum) && isValidEntry(lowNum)) {
      const randomNum = generateRandomNumber(lowNum, highNum);
      updateNum("randomNum", randomNum);
    }
  }, [highNum, lowNum]);

  const makeGuess = ({ guess }) => {
    if (
      !isValidEntry(highNum) ||
      !isValidEntry(lowNum) ||
      !isValidEntry(guess)
    ) {
      return alert("Only numbers please!");
    }

    if (mismatchedNums) {
      return alert(
        "Hey! Your numbers are mismatched. Make sure your low bound is actually lower than the high bound."
      );
    }

    if (Number(guess) === Number(randomNum)) {
      calculateScores();
      alert(`Woo hooo! You got it right! Score ${currentScore}`);
      return;
    }

    increaseAttempts();

    if (Number(guess) > Number(randomNum)) {
      return alert("Lower!");
    } else {
      return alert("Higher!");
    }
  };

  const boundInputConfig = [
    {
      action: updateNum,
      identifier: "highNum",
      text: "Upper Bound:",
      value: highNum
    },
    {
      action: updateNum,
      identifier: "lowNum",
      text: "Lower Bound:",
      value: lowNum
    }
  ];

  const formInputConfig = [
    {
      text: "Your Guess:",
      identifier: "guess",
      handleSubmit: makeGuess
    }
  ];

  return (
    <main>
      <StyledHeading>Guess the random number!</StyledHeading>
      <StyledParagraph>
        High Score:{" "}
        {scores.length && scores.sort((a, b) => b - a)[0].toLocaleString()}
      </StyledParagraph>
      <StyledSection>
        <StyledInputWrapper>
          <StyledParagraph>
            Guess the number between {formatNumText(lowNum)} and{" "}
            {formatNumText(highNum)}.
          </StyledParagraph>
          {boundInputConfig.map(({ action, identifier, text, value }) => (
            <InputAction
              identifier={identifier}
              inputProps={{
                onChange: e => action(identifier, e.target.value)
              }}
              key={identifier}
              text={text}
              value={value}
            />
          ))}
          <StyledButton onClick={resetNums}>Reset</StyledButton>
        </StyledInputWrapper>
        <Form
          btnText="Submit"
          formHeader="Make Your Guess"
          inputConfig={formInputConfig}
          onSubmit={makeGuess}
        />
      </StyledSection>
    </main>
  );
}
