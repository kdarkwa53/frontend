import axios from "axios";



import {
  GETTING_PERMISSIONS_REQUEST,
  GETTING_PERMISSIONS_SUCCESS,
  GETTING_PERMISSIONS_ERROR,
  ADDING_ROLE_SUCCESS,
  ADDING_ROLE_REQUEST,
  ADDING_ROLE_ERROR,
  GETTING_ROLES_REQUEST,
  GETTING_ROLES_SUCCESS,
  GETTING_ROLES_ERROR
} from "./types"


import {
} from "../../../Modules/Login/duck/action"
import {REACT_APP_BASE_API_URL, getUserType } from "../../../helpers/contants";


import {
  authHeader
} from "../../../helpers/contants"
import { arrayToObjectByID, normalizeIdArrayData, normalizeIdData, normalizeOneIdData } from "../../../helpers/utils";
import { showErrorNotification, showSuccessNotification } from "../../../Shared/actions/alert.actions";

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

export const addingRole = (details) => {
  const userType = getUserType()

  return async (dispatch) => {
      dispatch({
          type: ADDING_ROLE_REQUEST,
      });
      try {
          const { data } = await axios.post(
              `${REACT_APP_BASE_API_URL}/${userType}/roles`,
              details,
              authHeader
          );

          dispatch({
              type: ADDING_ROLE_SUCCESS,
              // data : normalizeOneIdData(data)
          });

          dispatch(showSuccessNotification('Role added successfully'))
      } catch (error) {
          dispatch({
              type: ADDING_ROLE_ERROR,
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

export const getRoles = () => {
  const userType = getUserType()

  return async (dispatch) => {
      dispatch({
          type: GETTING_ROLES_REQUEST,
      });
      try {
          const { data } = await axios.get(
              `${REACT_APP_BASE_API_URL}/${userType}/roles`,
              authHeader
          );

          dispatch({
              type: GETTING_ROLES_SUCCESS,
              data : arrayToObjectByID(data)
          });
      } catch (error) {
          dispatch({
              type: GETTING_ROLES_ERROR,
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