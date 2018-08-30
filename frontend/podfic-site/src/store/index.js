import { createStore, combineReducers } from "redux";
import {podficReducer} from './podfics'

const reducer = combineReducers({
  podfics: podficReducer
});

export const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
