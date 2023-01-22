import axios from "axios";
import {
    SET_PIN_SUCCESS,
    SET_PIN_ERROR,
    SET_PIN_REQUEST,
    GET_COUNTRIES,
    GET_CURRENCIES,
    GET_CURRENCIES_REQUEST,
    GET_CURRENCIES_ERROR,
    GET_COUNTRIES_REQUEST,
    GET_BANKS_AND_MOMOS_REQUEST,
    GET_BANKS_AND_MOMOS_SUCCESS,
    GET_BANKS_AND_MOMOS_ERROR,
    GET_WALLETS_ERROR,
    GET_WALLETS_SUCCESS,
    ADD_WALLET,
    GET_WALLETS_REQUEST,
    SAVE_FUNDING_SOURCE_REQUEST,
    SAVE_FUNDING_SOURCE_SUCCESS,
    SAVE_FUNDING_SOURCE_ERROR,
    GET_FUNDING_SOURCE,
    GET_CONVERSION_SUCCESS,
    GET_ALL_SECURITY_QUESTIONS_SUCCESS,
    GET_USER_SECURITY_QUESTIONS_SUCCESS,
    SET_SECURITY_QUESTION_SUCCESS,
    SET_SECURITY_QUESTION_ERROR,
    SET_SECURITY_QUESTION_REQUEST,
    VERIFY_IDENTITY_ERROR,
    VERIFY_IDENTITY_SUCCESS,
    VERIFY_IDENTITY_REQUEST,
    ADD_DEFAULT_CURRENCIES,
    SETCURRENT_ROUTE,
    GET_RULES_CURRENCIES,
    RUNNING_HEADER_REQUEST,
    RUNNING_HEADER_SUCCESS,
    RUNNING_HEADER_ERROR,
  
} from "./types"

import {
    ADD_PIN, VERIFY_USER
} from "../../../Modules/Login/duck/action"
import { REACT_APP_CUSTOMER_SERVICE_API_URL, REACT_APP_BASE_API_URL, getUserType } from "../../../helpers/contants";
import {
    showErrorNotification,
    showSuccessNotification,
} from "../../actions/alert.actions";


import {
    authHeader
} from "../../../helpers/contants"
import { arrayToObjectByID, normalizeIdArrayData, normalizeIdData } from "../../../helpers/utils";

export const setPin = (details, nextSlide) => {
    const { passcode } = details
    const userType = getUserType()
    return async (dispatch) => {
        dispatch({ type: SET_PIN_REQUEST });
        try {
            await axios.post(
                `${REACT_APP_BASE_API_URL}/${userType}/passcode/set`,
                details,
                authHeader
            );
            dispatch({
                type: SET_PIN_SUCCESS,
            });
            dispatch({
                type: ADD_PIN,
                passcode
            });
            nextSlide()
            dispatch(showSuccessNotification("Pin set successfully!"));



        } catch (error) {
            dispatch({
                type: SET_PIN_ERROR,
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

export const setCurrentRoute = (data)=>{
return (dispatch) =>{
    return(
            dispatch({
                type: SETCURRENT_ROUTE,
                data
            })
        )
     
}
   
}
export const getCountries = () => {
    return async (dispatch) => {
        dispatch({
            type: GET_COUNTRIES_REQUEST,
        });
        try {
            const { data } = await axios.get(
                `${REACT_APP_BASE_API_URL}/countries`,
                authHeader
            );
            dispatch({
                type: GET_COUNTRIES,
                data
            });
        } catch (error) {
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



export const getDefaultCurrencies = () => {

    const account = getUserType()

    return async (dispatch) => {
        try {
            const {data} = await axios.get(
                `${REACT_APP_BASE_API_URL}/${account}/login`,
                authHeader
            );

    dispatch({
        type: ADD_DEFAULT_CURRENCIES,
        data: arrayToObjectByID(data.currencies)
    })


        } catch (error) {
            console.log(error)
        }
    };
};
export const getConvertion = (id) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(
                `${REACT_APP_BASE_API_URL}/currency/equivalence?value=1&from_currency_id=${id}`,
                authHeader
            );
            dispatch({
                type: GET_CONVERSION_SUCCESS,
                data
            });
        } catch (error) {
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

export const getAllSecurityQuestions= () => {
    const userType = getUserType()
    
    return async (dispatch) => {
        try {
            let { data } = await axios.get(
                `${REACT_APP_BASE_API_URL}/${userType}/security_question/get`,
                authHeader
            );
            
            
            data = normalizeIdArrayData(data)
            dispatch({
                type: GET_ALL_SECURITY_QUESTIONS_SUCCESS,
                data
            });
        } catch (error) {
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

export const getUserSecurityQuestions = () => {
    const userType = getUserType()
   
    return async (dispatch) => {
        try {
            let { data } = await axios.get(
                `${REACT_APP_BASE_API_URL}/${userType}/security_question/me`,
                authHeader
            );
            data = normalizeIdData(data?.questions)
            dispatch({
                type: GET_USER_SECURITY_QUESTIONS_SUCCESS,
                data
            });
        } catch (error) {
            // if (!error.response) {
            //     dispatch(
            //         showErrorNotification("Action failed", "Something went wrong. Try again later.")
            //     );
            // } else {
            //     dispatch(
            //         showErrorNotification(error?.response?.data?.message)
            //     );
            // }
        }
    };
}

export const getCurrencies = () => {
   
    return async (dispatch) => {
        dispatch({
            type: GET_CURRENCIES_REQUEST,
        });

        try {
            const { data } = await axios.get(
                `${REACT_APP_BASE_API_URL}/currencies`,
                authHeader
            );
            dispatch({
                type: GET_CURRENCIES,
                data: arrayToObjectByID(data.currencies)
            });
        } catch (error) {
            console.log(error)
            dispatch({
                type: GET_CURRENCIES_ERROR,
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

export const getRulesCurrencies = () => {
    const userType = getUserType()

    return async (dispatch) => {
        dispatch({
            type: GET_CURRENCIES_REQUEST,
        });

        try {
            const { data } = await axios.get(
                `${REACT_APP_BASE_API_URL}/${userType}/rules-currencies`,
                authHeader
            );
            dispatch({
                type: GET_RULES_CURRENCIES,
                data: data
            });
        } catch (error) {
            console.log(error)
            dispatch({
                type: GET_CURRENCIES_ERROR,
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

export const getWallets = () => {
    const userType = getUserType()
   
    return async (dispatch) => {
        dispatch({ type: GET_WALLETS_REQUEST });
        try {
            const { data } = await axios.get(
                `${REACT_APP_BASE_API_URL}/${userType}/savings-wallets`,
                authHeader
            );

            dispatch({
                type: GET_WALLETS_SUCCESS,
                data: normalizeIdData(data)
            });
            // dispatch(showSuccessNotification("Successful!"));
        } catch (error) {
            dispatch({
                type: GET_WALLETS_ERROR,
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
}

export const getBanksAndMomos = () => {
    return async (dispatch) => {
        dispatch({ type: GET_BANKS_AND_MOMOS_REQUEST });   
        try {
            const { data } = await axios.get(
                `${REACT_APP_BASE_API_URL}/banks-and-momos`,
                authHeader
            );

            dispatch({
                type: GET_BANKS_AND_MOMOS_SUCCESS,
                data
            });
            // dispatch(showSuccessNotification("Successful!"));
        } catch (error) {
            dispatch({
                type: GET_BANKS_AND_MOMOS_ERROR,
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

export const getFundingSource = () => {
    return async (dispatch) => {
        const userType = getUserType()
   
        try {
            let { data } = await axios.get(
                `${REACT_APP_BASE_API_URL}/${userType}/funding-sources`,
                authHeader
            );

            data = data["funding-sources"]
            dispatch({
                type: GET_FUNDING_SOURCE,
                data
            });
        } catch (error) {
          
        }
    };
}

export const saveFundSource = (details, form, visibleModal) => {
    details = {
        "account_number": details?.momo_number,
        "account_network": details?.momo_network,
        "name": details?.recepient
    }
    const userType = getUserType()
   
    
    return async (dispatch) => {
        dispatch({ type: SAVE_FUNDING_SOURCE_REQUEST });
        try {
           const {data}= await axios.post(
               `${REACT_APP_BASE_API_URL}/${userType}/funding-source`,
                details,
                authHeader
            );
            dispatch({
                type: SAVE_FUNDING_SOURCE_SUCCESS,
                data
            });
            
            dispatch(showSuccessNotification("Saved successfully!"));
            visibleModal(false)
            form.resetFields()
        } catch (error) {
            dispatch({
                type: SAVE_FUNDING_SOURCE_ERROR,
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

export const getRunningHeader = (currency) => {
    const userType = getUserType()   
    const details = {
        "from": currency,
        "value": 1,
        "to": [
            "USD","CAD","GHS","EUR","AED", "CFA", "CNY", "GBP",
        ]
    }
    return async (dispatch) => {
        dispatch({ type: RUNNING_HEADER_REQUEST });
        try {
            let { data } = await axios.post(
                `${REACT_APP_BASE_API_URL}/${userType}/spot-rate/running-header`,
                details,
                authHeader
            );

            data = {
                base: currency,
                currency: data
            }
            dispatch({
                type: RUNNING_HEADER_SUCCESS,
                data: data
            });

           
        } catch (error) {
            dispatch({
                type: RUNNING_HEADER_ERROR,
            });
            // if (!error.response) {
            //     dispatch(
            //         showErrorNotification("Action failed", "Something went wrong. Try again later.")
            //     );
            // } else {
            //     dispatch(
            //         showErrorNotification(error?.response?.data?.message)
            //     );
            // }
        }
    };
}
export const verifyIdentity = (details, modal) => {
    const userType = getUserType()
   
    return async (dispatch) => {
        dispatch({ type: VERIFY_IDENTITY_REQUEST });
        try {
            const { data } = await axios.post(
                `${REACT_APP_BASE_API_URL}/${userType}/selfie-verification`,
                details,
                authHeader
            );
            dispatch({
                type: VERIFY_IDENTITY_SUCCESS,
            });

            dispatch({
                type: VERIFY_USER,
                details
            })

            dispatch(showSuccessNotification(data?.message));
            modal(false)

        } catch (error) {
            dispatch({
                type: VERIFY_IDENTITY_ERROR,
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


export const setSecurityQuestion = (details, form, nextSlide) => {
    const userType = getUserType()
   
    details = {
        "security_question_id": details?.question,
        "answer": details?.answer,
    }

    return async (dispatch) => {
        dispatch({ type: SET_SECURITY_QUESTION_REQUEST });
        try {
            await axios.post(
                `${REACT_APP_BASE_API_URL}/${userType}/security_question/set`,
                details,
                authHeader
            );

            let id = details?.security_question_id

            dispatch({
                type: SET_SECURITY_QUESTION_SUCCESS,
                id
            });

            nextSlide()
            form.resetFields()

            
            dispatch(showSuccessNotification("Saved successfully!"));

        } catch (error) {
            dispatch({
                type: SET_SECURITY_QUESTION_ERROR,
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