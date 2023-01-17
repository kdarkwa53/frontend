import axios from "axios";
import {
    JAVOLIN_TRANSFER_ERROR,
    JAVOLIN_TRANSFER_REQUEST,
    JAVOLIN_TRANSFER_SUCCESS,
    MOMO_TRANSFER_ERROR,
    MOMO_TRANSFER_REQUEST,
    MOMO_TRANSFER_SUCCESS,
    GET_RECEIVER_ERROR,
    GET_RECEIVER_REQUEST,
    GET_RECEIVER_SUCCESS,
    AIRTIME_TRANSFER_REQUEST,
    AIRTIME_TRANSFER_SUCCESS,
    AIRTIME_TRANSFER_ERROR,
    GET_FEE_REQUEST,
    GET_FEE_SUCCESS,
    GET_FEE_ERROR,
    GET_ERROR_MSG,
    GET_PREPAID_LINK_REQUEST,
    GET_PREPAID_LINK_SUCCESS,
    GET_PREPAID_LINK_ERROR,
    GET_PRERULES_REQUEST,
    GET_PRERULES_SUCCESS,
    GET_PRERULES_ERROR,
    GET_RULES_REQUEST,
    GET_RULES_SUCCESS,
    GET_RULES_ERROR,
    GET_FILTERED_RULES,
    BENE_VALUES,
    GET_RATE_REQUEST,
    GET_RATE_SUCCESS,
    GET_RATE_ERROR,
    ADD_BENE_REQUEST,
    ADD_BENE_SUCCESS,
    ADD_BENE_ERROR,
    GET_BENE_REQUEST,
    GET_BENE_SUCCESS,
    GET_BENE_ERROR,
    BOOK_RATE_REQUEST,
    BOOK_RATE_SUCCESS,
    BOOK_RATE_ERROR,
    INSTRUCT_PAYMENT_REQUEST,
    INSTRUCT_PAYMENT_SUCCESS,
    INSTRUCT_PAYMENT_ERROR,
    CLEAR_BENE_DATA,
    VALIDATE_IBAN_REQUEST,
    VALIDATE_IBAN_SUCCESS,
    VALIDATE_IBAN_ERROR,
    CHANGE_REGION_URL,
    CREATE_WALLET_REQUEST,
    CREATE_WALLET_ADD,
    CREATE_WALLET_SUCCESS,
    CREATE_WALLET_ERROR,
} from "./type"


import { formatNumber, getUserType, REACT_APP_BASE_API_URL, REACT_APP_CUSTOMER_SERVICE_API_URL, REACT_APP_URL} from "../../../helpers/contants";
import {
    showErrorNotification,
    showSuccessNotification,
} from "../../../Shared/actions/alert.actions";


import {
    authHeader
} from "../../../helpers/contants"
import { ADD_TRANSACTION } from "../../Savings/duck/type";
import { fileterRules, formatRegulatoryQuestions, getRulesDefaultValues, normalizeIdArrayData, normalizeIdData, normalizeOneIdData } from "../../../helpers/utils";
import { ADD_WALLET } from "../../../Shared/Components/duck/types";

export const javolinTranfer = (details, setPassCodeVisible, form, history) => {
    details = {
        "receiver_account": formatNumber(details?.info?.phone_number),
        "amount": details?.info?.amount,
        "app_passcode": details?.app_passcode
    }
    const userType = getUserType()
    return async (dispatch) => {
        dispatch({ type: JAVOLIN_TRANSFER_REQUEST });
        try {
            const { data } = await axios.post(
                `${REACT_APP_BASE_API_URL}/${userType}/services/javolin-transfer`,
                details,
                authHeader
            );
            dispatch({
                type: JAVOLIN_TRANSFER_SUCCESS,
            });
            dispatch(showSuccessNotification(data?.message));
            setPassCodeVisible(false)
            form.resetFields()
            history.push("/transactions");
        } catch (error) {
            dispatch({
                type: JAVOLIN_TRANSFER_ERROR,
            });
            if (!error.response) {
                dispatch(
                    showErrorNotification("Action failed", "Check your internet and try again")
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
    };
}

export const createWallet = (details, form, setIsModalVisible)=>{
    const userType = getUserType()

    return async (dispatch) => {
        dispatch({ type: CREATE_WALLET_REQUEST });
        try {
            const { data } = await axios.post(
                `${REACT_APP_BASE_API_URL}/${userType}/savings-wallets/`,
                details,
                authHeader
            );
            dispatch({
                type: CREATE_WALLET_SUCCESS,
            });
            dispatch(showSuccessNotification("Wallet created successfully!"));
          
            form.resetFields()
            setIsModalVisible(false)
            console.log(normalizeOneIdData(data))
            dispatch({
                type: ADD_WALLET,
                data:normalizeOneIdData(data)
            })

        } catch (error) {
            dispatch({
                type: CREATE_WALLET_ERROR,
            });
            if (!error.response) {
                dispatch(
                    showErrorNotification("Action failed", "Check your internet and try again")
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
    };
}
export const getTransactionFee = (details)=>{
    const userType = getUserType()
    return async (dispatch) => {
        dispatch({type: GET_FEE_REQUEST})
        try {
            const { data } = await axios.get(
                `${REACT_APP_BASE_API_URL}/${userType}/transaction/fee?module=${details?.module}&amount=${details?.amount}&currency_id=${details?.currency_id}&reference=${details?.reference}`,
                authHeader
            );
            dispatch({
                type: GET_FEE_SUCCESS
            })
            return data
            
        } catch (error) {
            dispatch({
                type: GET_FEE_ERROR
            }
            )
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
    }
}


export const changeRegionURL = (data)=>{
    return(dispatch)=>{
        dispatch({
            type: CHANGE_REGION_URL,
            data
        })
    }
}

export const accountTranfer = (details, setPassCodeVisible, form, history) => {
    const sourceWalletID = details?.info?.source?.id

    details = {
        "amount": details?.info?.amount,
        "to_savings_wallet_id": details?.info?.destination?.id
    }

    const userType = getUserType()
    return async (dispatch) => {
        dispatch({ type: JAVOLIN_TRANSFER_REQUEST });
        try {
            const { data } = await axios.post(
                `${REACT_APP_BASE_API_URL}/${userType}/savings-wallet/${sourceWalletID}/transfer`,
                details,
                authHeader
            );
            dispatch({
                type: JAVOLIN_TRANSFER_SUCCESS,
            });
            dispatch(showSuccessNotification(data?.message));
            setPassCodeVisible(false)
            form.resetFields()

            history.push("/transactions");
        } catch (error) {
            dispatch({
                type: JAVOLIN_TRANSFER_ERROR,
            });
            if (!error.response) {
                dispatch(
                    showErrorNotification("Action failed", "Check your internet and try again")
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
    };
}



export const airtimeTransfer = (details, setPassCodeVisible, form, history) => {
    return async (dispatch) => {
        dispatch({ type: AIRTIME_TRANSFER_REQUEST });
        try {
            await axios.post(
                `${REACT_APP_CUSTOMER_SERVICE_API_URL}/services/send-airtime`,
                details,
                authHeader
            );
            dispatch(showSuccessNotification("Airtime Transfer Successful!"));
            setPassCodeVisible(false)
            form.resetFields()
            dispatch({
                type: AIRTIME_TRANSFER_SUCCESS,
            });
            history.push("/transactions");
        } catch (error) {
            dispatch({
                type: AIRTIME_TRANSFER_ERROR,
            });
            if (!error.response) {
                dispatch(
                    showErrorNotification("Action failed", "Check your internet and try again")
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
    };
}


export const addBeneficiary = (details, history, type) => {
    console.log('my details: ',details)
    const userType = getUserType()
    return async (dispatch) => {
        dispatch({ type: ADD_BENE_REQUEST });
        try {
            let {data} = await axios.post(
                `${REACT_APP_BASE_API_URL}/${userType}/beneficiary`,
                details,
                authHeader
            );
            
            dispatch({
                type: ADD_BENE_SUCCESS,
                data: normalizeIdData(data)
            });
            dispatch(
                showSuccessNotification('Beneficiary Added Successfully')
            )
            
            dispatch({
                type: CLEAR_BENE_DATA
            })
            
            data = {
                ...data,
                type:type
            }

            console.log("data",data)

            if(type === 'forex'){
                history.push({
                    'pathname': '/send-money/forex',
                    'state': data
                })
            }else{
                history.push({
                    'pathname': '/send-money/international',
                    'state': data
                })
            }
           
          
        } catch (error) {
            dispatch({
                type: ADD_BENE_ERROR,
            });
            if (!error.response) {
                dispatch(
                    showErrorNotification("Action failed", "Check your internet and try again")
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
    };
}

export const addBeneficiary2 = (details, history, type, close) => {
    console.log('my details: ',details)
    const userType = getUserType()
    return async (dispatch) => {
        dispatch({ type: ADD_BENE_REQUEST });
        try {
            let {data} = await axios.post(
                `${REACT_APP_BASE_API_URL}/${userType}/beneficiary`,
                details,
                authHeader
            );
            
            dispatch({
                type: ADD_BENE_SUCCESS,
                data: data
            });
            dispatch(
                showSuccessNotification('Beneficiary Added Successfully')
            )
            
            dispatch({
                type: CLEAR_BENE_DATA
            })
            
            data = {
                ...data,
                type:type
            }

            console.log("data",data)

            close(false)
            // if(type === 'forex'){
            //     history.push({
            //         'pathname': '/send-money/forex',
            //         'state': data
            //     })
            // }else{
            //     history.push({
            //         'pathname': '/send-money/international',
            //         'state': data
            //     })
            // }
           
          
        } catch (error) {
            dispatch({
                type: ADD_BENE_ERROR,
            });
            if (!error.response) {
                dispatch(
                    showErrorNotification("Action failed", "Check your internet and try again")
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
    };
}
export const getBeneficiaries = () => {
    const userType = getUserType()
    return async (dispatch) => {
        dispatch({ type: GET_BENE_REQUEST });
        try {
         const {data} = await axios.get(
                `${REACT_APP_BASE_API_URL}/${userType}/beneficiaries`,
                authHeader
            );
            dispatch({
                type: GET_BENE_SUCCESS,
                data: normalizeIdArrayData(data)
            });
        } catch (error) {
            dispatch({
                type: GET_BENE_ERROR,
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

export const momoTranfer = (details, setPassCodeVisible, form, history) => {
    const userType = getUserType()
    return async (dispatch) => {
        dispatch({ type: MOMO_TRANSFER_REQUEST });
        try {
            const { data } = await axios.post(
                `${REACT_APP_BASE_API_URL}/${userType}/services/send-momo`,
                details,
                authHeader
            );

            dispatch({
                type: MOMO_TRANSFER_SUCCESS,
            });
            dispatch(showSuccessNotification(data?.message));
            setPassCodeVisible(false)
            form.resetFields()
            history.go("/transactions");
        } catch (error) {
            dispatch({
                type: MOMO_TRANSFER_ERROR,
            });
            if (!error.response) {
                dispatch(
                    showErrorNotification("Action failed", "Check your internet and try again")
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
    };
}
// book-deal
export const bookRate = (details)=>{
    const userType = getUserType()
    return async (dispatch) => {
        dispatch({ type: BOOK_RATE_REQUEST });
        try {
            const { data } = await axios.post(
                `${REACT_APP_BASE_API_URL}/${userType}/spot-rate/book-deal`,
                details,
                authHeader
            );
            dispatch({
                type: BOOK_RATE_SUCCESS,
            });
            console.log(data)
            return data

        } catch (error) {
            dispatch({
                type:BOOK_RATE_ERROR,
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

export const getRecentUsers = () => {
    return new Promise((res, rej) => {
        setTimeout(() => res(), 5000)
    })
}

export const instructCorpayment = (details, setPassCodeVisible, form, history) => {
    const userType = getUserType()
    return async (dispatch) => {
        dispatch({ type: INSTRUCT_PAYMENT_REQUEST });
        try {
            const {data} = await axios.post(
                `${REACT_APP_BASE_API_URL}/${userType}/spot-rate/instruct-payment`,
                details,
                authHeader
            );
            dispatch({
                type: INSTRUCT_PAYMENT_SUCCESS,
            });

            const resp = data?.message ? data?.message : 'Transaction Request sent!'
            dispatch(showSuccessNotification(resp))
           
            history.push('/business/transactions')

        } catch (error) {
            dispatch({
                type: INSTRUCT_PAYMENT_ERROR,
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

export const getRate = (details) => {
    const userType = getUserType()
    return async (dispatch) => {
        dispatch({ type: GET_RATE_REQUEST });
        try {
            const { data } = await axios.post(
                `${REACT_APP_BASE_API_URL}/${userType}/spot-rate/check-rate`,
                details,
                authHeader
            );
            dispatch({
                type: GET_RATE_SUCCESS,
            });
            console.log(data)
            return data
            
        } catch (error) {
            dispatch({
                type: GET_RATE_ERROR,
            });
            if (!error.response) {
                dispatch(
                    showErrorNotification("Action failed", "Check your internet and try again")
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
    };
}

export const getSpotRate = (details) => {
    const userType = getUserType()
    return async (dispatch) => {
        dispatch({ type: GET_RATE_REQUEST });
        try {
            const { data } = await axios.post(
                `${REACT_APP_BASE_API_URL}/${userType}/spot-rate/check-gen-rate`,
                details,
                authHeader
            );
            dispatch({
                type: GET_RATE_SUCCESS,
            });
            console.log(data)
            return data

        } catch (error) {
            dispatch({
                type: GET_RATE_ERROR,
            });
            if (!error.response) {
                dispatch(
                    showErrorNotification("Action failed", "Check your internet and try again")
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
    };
}
export const getPrepaidLink = (details, setPassCodeVisible, form, history) => {
    const userType = getUserType()
    console.log("hey",details)
    details = {
        "app_passcode": details?.app_passcode,
        "amount": details?.amount,
    }

    console.log(details)
    return async (dispatch) => {
        dispatch({ type: GET_PREPAID_LINK_REQUEST });
        try {
            const { data } = await axios.post(
                `${REACT_APP_BASE_API_URL}/${userType}/services/top-up/cards`,
                details,
                authHeader
            );

            dispatch({
                type: GET_PREPAID_LINK_SUCCESS,
            });

            dispatch({
                type: ADD_TRANSACTION,
                data: details
            })
            history.push("/transactions")

            // console.log(data?.zenithRedirectionUrl)
            window.open(data?.zenithRedirectionUrl, "_blank");
        } catch (error) {
            dispatch({
                type: GET_PREPAID_LINK_ERROR,
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

export const getPreRules = () => {
    const userType = getUserType()
    
    return async (dispatch) => {
        dispatch({ type: GET_PREPAID_LINK_REQUEST });
        try {
            const { data } = await axios.get(
                `${REACT_APP_BASE_API_URL}/${userType}/pre-rules`,
                authHeader
            );

            dispatch({
                type: GET_PRERULES_REQUEST,
            });

            dispatch({
                type: GET_PRERULES_SUCCESS,
                data: fileterRules(data, ['paymentMethods'])
            })

        } catch (error) {
            console.log(error)
            dispatch({
                type: GET_PRERULES_ERROR,
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

export const addBeneValues = (data)=>{
    return (dispatch) => {
                dispatch(
                    {
                        type: BENE_VALUES,
                        data
                    }
            )
        }
}


// export const getAllBeneficiaryRules =()=>{
//     axios.all([
//         getProfile(player),
//         getRepos(player)
//     ]).then( (data) =>{
//         var profile = data[0];
//         var repos = data[1];
//     }
// }
// function getAllBeneficiaryRules(pladetails, historyyer) {
//     return axios.all([
//         getProfile(player),
//         getRepos(player)
//     ]).then(function (data) {
//         var profile = data[0];
//         var repos = data[1];
       
//     });
// }

export const beneficiaryQuestions = (details, history, type) => {
    const { destinationCountry, bankCountry, bankCurrency, classification, paymentMethods } = details
    const userType = getUserType()

    return async (dispatch) => {
        dispatch({ type: GET_RULES_REQUEST });

        try {
            return Promise.all([
                axios.get(
                    `${REACT_APP_BASE_API_URL}/${userType}/rules?destinationCountry=${destinationCountry}&bankCountry=${bankCountry}&bankCurrency=${bankCurrency}&classification=${classification}&paymentMethods=${paymentMethods}`,
                    authHeader
                ),
                await axios.get(
                    `${REACT_APP_BASE_API_URL}/${userType}/rules-regulatory?destinationCountry=${destinationCountry}&bankCountry=${bankCountry}&bankCurrency=${bankCurrency}&classification=${classification}&paymentMethods=${paymentMethods}`,
                    authHeader
                ),
            ]).then(([
                rules,
                regRules
            ]) => {
               

                dispatch({
                    type: GET_RULES_SUCCESS,
                    data: rules.data
                })

                details = {
                    ...details,
                    preferredMethod: details?.paymentMethods
                }


                dispatch(
                    {
                        type: BENE_VALUES,
                        data: details
                    }
                )

                const regRulesFormated = regRules.data ? formatRegulatoryQuestions(regRules.data) : []

                //  Save default values
                dispatch({
                    type: BENE_VALUES,
                    data: getRulesDefaultValues(rules?.data?.rules)
                })

                let allRules = rules?.data?.rules.concat(regRulesFormated)
                console.log('allallRules - before: ', allRules)
                const filtedData = fileterRules(allRules, ["destinationCountry", "bankCountry", "bankCurrency", "classification", "preferredMethod", "paymentMethod", "paymentMethods","settlementMethods"])

                allRules = {
                    ...rules?.data,
                    rules:  filtedData
                }
                
                dispatch({
                    type: GET_FILTERED_RULES,
                    data: allRules
                })

                // Route to page to validate IBAN number
                if (allRules?.isIbanEnabled){
                    history.push({pathname:'/business/iban-validation',state: {type:type}})
                }else{
                    history.push({pathname:'/beneficiary', state:{type:type}})
                }
            })
        } catch (error) {
            console.log(error)
            dispatch({
                type: GET_RULES_ERROR,
            });
            if (!error.response) {
                dispatch(
                    showErrorNotification("Action failed", "Something went wrong. Try again")
                );
            } else {
                dispatch(
                    showErrorNotification(error?.response?.data?.message)
                );
            }
        }
    }
}


export const beneficiaryQuestions2 = (details, history, type) => {
    const { destinationCountry, bankCountry, bankCurrency, classification, paymentMethods } = details
    const userType = getUserType()

    return async (dispatch) => {
        dispatch({ type: GET_RULES_REQUEST });

        try {
            return Promise.all([
                axios.get(
                    `${REACT_APP_BASE_API_URL}/${userType}/rules?destinationCountry=${destinationCountry}&bankCountry=${bankCountry}&bankCurrency=${bankCurrency}&classification=${classification}&paymentMethods=${paymentMethods}`,
                    authHeader
                ),
                await axios.get(
                    `${REACT_APP_BASE_API_URL}/${userType}/rules-regulatory?destinationCountry=${destinationCountry}&bankCountry=${bankCountry}&bankCurrency=${bankCurrency}&classification=${classification}&paymentMethods=${paymentMethods}`,
                    authHeader
                ),
            ]).then(([
                rules,
                regRules
            ]) => {
               

                dispatch({
                    type: GET_RULES_SUCCESS,
                    data: rules.data
                })

                details = {
                    ...details,
                    preferredMethod: details?.paymentMethods
                }


                dispatch(
                    {
                        type: BENE_VALUES,
                        data: details
                    }
                )

                const regRulesFormated = regRules.data ? formatRegulatoryQuestions(regRules.data) : []

                //  Save default values
                dispatch({
                    type: BENE_VALUES,
                    data: getRulesDefaultValues(rules?.data?.rules)
                })

                let allRules = rules?.data?.rules.concat(regRulesFormated)
                console.log('allallRules - before: ', allRules)
                const filtedData = fileterRules(allRules, ["destinationCountry", "bankCountry", "bankCurrency", "classification", "preferredMethod", "paymentMethod", "paymentMethods","settlementMethods"])

                allRules = {
                    ...rules?.data,
                    rules:  filtedData
                }
                
                dispatch({
                    type: GET_FILTERED_RULES,
                    data: allRules
                })

                // Route to page to validate IBAN number
                return allRules
                // if (allRules?.isIbanEnabled){
                //     history.push({pathname:'/business/iban-validation',state: {type:type}})
                // }else{
                //     history.push({pathname:'/beneficiary', state:{type:type}})
                // }
            })
        } catch (error) {
            console.log(error)
            dispatch({
                type: GET_RULES_ERROR,
            });
            if (!error.response) {
                dispatch(
                    showErrorNotification("Action failed", "Something went wrong. Try again")
                );
            } else {
                dispatch(
                    showErrorNotification(error?.response?.data?.message)
                );
            }
        }
    }
}


export const validateIBAN = (details)=>{
    return async (dispatch) => {
        dispatch({ type: VALIDATE_IBAN_REQUEST });
        try {
            const { data } = await axios.get(
                `${REACT_APP_BASE_API_URL}/business/iban-validation?iban=${details}`,
                authHeader
            );

    
            dispatch({ type: VALIDATE_IBAN_SUCCESS,
            data
            });

            return data
        } catch (error) {
            console.log(error)
            dispatch({
                type: VALIDATE_IBAN_ERROR,
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

export const getRules = (details, history) => {
    const userType = getUserType()
    const { destinationCountry, bankCountry, bankCurrency, classification, paymentMethods } = details
    return async (dispatch) => {
        dispatch({ type: GET_PREPAID_LINK_REQUEST });
        try {
            const { data } = await axios.get(
                `${REACT_APP_BASE_API_URL}/${userType}/rules?destinationCountry=${destinationCountry}&bankCountry=${bankCountry}&bankCurrency=${bankCurrency}&classification=${classification}&paymentMethods=${paymentMethods}`,
                authHeader
            );

          
            dispatch({
                type: GET_RULES_REQUEST,
            });

            dispatch({
                type: GET_RULES_SUCCESS,
                data
            })

            // adding  default values
            details = {
                ...details,
                accountHolderCountry: details?.destinationCountry
            }

            dispatch(
                {
                    type: BENE_VALUES,
                    data: details
                }
            )

            let filtedData = fileterRules(data.rules, ["destinationCountry", "bankCountry", "bankCurrency", "classification", "preferredMethod", "accountHolderRegion", "paymentMethod", "paymentMethods", "settlementMethods"])
            filtedData = {
                ...data,
                rules: filtedData,
                
            }

            dispatch({
                type: GET_FILTERED_RULES,
                data: filtedData
            })

            dispatch({
                type: BENE_VALUES,
                data: getRulesDefaultValues(data)
            })
           
            history.push('/beneficiary')

        } catch (error) {
            console.log(error)
            dispatch({
                type: GET_RULES_ERROR,
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

export const getJavRecepientName = (details) => {
    const userType = getUserType()
    details = {
        "phone_number": details
    }
    return async (dispatch) => {
        dispatch({ type: GET_RECEIVER_REQUEST });
        try {
            const { data } = await axios.post(
                `${REACT_APP_BASE_API_URL}/${userType}/services/enquiry/javolin`,
                details,
                authHeader
            );

            dispatch({
                type: GET_RECEIVER_SUCCESS,
            });

           

            return data
        } catch (error) {
            dispatch({
                type: GET_RECEIVER_ERROR,
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

export const getDropdownListFromAPI = (link) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(
                `${REACT_APP_URL}${link}`,
                authHeader
            );
            // console.log(`link ${REACT_APP_URL}${link}`)
            return data
        } catch (error) {
            
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

export const getReceiverName = (details) => {
    const userType = getUserType()
    return async (dispatch) => {
        dispatch({ type: GET_RECEIVER_REQUEST });
        try {
            const { data } = await axios.post(
                `${REACT_APP_BASE_API_URL}/${userType}/services/enquiry/momo`,
                details,
                authHeader
            );

            dispatch({
                type: GET_RECEIVER_SUCCESS,
            });
            return data
        } catch (error) {
            dispatch({
                type: GET_RECEIVER_ERROR,
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

export const getAccountHolderName = (details) => {
    const userType = getUserType()
    return async (dispatch) => {
        dispatch({ type: GET_RECEIVER_REQUEST });
        try {
            const { data } = await axios.post(
                `${REACT_APP_BASE_API_URL}/${userType}/services/enquiry/bank`,
                details,
                authHeader
            );

            dispatch({
                type: GET_RECEIVER_SUCCESS,
            });
            // dispatch(showSuccessNotification("Successful!"));
            // history.go("/savings");
            return data
        } catch (error) {
            dispatch({
                type: GET_RECEIVER_ERROR,
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

export const momoTranfer2 = (details, setPassCodeVisible, form, history) => {

    details = {
        "account_number": details?.info?.momo_number,
        "amount": details.info?.amount,
        "remark": details?.info?.note,
        "app_passcode": details?.app_passcode,
        "account_name": details?.info?.recepient,
        "bank": details?.info?.momo_network
    }
    const userType = getUserType()
    return async (dispatch) => {
        dispatch({ type: MOMO_TRANSFER_REQUEST });
        try {
            await axios.post(
                `${REACT_APP_BASE_API_URL}/${userType}/services/send-to-bank-account`,
                details,
                authHeader
            );
            setPassCodeVisible(false)
            dispatch({
                type: MOMO_TRANSFER_SUCCESS,
            });
            dispatch(showSuccessNotification("Send money request successful"));
            form.resetFields()
            history.go("/transactions");

        } catch (error) {
            dispatch({
                type: MOMO_TRANSFER_ERROR,
            });

            if (!error.response) {
                dispatch(
                    showErrorNotification("Action failed", "Check your internet and try again")
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
    };
}

export const bankTranfer = (details, setPassCodeVisible, form, history) => {

    details = {
        "account_number": details?.info?.acc_number,
        "amount": details.info?.amount,
        "remark": details?.info?.note,
        "app_passcode": details?.app_passcode,
        "account_name": details?.info?.acc_name,
        "bank": details?.info?.bank_name
    }
    const userType = getUserType()

    return async (dispatch) => {
        dispatch({ type: MOMO_TRANSFER_REQUEST });
        try {
            await axios.post(
                `${REACT_APP_BASE_API_URL}/${userType}/services/send-to-bank-account`,
                details,
                authHeader
            );
            setPassCodeVisible(false)
            dispatch({
                type: MOMO_TRANSFER_SUCCESS,
            });
            dispatch(showSuccessNotification("Send money request successful"));
            form.resetFields()
            history.push('/transactions')
        } catch (error) {
            dispatch({
                type: MOMO_TRANSFER_ERROR,
            });

            if (!error.response) {
                dispatch(
                    showErrorNotification("Action failed", "Check your internet and try again")
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
    };
}