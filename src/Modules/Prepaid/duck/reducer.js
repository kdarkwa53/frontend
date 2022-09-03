import {
    SAVE_PREPAID,
    GET_PREPAID_APPLICATIONS_REQUEST,
    GET_PREPAID_APPLICATIONS_SUCCESS,
    GET_PREPAID_APPLICATIONS_ERROR,
    SUBMIT_PREPAID_APPLICATIONS_ERROR,
    SUBMIT_PREPAID_APPLICATIONS_REQUEST,
    SUBMIT_PREPAID_APPLICATIONS_SUCCESS
    
} from "./action"


const INITIAL_STATE = {
    gettingPrepaid: false,
    submittingPrepaid: false,
    saved:{}
};





export default function reducer(state = INITIAL_STATE, action) {
    const { type } = action;
    // const id = generateID()
    switch (type) {
        case GET_PREPAID_APPLICATIONS_REQUEST:
            return {
                ...state,
                gettingPrepaid: true,
            };
        case GET_PREPAID_APPLICATIONS_SUCCESS:
            return {
                ...state,
                requests: {
                    ...state.prepaid,
                    ...action.data
                },
                gettingPrepaid: false,
            };
        case GET_PREPAID_APPLICATIONS_ERROR:
            return {
                ...state,
                gettingPrepaid: false,
            };
        case SAVE_PREPAID:
            return {
                ...state,
                saved: action.data
            };
        case SUBMIT_PREPAID_APPLICATIONS_REQUEST:
            return {
                ...state,
                submittingPrepaid: true,
            };
        case SUBMIT_PREPAID_APPLICATIONS_SUCCESS:
            return {
                ...state,
                ...action.data,
                submittingPrepaid: false,
            };
        case SUBMIT_PREPAID_APPLICATIONS_ERROR:
            return {
                ...state,
                submittingPrepaid: false,
            };
        default:
            return state;
    }
}