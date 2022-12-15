
import axios from "axios";
import Cookies from "js-cookie";


import {
    REACT_APP_BASE_API_URL,
    REACT_APP_CUSTOMER_SERVICE_API_URL,
    standardHeader,
    getUserType
} from "../../../helpers/contants";
import {
    spiltErrors
} from "../../../helpers/utils";
import {
    showErrorNotification,
    showSuccessNotification,
} from "../../../Shared/actions/alert.actions";
import { ADD_USER } from "../../Login/duck/action";
// import { ADD_USER } from "../../Login/duck/action";
import {
    GET_PROFILE_ERROR,
    GET_PROFILE_REQUEST,
    GET_PROFILE_SUCCESS,
    UPDATE_PROFILE_ERROR,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
} from "./type";


export const getProfile = () => {
    const userType = getUserType()
    return async (dispatch) => {
        dispatch({
            type: GET_PROFILE_REQUEST,
        });
        try {
            const { data } = await axios.get(
                `${REACT_APP_BASE_API_URL}/${userType}/profile`,

                {
                    headers: {
                        Authorization: standardHeader.Authorization,
                        Accept: "application/json",
                    },
                }
            );
            dispatch({
                type: GET_PROFILE_SUCCESS,
                data
            });
        } catch (error) {
            dispatch({
                type: GET_PROFILE_ERROR,
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
};

export const changePassword = (details, form) => {
    const userType = getUserType()
    return async (dispatch) => {
        dispatch({
            type: UPDATE_PROFILE_REQUEST,
        });
        try {
            const { data } = await axios.post(
                `${REACT_APP_BASE_API_URL}/${userType}/password/change`,
                details,
                {
                    headers: {
                        "Authorization": standardHeader.Authorization,
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        // "withCredentials": true,
                    },
                }
            );
            dispatch({
                type: UPDATE_PROFILE_SUCCESS,
                data
            });

            form.resetFields()
            dispatch(showSuccessNotification(data?.message))
        } catch (error) {
            dispatch({
                type: UPDATE_PROFILE_ERROR,
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

export const verifySecurityQuestion = (details, nextSlide)=>{
    const userType = getUserType()
    return async (dispatch) => {
        dispatch({
            type: UPDATE_PROFILE_REQUEST,
        });
        try {
            const { data } = await axios.post(
                `${REACT_APP_BASE_API_URL}/${userType}/security_question/verify`,
                details,
                {
                    headers: {
                        "Authorization": standardHeader.Authorization,
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        // "withCredentials": true,
                    },
                }
            );
            dispatch({
                type: UPDATE_PROFILE_SUCCESS,
                data
            });

            nextSlide()

            dispatch(showSuccessNotification(data?.message))
        } catch (error) {
            dispatch({
                type: UPDATE_PROFILE_ERROR,
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

export const changePin = (details, form) => {
    const userType = getUserType()
    return async (dispatch) => {
        dispatch({
            type: UPDATE_PROFILE_REQUEST,
        });
        try {
            const { data } = await axios.patch(
                `${REACT_APP_BASE_API_URL}/${userType}/passcode/change`,
                details,
                {
                    headers: {
                        "Authorization": standardHeader.Authorization,
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        // "withCredentials": true,
                    },
                }
            );
            dispatch({
                type: UPDATE_PROFILE_SUCCESS,
                data
            });

            form.resetFields()

            dispatch(showSuccessNotification(data?.message))
        } catch (error) {
            dispatch({
                type: UPDATE_PROFILE_ERROR,
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

export const sendMessage = (details, form) => {
    const userType = getUserType()
    return async (dispatch) => {
        dispatch({
            type: UPDATE_PROFILE_REQUEST,
        });
        try {
            const { data } = await axios.patch(
                `${REACT_APP_BASE_API_URL}/${userType}/passcode/change`,
                details,
                {
                    headers: {
                        "Authorization": standardHeader.Authorization,
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        // "withCredentials": true,
                    },
                }
            );
            dispatch({
                type: UPDATE_PROFILE_SUCCESS,
                data
            });

            form.resetFields()

            dispatch(showSuccessNotification(data?.message))
        } catch (error) {
            dispatch({
                type: UPDATE_PROFILE_ERROR,
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

export const updateProfile = (details) => {
    const userType = getUserType()
    return async (dispatch) => {
        dispatch({
            type: UPDATE_PROFILE_REQUEST,
        });
        try {
            const { data } = await axios.post(
                `${REACT_APP_BASE_API_URL}/${userType}/profile/update`,
                details,
                {
                    headers: {
                        "Authorization": standardHeader.Authorization,
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        // "withCredentials": true,
                    },
                }
            );

            Cookies.set("javCustomer", data?.user, {
                expires: 7,
            });
            const user = details
            dispatch({
                type: UPDATE_PROFILE_SUCCESS,
            });
            dispatch({
                type: ADD_USER,
                user
            });

            dispatch(showSuccessNotification(
                "Success",
                "Profile update was successful"
            ));
            // setLoading(false)

        } catch (error) {
            dispatch({
                type: UPDATE_PROFILE_ERROR,
            });
            // setLoading(false)
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
                        type: UPDATE_PROFILE_ERROR,
                    });
                    dispatch(
                        showErrorNotification("Action failed!", `${error.response.status}`)
                    );
                }
            }
            else if (!error.response) {
                dispatch({
                    type: UPDATE_PROFILE_ERROR,
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

// export const submitForPreview = (application) => {
//     return {
//         type: MORTGAGE_APPLY_FOR_PREVIEW,
//         application,
//     };
// }
