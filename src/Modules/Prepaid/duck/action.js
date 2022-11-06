import axios from "axios";

import { 
    REACT_APP_CUSTOMER_SERVICE_API_URL,
    authHeader,
    REACT_APP_BASE_API_URL,
    getUserType,
} from "../../../helpers/contants";

import {
    
    showErrorNotification,
    showSuccessNotification,
} from "../../../Shared/actions/alert.actions";
import { normalizeIdArrayData, spiltErrors } from "../../../helpers/utils";

export const SAVE_PREPAID = "SAVE_PREPAID";
export const GET_PREPAID_APPLICATIONS_REQUEST = "GET_PREPAID_APPLICATIONS_REQUEST";
export const GET_PREPAID_APPLICATIONS_SUCCESS = "GET_PREPAID_APPLICATIONS_SUCCESS";
export const GET_PREPAID_APPLICATIONS_ERROR = "GET_PREPAID_APPLICATIONS_ERROR"
export const SUBMIT_PREPAID_APPLICATIONS_ERROR = "SUBMIT_PREPAID_APPLICATIONS_ERROR";
export const SUBMIT_PREPAID_APPLICATIONS_REQUEST = "SUBMIT_PREPAID_APPLICATIONS_REQUEST"
export const SUBMIT_PREPAID_APPLICATIONS_SUCCESS = "SUBMIT_PREPAID_APPLICATIONS_SUCCESS"




export const savePrepaid = (data) => {

   return {
            type: SAVE_PREPAID,
            data
   }
};


export const getPrepaid = () => {
    const userType = getUserType()
    return async (dispatch) => {
        dispatch({ type: GET_PREPAID_APPLICATIONS_REQUEST });
        try {
            let { data } = await axios.get(
                `${REACT_APP_BASE_API_URL}/${userType}/secure-card`,
                authHeader
            );

           data =  normalizeIdArrayData(data?.requests)
                dispatch({
                    type: GET_PREPAID_APPLICATIONS_SUCCESS,
                    data
                });

        } catch (error) {
            console.log(error.message)
        }
    };
};

export const submitPrepaid = (details, history) => {
    const userType = getUserType()
    return async (dispatch) => {
        dispatch({ type: SUBMIT_PREPAID_APPLICATIONS_REQUEST });
        try {
            const{data}=await axios.post(
                `${REACT_APP_BASE_API_URL}/${userType}/secure-card`,
                details,
                authHeader
            );
            showSuccessNotification(
                data?.message,
            );

            dispatch({
                type: SUBMIT_PREPAID_APPLICATIONS_SUCCESS,
                data
            });
          
            history.push("/wallet")

        } catch (error) {
            dispatch({
                type: SUBMIT_PREPAID_APPLICATIONS_ERROR,
            });
            if (!error.response) {
                dispatch(
                    showErrorNotification("Action failed", "Check your internet and try again")
                );
            } else {
                dispatch(
                    showErrorNotification(error?.response?.data?.message, spiltErrors(error?.response?.data?.errors))
                );
            }

        }
    };
};


