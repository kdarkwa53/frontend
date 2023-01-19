import axios from "axios";

import { urlEcodedConfig, accounts } from "../../../helpers/contants";

import {
  showErrorNotification,
  showSuccessNotification,
} from "../../../Shared/actions/alert.actions";

import { spiltErrors } from "../helpers/utils";

export const SIGNUP_REQUEST = "SIGNUP_REQUEST";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_ERROR = "SIGNUP_ERROR";

export const signup = (details, history, accountType) => {
  details = {
    ...details,
    "pre_qualification_questions": "{}"
  }

  return async (dispatch) => {
    dispatch({ type: SIGNUP_REQUEST });
    try {
     await axios.post(
        `${accounts[accountType].baseURL}/register`,
        details,
        urlEcodedConfig
      );

      dispatch({
        type: SIGNUP_SUCCESS,
        data: details
      });
      dispatch(showSuccessNotification("Registeration Successful!"));
      history.push({pathname:"/phone", state: details})



    } catch (error) {
      dispatch({
        type: SIGNUP_ERROR,
      });
      if (error.response.status === 422) {
        const response = error.response.data;
        dispatch({
          type: SIGNUP_ERROR,
        });
        dispatch(
          showErrorNotification(response.message, spiltErrors(response.errors))
        );
      } else {
        dispatch({
          type: SIGNUP_ERROR,
        });
        if (!error.response) {
          dispatch(
            showErrorNotification("Action failed", "Something went wrong. Try again later.")
          );
        } else {
          dispatch(
            showErrorNotification(error?.response?.data?.message)
          );
        }
      }
    }
  };
};



