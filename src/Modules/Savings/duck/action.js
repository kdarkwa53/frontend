import axios from "axios";

import {
    getUserType,
    REACT_APP_BASE_API_URL,
    REACT_APP_CUSTOMER_SERVICE_API_URL,
    standardHeader,
} from "../../../helpers/contants";
// import { useSelector } from "react-redux";
import {
    spiltErrors
} from "../../../helpers/utils";
import {
    showErrorNotification,
    showSuccessNotification,
} from "../../../Shared/actions/alert.actions";
import { GET_ERROR_MSG } from "../../TransferMoney/duck/type";
import {
    ADD_DEPOSIT_REQUEST,
    ADD_DEPOSIT_SUCCESS,
    ADD_DEPOSIT_ERROR,
    GET_SAVINGS_SUCCESS,
    GET_SAVINGS_ERROR,
    GET_SAVINGS_REQUEST,
    MAKE_DEPOSIT_REQUEST,
    MAKE_DEPOSIT_SUCCESS,
    MAKE_DEPOSIT_ERROR,
} from "./type";


export const getTransactions = () => {
    const userType = getUserType()
    return async (dispatch) => {
        dispatch({
            type: GET_SAVINGS_REQUEST,
        });
        try {
            const { data } = await axios.get(
                `${REACT_APP_BASE_API_URL}/${userType}/transactions`,
                {
                    headers: {
                        Authorization: standardHeader.Authorization,
                        Accept: "application/json",
                    },
                }
            );
            dispatch({
                type: GET_SAVINGS_SUCCESS,
                data
            });
        } catch (error) {
            dispatch({
                type: GET_SAVINGS_ERROR,
            });
            if (!error.response) {
                // dispatch(
                //     showErrorNotification("Action failed", "Something went wrong. Try again later.")
                // );
            } else {
                // dispatch(
                //     showErrorNotification(error?.response?.data?.message)
                // );
            }
        }
    };
};





const exec = async (token, dispatch) => {
    const userType = getUserType()
    dispatch({
        type: MAKE_DEPOSIT_REQUEST,
    });
    try {
        const { data } = await axios.get(
            `${REACT_APP_BASE_API_URL}/${userType}/services/top-up/${token}/details`,
            {
                headers: {
                    Authorization: standardHeader.Authorization,
                    Accept: "application/json",
                },
            }
        );

        return data

    } catch (error) {
        dispatch({
            type: MAKE_DEPOSIT_ERROR,
        });
        if (!error.response) {
            dispatch(
                showErrorNotification("Action failed", "Something went wrong. Try again later.")
            );
        } else {
            dispatch(
                showErrorNotification(error?.response?.data?.message)
            );
            dispatch({
                type: GET_ERROR_MSG,
                error: error?.response?.data?.message
            });
        }
    }
}

export const makeDeposit = (details, setPasscode, showApproving,  history) => {
    details = {
        momo_number: details.info.momo_number,
        amount: details.info.amount,
        momo_network: "MTN",
        app_passcode: details.app_passcode
    }
    return async (dispatch) => {
        dispatch({
            type: MAKE_DEPOSIT_REQUEST,
        });
        const res = await dispatch(getTopupToken(details))
        // setPasscode(false)
        // showApproving(true)
        if (res?.token) {
            let timesRun = 0;
            setPasscode(false)
            showApproving(true)
            let intervalID = setInterval(async () => {

                //Check status after every second

                try {
                    let data = await exec(res?.token, dispatch)
                    timesRun += 1;
                    if (data.status === "SUCCESS") {
                        showApproving(false)
                        // setPasscode(false)


                        dispatch({
                            type: MAKE_DEPOSIT_SUCCESS,
                            data
                        });
                        dispatch(
                            showSuccessNotification(`Deposit of GHS ${data.amount} Successful`)
                        );
                        history.push('/savings')
                        clearInterval(intervalID)
                        return
                    }

                    //Timeout after 2 mins
                    // console.log("run Out: ", timesRun)
                    if (timesRun === 60) {
                        showApproving(false)
                        // setPasscode(false)
                        dispatch({
                            type: MAKE_DEPOSIT_ERROR,
                        });
                        
                        dispatch(
                            showErrorNotification("Timed Out", "Deposit was not successful")
                        );

                        clearInterval(intervalID)
                        return
                    }

                } catch (error) {
                    console.log("here")
                    dispatch({
                        type: MAKE_DEPOSIT_ERROR,
                    });
                    dispatch({
                        type: GET_ERROR_MSG,
                        error: error?.response?.data?.message
                    });
                }

                // showApproving(false)
            }, 2000)
        }
    };
};

export const getTopupToken = (details) => {
    const userType = getUserType()
    return async (dispatch) => {
        try {
            const { data } = await axios.post(
                `${REACT_APP_BASE_API_URL}/${userType}/services/top-up`,
                details,
                {
                    headers: {
                        Authorization: standardHeader.Authorization,
                        Accept: "application/json",
                    },
                }
            );
            dispatch(
                showSuccessNotification(data?.message)
            );
            return data
        } catch (error) {
            dispatch({
                type: MAKE_DEPOSIT_ERROR,
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
};

export const addDeposit = (details, history) => {
    return async (dispatch) => {
        dispatch({
            type: ADD_DEPOSIT_REQUEST,
        });
        try {
            // const { data } = await axios.post(
            //     `${REACT_APP_BASE_API_URL}/${userType}/mortgage/apply`,
            //     application,
            //     {
            //         headers: {
            //             "Authorization": standardHeader.Authorization,
            //             "Accept": "application/json",
            //             "Content-Type": "application/json",
            //             // "withCredentials": true,
            //         },
            //     }
            // );
            const date = new Date().toLocaleDateString('en-ZA');
            details['date'] = date

            dispatch({
                type: ADD_DEPOSIT_SUCCESS,
                details,
            });

            dispatch(showSuccessNotification(
                "Success",
                "Your deposit was successful"
            ));
            // setLoading(false)

            history.push('/transactions')
        } catch (error) {
            dispatch({
                type: ADD_DEPOSIT_ERROR,
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
                        type: ADD_DEPOSIT_ERROR,
                    });
                    dispatch(
                        showErrorNotification("Action failed!", `${error.response.status}`)
                    );
                }
            }
            else if (!error.response) {
                dispatch({
                    type: ADD_DEPOSIT_ERROR,
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
