import axios from "axios";

import {
    getUserType,
    REACT_APP_BASE_API_URL,
    standardHeader,
} from "../../../helpers/contants";
import {
    spiltErrors
} from "../../../helpers/utils";
import {
    showErrorNotification,
    showSuccessNotification,
} from "../../../Shared/actions/alert.actions";
import {
    MORTGAGE_APPLY_REQUEST,
    MORTGAGE_APPLY_SUCCESS,
    MORTGAGE_APPLY_ERROR,
    MORTGAGE_APPLY_FOR_PREVIEW,
    GET_MORTGAGE_APPLICATION,
    GET_MORTGAGE_APPLICATION_ERROR,
    GET_MORTGAGE_APPLICATION_REQUEST,
} from "./type";

import { normalizeApplicationsData } from "../../../helpers/utils"

export const getApplications = () => {
    const userType = getUserType()

    return async (dispatch) => {
        dispatch({
            type: GET_MORTGAGE_APPLICATION_REQUEST,
        });
        try {
            const { data } = await axios.get(
                `${REACT_APP_BASE_API_URL}/${userType}/applications`,

                {
                    headers: {
                        Authorization: standardHeader.Authorization,
                        Accept: "application/json",
                    },
                }
            );
            const applications = normalizeApplicationsData(data);
            dispatch({
                type: GET_MORTGAGE_APPLICATION,
                applications
            });
        } catch (error) {
            dispatch({
                type: GET_MORTGAGE_APPLICATION_ERROR,
            });
            if (!error.response) {
                // dispatch(
                //     showErrorNotification(
                //         "Action failed!",
                //         "Check your internet connection"
                //     )
                // );
            } else {
                // dispatch(
                //     showErrorNotification("Action failed!", `${error.response.status}`)
                // );
                // if (error.response.status === 401) {
                // }
            }
        }
    };
};

export const submitMortgageApplication = (application, history, setLoading) => {
    const userType = getUserType()
    return async (dispatch) => {
        dispatch({
            type: MORTGAGE_APPLY_REQUEST
        });
        setLoading(true)
        try {
            const { data } = await axios.post(
                `${REACT_APP_BASE_API_URL}/${userType}/mortgage/apply`,
                application,
                {
                    headers: {
                        "Authorization": standardHeader.Authorization,
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        // "withCredentials": true,
                    },
                }
            );
            application = { ...application, ...data, status: "APPLIED_FOR_PRE-APPROVAL" }
            dispatch({
                type: MORTGAGE_APPLY_SUCCESS,
                application,
            });

            dispatch(showSuccessNotification(
                "Success",
                "Your application has been submitted successfully"
            ));
            setLoading(false)

            history.push('/mortgage-success')
        } catch (error) {
            dispatch({
                type: MORTGAGE_APPLY_ERROR,
            });
            setLoading(false)
            if (error.response) {
                if (error?.response?.status === 422) {
                    const errors = error.response.data.errors;
                    dispatch(
                        showErrorNotification(
                            error.response.data.message,
                            spiltErrors(errors)
                        )
                    );
                }
                else {
                    dispatch({
                        type: MORTGAGE_APPLY_ERROR,
                    });
                    dispatch(
                        showErrorNotification("Action failed!", `${error.response.status}`)
                    );
                }
            }
            else if (!error.response) {
                dispatch({
                    type: MORTGAGE_APPLY_ERROR,
                });
                dispatch(showErrorNotification(
                    "Action failed!",
                    "Check your internet connection and try again"
                ))
            }

        }
    };
};

// function generateUID() {
//     // return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
//     return "001" + Math.floor(100000000 + Math.random() * 900000000)
// }

export const submitForPreview = (application) => {
    return {
        type: MORTGAGE_APPLY_FOR_PREVIEW,
        application,
    };
}
