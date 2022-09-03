import {
    ACCEPT_MORTGAGE_ERROR,
    ACCEPT_MORTGAGE_REQUEST,
    ACCEPT_MORTGAGE_SUCCESS,
    DECLINE_MORTGAGE_ERROR,
    DECLINE_MORTGAGE_REQUEST,
    DECLINE_MORTGAGE_SUCCESS,
    GET_APPLICATION_PROGRESS_ERROR,
    GET_APPLICATION_PROGRESS_REQUEST,
    GET_APPLICATION_PROGRESS_SUCCESS,
    APPLY_FOR_APPROVAL_REQUEST,
    APPLY_FOR_APPROVAL_SUCCESS,
    APPLY_FOR_APPROVAL_ERROR
} from "./type";

const INITIAL_STATE = {
    acceptingApplication: false,
    decliningApplication: false,
    gettingProgress: false,
    appyingForApproval: false,
    loading:false
};



export default function reducer(state = INITIAL_STATE, action = { type: "" }) {
    const { type } = action;

    switch (type) {
        case GET_APPLICATION_PROGRESS_REQUEST:
            return {
                ...state,
                gettingProgress: true,
            };
        case GET_APPLICATION_PROGRESS_SUCCESS:
            return {
                ...state,
                applicationProgress:{
                    ...state.applicationProgress,
                    [action.id]:action.progress
                },
                gettingProgress: false,
            };
        case GET_APPLICATION_PROGRESS_ERROR:
            return {
                ...state,
                gettingProgress: false,
            };
        case ACCEPT_MORTGAGE_REQUEST:
            return {
                ...state,
                acceptingApplication: true,
            };
        case ACCEPT_MORTGAGE_SUCCESS:
            return {
                ...state,
                acceptingApplication: false,
            };
        case ACCEPT_MORTGAGE_ERROR:
            return {
                ...state,
                acceptingApplication: false,
            };
        case DECLINE_MORTGAGE_REQUEST:
            return {
                ...state,
                decliningApplication: true,
            };
        case DECLINE_MORTGAGE_SUCCESS:
            return {
                ...state,
                decliningApplication: false,
            };
        case DECLINE_MORTGAGE_ERROR:
            return {
                ...state,
                decliningApplication: false,
            };
        case APPLY_FOR_APPROVAL_REQUEST:
            return {
                ...state,
                appyingForApproval: true,
            };
        case APPLY_FOR_APPROVAL_SUCCESS:
            return {
                ...state,
                appyingForApproval: false,
            };
        case APPLY_FOR_APPROVAL_ERROR:
            return {
                ...state,
                appyingForApproval: false,
            };
        default:
            return state;
    }
}

