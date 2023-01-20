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
  GETTING_ROLES_ERROR,
  GETTING_USERS_REQUEST,
  GETTING_USERS_SUCCESS,
  GETTING_USERS_ERROR,
  ADDING_USER_REQUEST,
  ADDING_USER_SUCCESS,
  ADDING_USER_ERROR,
  GET_PENDING_TRANX_REQUEST,
  GET_PENDING_TRANX_SUCCESS,
  GET_PENDING_TRANX_ERROR,
  APPROVE_TRANX_REQUEST,
  APPROVE_TRANX_SUCCESS,
  APPROVE_TRANX_ERROR,
  DECLINE_TRANX_SUCCESS,
  DECLINE_TRANX_REQUEST,
  DECLINE_TRANX_ERROR,
  EDIT_USER_SUCCESS,
  APPROVE_USER_REQUEST,
  APPROVE_USER_SUCCESS,
  APPROVE_USER_ERROR,
  DECLINE_USER_REQUEST,
  DECLINE_USER_SUCCESS,
  DECLINE_USER_ERROR
} from "./types"


import {
} from "../../../Modules/Login/duck/action"
import {REACT_APP_BASE_API_URL, getUserType } from "../../../helpers/contants";


import {
  authHeader
} from "../../../helpers/contants"
import { arrayToObjectByID, normalizeIdArrayData, normalizeIdData, normalizeOneIdData, spiltErrors } from "../../../helpers/utils";
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
                  showErrorNotification("Action failed", "Something went wrong. Try again later.")
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
                  showErrorNotification("Action failed", "Something went wrong. Try again later.")
              );
          } else {
              dispatch(
                  showErrorNotification(error?.response?.data?.message)
              );
          }
      }
  };
}

export const editingRole = (details, role_id) => {
    const userType = getUserType()
  
    return async (dispatch) => {
        dispatch({
            type: ADDING_ROLE_REQUEST,
        });
        try {
            const { data } = await axios.put(
                `${REACT_APP_BASE_API_URL}/${userType}/roles/${role_id}`,
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
                    showErrorNotification("Action failed", "Something went wrong. Try again later.")
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
                  showErrorNotification("Action failed", "Something went wrong. Try again later.")
              );
          } else {
              dispatch(
                  showErrorNotification(error?.response?.data?.message)
              );
          }
      }
  };
}

export const getUsers = () => {
  const userType = getUserType()

  return async (dispatch) => {
      dispatch({
          type: GETTING_USERS_REQUEST,
      });
      try {
          const { data } = await axios.get(
              `${REACT_APP_BASE_API_URL}/${userType}/accounts`,
              authHeader
          );

          dispatch({
              type: GETTING_USERS_SUCCESS,
              data : arrayToObjectByID(data)
          });
      } catch (error) {
          dispatch({
              type: GETTING_USERS_ERROR,
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
  };
}

export const updateBusUser = (details, id)=>{
    const userType = getUserType()
    return async (dispatch) => {
        dispatch({
            type: ADDING_USER_REQUEST,
        });

        try {
            const { data } = await axios.put(
                `${REACT_APP_BASE_API_URL}/${userType}/accounts/${id}`,
                details,
                authHeader
            );
                console.log("editing: ",details, id)
            dispatch({
                type: EDIT_USER_SUCCESS,
                // data : details,
                // id:id
            });
            dispatch(showSuccessNotification('Updated successfully'))
        } catch (error) {
            dispatch({
                type: ADDING_USER_ERROR,
            });
            dispatch(showErrorNotification(error?.response?.data?.message))
        }
    }


}

export const addingUser = (details) => {
  const userType = getUserType()

  return async (dispatch) => {
      dispatch({
          type: ADDING_USER_REQUEST,
      });
      try {
          let { data } = await axios.post(
              `${REACT_APP_BASE_API_URL}/${userType}/accounts`,
              details,
              authHeader
          );
          

          console.log("final: ",data)

          dispatch({
              type: ADDING_USER_SUCCESS,
            //   data : normalizeOneIdData(data)
          });
          dispatch(showSuccessNotification('User added successfully'))
          return data
          
      } catch (error) {

          dispatch({
              type: ADDING_USER_ERROR,
          });
          if (!error.response) {

              dispatch(
                  showErrorNotification("Action failed", "Something went wrong. Try again later.")
              );
          } else {
            const errors = error.response.data.errors;
              dispatch(
                  showErrorNotification(error?.response?.data?.message, spiltErrors(errors))
              );
          }
      }
  };
}

export const getPendingTransactions = () => {
    const userType = getUserType()
  
    return async (dispatch) => {
        dispatch({
            type: GET_PENDING_TRANX_REQUEST,
        });
        try {
            const { data } = await axios.get(
                `${REACT_APP_BASE_API_URL}/${userType}/pending-transactions`,
                authHeader
            );
  
            dispatch({
                type: GET_PENDING_TRANX_SUCCESS,
                data : arrayToObjectByID(data)
            });
        } catch (error) {
            dispatch({
                type: GET_PENDING_TRANX_ERROR,
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
    };
  }
  
export const approveTransaction = (id) => {
    const userType = getUserType()
  
    return async (dispatch) => {
        dispatch({
            type: APPROVE_TRANX_REQUEST,
        });
        try {
            const { data } = await axios.post(
                `${REACT_APP_BASE_API_URL}/${userType}/pending-transactions/${id}/approve`, {id: id},
                authHeader
            );
  
            dispatch({
                type: APPROVE_TRANX_SUCCESS,
                data : id
            });
  
            dispatch(showSuccessNotification('Approved successfully'))
        } catch (error) {
            dispatch({
                type: APPROVE_TRANX_ERROR,
            });
            if (!error.response) {
                dispatch(
                    showErrorNotification("Action failed", "Something went wrong. Try again later.")
                );
            } else {
                dispatch(
                    showErrorNotification(error?.response?.data?.message, spiltErrors(error?.errors))
                );
            }
        }
    };
  }

  export const approveUser = (id) => {
    const userType = getUserType()
  
    return async (dispatch) => {
        dispatch({
            type: APPROVE_USER_REQUEST,
        });
        try {
            const { data } = await axios.post(
                `${REACT_APP_BASE_API_URL}/${userType}/account/${id}/approve`, {id: id},
                authHeader
            );
  
            dispatch({
                type: APPROVE_USER_SUCCESS,
            });
            
            const res = data?.message ? data?.message : "Approved user"
            dispatch(showSuccessNotification(res))
        } catch (error) {
            dispatch({
                type: APPROVE_USER_ERROR,
            });
            if (!error.response) {
                dispatch(
                    showErrorNotification("Action failed", "Something went wrong. Try again later.")
                );
            } else {
                dispatch(
                    showErrorNotification(error?.response?.data?.message, spiltErrors(error?.errors))
                );
            }
        }
    };
  }
  export const declineUser = (id) => {
    const userType = getUserType()
  
    return async (dispatch) => {
        dispatch({
            type: DECLINE_USER_REQUEST,
        });
        try {
            const { data } = await axios.post(
                `${REACT_APP_BASE_API_URL}/${userType}/pending-transactions/${id}/decline`, {id: id},
                authHeader
            );
  
            dispatch({
                type: DECLINE_USER_SUCCESS,
            });
            const res = data?.message ? data?.message : "Declined user"
            dispatch(showSuccessNotification(res))
        } catch (error) {
            dispatch({
                type: DECLINE_USER_ERROR,
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
    };
  }
  export const declineTransaction = (id) => {
    const userType = getUserType()
  
    return async (dispatch) => {
        dispatch({
            type: DECLINE_TRANX_REQUEST,
        });
        try {
            const { data } = await axios.post(
                `${REACT_APP_BASE_API_URL}/${userType}/pending-transactions/${id}/decline`, {id: id},
                authHeader
            );
  
            dispatch({
                type: DECLINE_TRANX_SUCCESS,
                data : id
            });
  
            dispatch(showSuccessNotification('Declined successfully'))
        } catch (error) {
            dispatch({
                type: DECLINE_TRANX_ERROR,
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
    };
  }

  
