import axios from "axios"
import { authHeader, getUserType, REACT_APP_BASE_API_URL } from "../../../helpers/contants"
import { showErrorNotification, showSuccessNotification } from "../../../Shared/actions/alert.actions"
import { UPDATE_USER } from "../../Login/duck/action"
import { SAVE_KYC_RESPONSE_SUCCESS, SUBMIT_KYC_RESPONSE_REQUEST, SUBMIT_KYC_RESPONSE_ERROR, SUBMIT_KYC_RESPONSE_SUCCESS } from "./types"



export const saveKCYValues = (data) => {
    return (dispatch) => {
        dispatch(
            {
                type: SAVE_KYC_RESPONSE_SUCCESS ,
                data
            }
        )
    }
}


export const submitKYCForm = (details, history) => {
    console.log("form data: ", details)
    details = {
        json: details
    }
    const userType = getUserType()
    return async (dispatch) => {
        dispatch({ type: SUBMIT_KYC_RESPONSE_REQUEST });
        try {
            const { data } = await axios.post(
                `${REACT_APP_BASE_API_URL}/${userType}/kyc`,
                details,
                authHeader
            );

            console.log('submit', data)
            dispatch({
                type: SUBMIT_KYC_RESPONSE_SUCCESS,
            });
            dispatch({
                type: UPDATE_USER,
                value: "business_kyc",
                response: true
            })
            dispatch(
                showSuccessNotification(data?.message)
            );
            history.goBack()


                    } catch (error) {
            dispatch({
                type: SUBMIT_KYC_RESPONSE_ERROR,
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