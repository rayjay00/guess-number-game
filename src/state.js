import { generateRandomNumber } from "./utils";

export const initialState = {
  currentScore: 1000000000,
  highNum: 100,
  lowNum: 0,
  randomNum: 0,
  scores: [],
  attempts: 0
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "ATTEMPTS_INCREASE":
      return {
        ...state,
        attempts: state.attempts + 1,
        currentScore: state.currentScore - state.attempts * 10
      };
    case "NUM_UPDATE":
      return {
        ...state,
        ...action.payload
      };
    case "NUMS_CALCULATE":
      console.log(state.currentScore);
      return {
        ...initialState,
        randomNum: generateRandomNumber(
          initialState.lowNum,
          initialState.highNum
        ),
        scores: [...state.scores, state.currentScore]
      };
    case "NUMS_RESET":
      return {
        ...initialState,
        randomNum: generateRandomNumber(
          initialState.lowNum,
          initialState.highNum
        ),
        scores: [...state.scores],
        attempts: 0
      };
    default:
      return state;
  }
};
