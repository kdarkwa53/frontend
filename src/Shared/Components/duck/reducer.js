import {
    SET_PIN_ERROR,
    SET_PIN_SUCCESS,
    SET_PIN_REQUEST,
    GET_COUNTRIES,
    GET_CURRENCIES,
    GET_COUNTRIES_ERROR,
    GET_COUNTRIES_REQUEST,
    GET_CURRENCIES_REQUEST,
    GET_CURRENCIES_ERROR,
    GET_BANKS_AND_MOMOS_REQUEST,
    GET_BANKS_AND_MOMOS_SUCCESS,
    GET_BANKS_AND_MOMOS_ERROR,
    GET_WALLETS_ERROR,
    GET_WALLETS_SUCCESS,
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
    ADD_WALLET,
    


} from "./types"


const INITIAL_STATE = {
    settingPin: false
}

const INITIAL_STATE_2 = {
    gettingCountries: false,
    gettingCurrencies: false,
    gettingBanksAndMomos: false,
    savingFundSource: false,
    settingQuestion: false,
    userSecurityQuestions:{},
    fundingSource:[],
    gettingPermissions: false,
    verifyingIdentity: false,
    current_route: "/"
}

export const pinReducer = (state = INITIAL_STATE, action = { type: "" }) => {

    const { type } = action;
    switch (type) {
        case SET_PIN_REQUEST:
            return {
                ...state,
                settingPin: true,
            };
        case SET_PIN_SUCCESS:
            return {
                ...state,
                settingPin: false,
            };
        case SET_PIN_ERROR:
            return {
                ...state,
                settingPin: false,
            };
        default:
            return state;
    }
}

export const resources = (state = INITIAL_STATE_2, action = { type: "" }) => {
    const { type } = action;
    switch (type) {
        
        case SETCURRENT_ROUTE:
            return {
                ...state,
                current_route: action.data,
            };
        case VERIFY_IDENTITY_SUCCESS:
            return {
                ...state,
                verifyingIdentity: false,
            };
        case VERIFY_IDENTITY_REQUEST:
            return {
                ...state,
                verifyingIdentity: true,
            };
        case VERIFY_IDENTITY_ERROR:
            return {
                ...state,
                verifyingIdentity: false,
            };
        case GET_COUNTRIES_REQUEST:
            return {
                ...state,
                gettingCountries: true,
            };
        case GET_COUNTRIES:
            return {
                ...state,
                countries: action.data.countries,
                gettingCountries: false,
            };
        case GET_COUNTRIES_ERROR:
            return {
                ...state,
                gettingCountries: false,
            };
        case ADD_DEFAULT_CURRENCIES:
            return {
                ...state,
                defaultCurrencies: action.data
            }
        case GET_CURRENCIES:
            return {
                ...state,
                currencies: action.data,
                gettingCurrencies: false
            };
        case GET_RULES_CURRENCIES: 
            return {
                ...state,
                rules_currencies: action.data,
                gettingCurrencies: false
            };
        case GET_CURRENCIES_REQUEST:
            return {
                ...state,
                gettingCurrencies: true
            };
        case GET_CURRENCIES_ERROR:
            return {
                ...state,
                gettingCurrencies: false
            };
        case GET_BANKS_AND_MOMOS_REQUEST:
            return {
                ...state,
                gettingBanksAndMomos: true,
            };
        case GET_BANKS_AND_MOMOS_SUCCESS:
            return {
                ...state,
                banksAndMomos: action.data,
                gettingBanksAndMomos: false,
            };
        case GET_BANKS_AND_MOMOS_ERROR:
            return {
                ...state,
                gettingBanksAndMomos: false,
            };
        case GET_WALLETS_REQUEST:
            return {
                ...state,
                // gettingBanksAndMomos: true,
            };
        case GET_WALLETS_SUCCESS:
            return {
                ...state,
                wallets: action.data,
            };
        case GET_WALLETS_ERROR:
            return {
                ...state,
                // gettingBanksAndMomos: false,
            };
        case ADD_WALLET:
            return {
                ...state,
                wallets: {
                    ...state.wallets,
                    ...action.data
                },
            };
        case SAVE_FUNDING_SOURCE_REQUEST:
            return {
                ...state,
                savingFundSource: true,
            };
        case SAVE_FUNDING_SOURCE_SUCCESS:
            return {
                ...state,
                fundingSource: state.fundingSource.concat(action.data.data),
                savingFundSource: false
            };
        case SAVE_FUNDING_SOURCE_ERROR:
            return {
                ...state,
                savingFundSource: false
            };
        case GET_FUNDING_SOURCE:
            return {
                ...state,
                fundingSource: action.data
            };
        case GET_CONVERSION_SUCCESS:
            return {
                ...state,
                conversion: action.data
            }; 
        case GET_ALL_SECURITY_QUESTIONS_SUCCESS:
            return {
                ...state,
                securityQuestions: action.data
            };
        case GET_USER_SECURITY_QUESTIONS_SUCCESS:
            return {
                ...state,
                userSecurityQuestions: action.data,
            }; 
        case SET_SECURITY_QUESTION_REQUEST:
            return {
                ...state,
                settingQuestion: true
            };
        case SET_SECURITY_QUESTION_SUCCESS:
            return {
                ...state,
                userSecurityQuestions:{
                    ...state.userSecurityQuestions,
                    [action.id]:{
                        ...state.securityQuestions[action.id]
                    }
                },
                securityQuestions: {
                    ...state.securityQuestions,
                    [action.id]:{
                        ...state.securityQuestions[action.id],
                        selected: false

                    }
                },
                settingQuestion: false
            };
        case SET_SECURITY_QUESTION_ERROR:
            return {
                ...state,
                settingQuestion: false
            };
        default:
            return state;
    }
}

