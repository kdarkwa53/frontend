import axios from "axios";



import {
  GETTING_PERMISSIONS_REQUEST,
  GETTING_PERMISSIONS_SUCCESS,
  GETTING_PERMISSIONS_ERROR
} from "./types"


import {
} from "../../../Modules/Login/duck/action"
import {REACT_APP_BASE_API_URL, getUserType } from "../../../helpers/contants";


import {
  authHeader
} from "../../../helpers/contants"
import { arrayToObjectByID, normalizeIdArrayData, normalizeIdData } from "../../../helpers/utils";
import { showErrorNotification } from "../../../Shared/actions/alert.actions";

export const getPermissions = () => {
  const userType = getUserType()

  return async (dispatch) => {
      dispatch({
          type: GETTING_PERMISSIONS_REQUEST,
      });
      try {
          const { data } = await axios.get(
              `${REACT_APP_BASE_API_URL}/${userType}/permissions`,
              authHeader
          );

          dispatch({
              type: GETTING_PERMISSIONS_SUCCESS,
              data : arrayToObjectByID(data)
          });
      } catch (error) {
          dispatch({
              type: GETTING_PERMISSIONS_ERROR,
          });
          if (!error.response) {
              dispatch(
                  showErrorNotification("Action failed", "Check your internet and try again")
              );
          } else {
              dispatch(
                  showErrorNotification(error?.response?.data?.message)
              );
          }
      }
  };
}

