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


const INITIAL_STATE = {
    gettingReceiver: false,
    sendingMomo: false,
    sendingJavolin: false,
    sendingAirtime: false,
    gettingFee: false,
    gettingPLink:false,
    errMsg: "",
    gettingData: false,
    gettingBeneQuestions: false,
    gettingRate: false,
    addingBeneficiary: false,
    gettingBeneficiaries:false,
    bookingRate:false,
    instructingPayment: false,
    validatingIBAN: false,
    creatingWallet: false
};

export default function reducer(state = INITIAL_STATE, action = { type: "" }) {
    const { type } = action;

    switch (type) {
        case CREATE_WALLET_REQUEST:
            return {
                ...state,
                creatingWallet: true,
            };
        case CREATE_WALLET_SUCCESS:
            return {
                ...state,
                creatingWallet: false,
            };
        case CREATE_WALLET_ERROR:
            return {
                ...state,
                creatingWallet: false,
            };
        case GET_BENE_REQUEST:
            return {
                ...state,
                gettingBeneficiaries: true,
            };
        case GET_BENE_SUCCESS:
            return {
                ...state,
                beneficiaries: action.data,
                gettingBeneficiaries: false,
            };
        case GET_BENE_ERROR:
            return {
                ...state,
                gettingBeneficiaries: false,
            };
        case BOOK_RATE_REQUEST:
            return {
                ...state,
                bookingRate: true,
            };
        case BOOK_RATE_SUCCESS:
            return {
                ...state,
                bookingRate: false,
            };
        case BOOK_RATE_ERROR:
            return {
                ...state,
                bookingRate: false,
            };
        case INSTRUCT_PAYMENT_REQUEST:
            return {
                ...state,
                instructingPayment: true,
            };
        case INSTRUCT_PAYMENT_SUCCESS:
            return {
                ...state,
                instructingPayment: false,
            };
        case INSTRUCT_PAYMENT_ERROR:
            return {
                ...state,
                instructingPayment: false,
            };
        case ADD_BENE_REQUEST:
            return {
                ...state,
                addingBeneficiary: true,
            };
        case ADD_BENE_SUCCESS:
            return {
                ...state,
                beneficiaries:{
                    ...state.beneficiaries,
                    [action.data.id]: {
                        ...action.data
                    }
                },
                addingBeneficiary: false,
                
            };
        case CLEAR_BENE_DATA:
            return {
                ...state,
                defaultValues: ""
            };
        case ADD_BENE_ERROR:
            return {
                ...state,
                addingBeneficiary: false,
            };
        case AIRTIME_TRANSFER_REQUEST:
            return {
                ...state,
                sendingAirtime: true,
            };
        case AIRTIME_TRANSFER_SUCCESS:
            return {
                ...state,
                sendingAirtime: false,
            };
        case AIRTIME_TRANSFER_ERROR:
            return {
                ...state,
                sendingAirtime: false,
            };
        case JAVOLIN_TRANSFER_REQUEST:
            return {
                ...state,
                sendingJavolin: true,
            };
        case JAVOLIN_TRANSFER_SUCCESS:
            return {
                ...state,
                sendingJavolin: false,
            };
        case JAVOLIN_TRANSFER_ERROR:
            return {
                ...state,
                sendingJavolin: false,
            };
        case MOMO_TRANSFER_REQUEST:
            return {
                ...state,
                sendingMomo: true,
            };
        case MOMO_TRANSFER_SUCCESS:
            return {
                ...state,
                sendingMomo: false,
            };
        case MOMO_TRANSFER_ERROR:
            return {
                ...state,
                sendingMomo: false,
            };

        case GET_RATE_REQUEST:
            return {
                ...state,
                gettingRate: true,
            };
        case GET_RATE_SUCCESS:
            return {
                ...state,
                gettingRate: false,
            };
        case GET_RATE_ERROR:
            return {
                ...state,
                gettingRate: false,
            };
        case GET_RECEIVER_REQUEST:
            return {
                ...state,
                gettingReceiver: true,
            };
        case GET_RECEIVER_SUCCESS:
            return {
                ...state,
                gettingReceiver: false,
            };
        case GET_RECEIVER_ERROR:
            return {
                ...state,
                gettingReceiver: false,
            };
        case GET_FEE_REQUEST:
            return {
                ...state,
                gettingFee: true,
            };
        case GET_FEE_SUCCESS:
            return {
                ...state,
                gettingFee: false,
            };
        case GET_FEE_ERROR:
            return {
                ...state,
                gettingFee: false,
            };
        case GET_ERROR_MSG:
            return{
                ...state,
                errMsg: action.error
            }
        case GET_PREPAID_LINK_REQUEST:
            return {
                ...state,
                gettingPLink: true,
            };
        case GET_PREPAID_LINK_SUCCESS:
            return {
                ...state,
                gettingPLink: false,
            };
        case GET_PREPAID_LINK_ERROR:
            return {
                ...state,
                gettingPLink: false,
            };
        case VALIDATE_IBAN_REQUEST:
            return {
                ...state,
                validatingIBAN: true,
            };
        case VALIDATE_IBAN_SUCCESS:
            return {
                ...state,
                iban: action.data,
                validatingIBAN: false,
            };
        case VALIDATE_IBAN_ERROR:
            return {
                ...state,
                validatingIBAN: false,
            };
        case GET_PRERULES_REQUEST:
            return {
                ...state,
                gettingData: true,
            };
        case GET_PRERULES_SUCCESS:
            return {
                ...state,
                gettingData: false,
                prerules: action.data
            };
        case GET_PRERULES_ERROR:
            return {
                ...state,
                gettingData: false,
            };
        case GET_RULES_REQUEST:
            return {
                ...state,
                gettingBeneQuestions: true,
            };
        case GET_RULES_SUCCESS:
            return {
                ...state,
                gettingBeneQuestions: false,
                rules: action.data
            };
        case GET_FILTERED_RULES:
            return {
                ...state,
                filteredRules: action.data
            };
        case BENE_VALUES:
            return {
                ...state,
                defaultValues: {
                    ...state.defaultValues,
                    ...action.data
                }
            };
        case GET_RULES_ERROR:
            return {
                ...state,
                gettingBeneQuestions: false,
            };
        case CHANGE_REGION_URL:
            return {
                ...state,
                regionURL : action.data
            }
        
        default:
            return state;
    }
}
