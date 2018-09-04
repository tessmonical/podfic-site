import axios from "axios";
import { getPodficsUrl, getOnePodficUrl } from "../../data/endpoints";

export const GET_ALL_PODFICS = "PODFICS/GET_ALL";
export const GET_ONE_PODFIC = "PODFICS/GET_ONE";

export const fetchAllPodfics = () => (dispatch) => {
  axios.get(getPodficsUrl).then(podfics => {
    dispatch({
      type: GET_ALL_PODFICS,
      payload: podfics
    });
  });
};

export const fetchOnePodfic = (getOnePodficUrl) => (dispatch) => {
  axios.get(getOnePodficUrl).then(podfic => {
    dispatch({
      type: GET_ONE_PODFIC,
      payload: podfic
    });
  });
};
