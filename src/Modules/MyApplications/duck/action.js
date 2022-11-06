import axios from "axios";

import {
    REACT_APP_CUSTOMER_SERVICE_API_URL,
    standardHeader
} from "../../../helpers/contants";

import {
    showErrorNotification,
    showSuccessNotification,
} from "../../../Shared/actions/alert.actions";
import { MORTGAGE_APPLY_SUCCESS } from "../../MortgageApply/duck/type";
import {
    ACCEPT_MORTGAGE_ERROR,
    ACCEPT_MORTGAGE_REQUEST,
    ACCEPT_MORTGAGE_SUCCESS,
    DECLINE_MORTGAGE_ERROR,
    DECLINE_MORTGAGE_REQUEST,
    DECLINE_MORTGAGE_SUCCESS,
    GET_APPLICATION_PROGRESS_REQUEST,
    GET_APPLICATION_PROGRESS_ERROR,
    GET_APPLICATION_PROGRESS_SUCCESS,
    APPLY_FOR_APPROVAL_REQUEST,
    APPLY_FOR_APPROVAL_ERROR,
    APPLY_FOR_APPROVAL_SUCCESS
} from "./type";


export const acceptMortgage = (id, bank_id, setVisible) => {
    return async (dispatch) => {
        dispatch({
            type: ACCEPT_MORTGAGE_REQUEST,
        });
        try {
            await axios.post(
                `${REACT_APP_CUSTOMER_SERVICE_API_URL}/mortgage/accept`,
                {
                    "mortgage_id": id,
                    "bank_id": bank_id
                },
                {
                    headers: {
                        Authorization: standardHeader.Authorization,
                        Accept: "application/json",
                    },
                }
            );
            dispatch({
                type: ACCEPT_MORTGAGE_SUCCESS,
                id,
                bank_id
            });
            dispatch(
                showSuccessNotification("Action Successful!", "Application accepted successfully")
            );
            setVisible(false)
        } catch (error) {
            dispatch({
                type: ACCEPT_MORTGAGE_ERROR,
            });
            if (!error.response) {
                dispatch(
                    showErrorNotification(
                        "Action failed!",
                        "Check your internet connection"
                    )
                );
            } else {
                dispatch(
                    showErrorNotification("Action failed!", `${error.response.status}`)
                );
                if (error.response.status === 401) {
                }
            }
        }
    };
};


export const declineMortgage = (id, bank_id, setVisible) => {
    return async (dispatch) => {
        dispatch({
            type: DECLINE_MORTGAGE_REQUEST,
        });
        try {
            // await axios.post(
            //     `${REACT_APP_CUSTOMER_SERVICE_API_URL}/application/decline/${id}`,
            //     id,
            //     {
            //         headers: {
            //             Authorization: standardHeader.Authorization,
            //             Accept: "application/json",
            //         },
            //     }
            // );
            dispatch({
                type: DECLINE_MORTGAGE_SUCCESS,
                id,
                bank_id
            });
            dispatch(
                showSuccessNotification("Action Successful!", "Application declined successfully")
            );
            setVisible(false)
        } catch (error) {
            dispatch({
                type: DECLINE_MORTGAGE_ERROR,
            });
            if (!error.response) {
                dispatch(
                    showErrorNotification(
                        "Action failed!",
                        "Check your internet connection"
                    )
                );
            } else {
                dispatch(
                    showErrorNotification("Action failed!", `${error.response.status}`)
                );
                if (error.response.status === 401) {
                }
            }
        }
    };
};


export const applyForPreApproval = (id, bank_id, setVisible) => {
    return async (dispatch) => {
        dispatch({
            type: APPLY_FOR_APPROVAL_REQUEST,
        });
        try {
           const {data} = await axios.post(
                `${REACT_APP_CUSTOMER_SERVICE_API_URL}/application/${id}/apply-for-approval`,
                {
                    "bank_id": bank_id
                },
                {
                    headers: {
                        Authorization: standardHeader.Authorization,
                        Accept: "application/json",
                    },
                }
            );
            // let status = "APPLIED_FOR_APPROVAL"
            dispatch({
                type: APPLY_FOR_APPROVAL_SUCCESS,
            });
            // console.log(data)
            // const newdata = normalizeIdData(data?)
            const application = data?.mortgage
            // const mortgage = data?.mortgage
            // const application = mortgage ? normalizeData(mortgage) : ""
            // console.log(application)
            console.log(data)
            dispatch({
                type: MORTGAGE_APPLY_SUCCESS,
                application
            })
            dispatch(
                showSuccessNotification(data?.message)
            );
            setVisible(false)
        } catch (error) {
            console.log("error: ",error)
            dispatch({
                type: APPLY_FOR_APPROVAL_ERROR,
            });
            if (!error.response) {
                dispatch(
                    showErrorNotification(
                        "Action failed!",
                        "Check your internet connection"
                    )
                );
            } else {
                dispatch(
                    showErrorNotification("Action failed!", `${error.response.status}`)
                );
                if (error.response.status === 401) {
                }
            }
        }
    };
};



export const getProgress = (id) => {
    return async (dispatch) => {
        dispatch({
            type: GET_APPLICATION_PROGRESS_REQUEST,
        });
        try {
          const {data} = await axios.get(
              `${REACT_APP_CUSTOMER_SERVICE_API_URL}/application/${id}/status-progress`,
                {
                    headers: {
                        Authorization: standardHeader.Authorization,
                        Accept: "application/json",
                    },
                }
            );
            let progress = data["statuses"]

            dispatch({
                type: GET_APPLICATION_PROGRESS_SUCCESS,
                id,
                progress
            });
        } catch (error) {
            console.log(error)
            dispatch({
                type: GET_APPLICATION_PROGRESS_ERROR,
            });
            if (!error.response) {

                dispatch(
                    showErrorNotification(
                        "Action failed!",
                        "Check your internet connection"
                    )
                );
            } else {
                dispatch(
                    showErrorNotification("Action failed!", `${error.response.status}`)
                );
                if (error.response.status === 401) {
                }
            }
        }
    };
};