
import {
    SUBMIT_KYC_RESPONSE_REQUEST,
    SAVE_KYC_RESPONSE_SUCCESS,
    SUBMIT_KYC_RESPONSE_ERROR,
    SUBMIT_KYC_RESPONSE_SUCCESS
} from "./types"

const INITIAL_STATE = {
    submittingKyc: false,
};

export default function reducer(state = INITIAL_STATE, action = { type: "" }) {
    const { type } = action;
    switch (type) {
        case SUBMIT_KYC_RESPONSE_REQUEST:
            return {
                ...state,
                submittingKyc: true,
            };
        case SAVE_KYC_RESPONSE_SUCCESS:
            return {
                ...state,
                values: action.data,
            };
        case SUBMIT_KYC_RESPONSE_SUCCESS:
            return {
                ...state,
                submittingKyc: false,
            };
        case SUBMIT_KYC_RESPONSE_ERROR:
            return {
                ...state,
                submittingKyc: false,
            };
        default:
            return state;
    }
}