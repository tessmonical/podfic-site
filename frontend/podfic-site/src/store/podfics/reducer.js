import { GET_ALL_PODFICS, GET_ONE_PODFIC } from "./actions";

const defaultState = [];

export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_ALL_PODFICS:
      return action.payload;
    case GET_ONE_PODFIC:
      return [...state, action.payload];
    default:
      return state;
  }
};
