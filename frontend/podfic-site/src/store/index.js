import { createStore, combineReducers } from "redux";

const dummyReducer = (state = []) => state;

const reducer = combineReducers({
  reducer1: dummyReducer
});

export const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
