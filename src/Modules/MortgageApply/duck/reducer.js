import {
    MORTGAGE_APPLY_REQUEST,
    MORTGAGE_APPLY_SUCCESS,
    MORTGAGE_APPLY_ERROR,
    MORTGAGE_APPLY_FOR_PREVIEW,
    GET_MORTGAGE_APPLICATION,
    GET_MORTGAGE_APPLICATION_ERROR,
    GET_MORTGAGE_APPLICATION_REQUEST,
} from "./type";

import {
    ACCEPT_MORTGAGE_SUCCESS,
    DECLINE_MORTGAGE_SUCCESS
} from "../../MyApplications/duck/type"
// import { ADD_DEPOSIT_SUCCESS } from "../../Savings/duck/type";
const INITIAL_STATE = {
    submittingApplication: false,
    gettingApplications: false,
};

const performAcceptUpdate = (bank_id, arr, action) => {
    const newArray = []
    // array.forEach(element => {

    // });
    arr.map(item => {
        if (item.bank.id === parseInt(bank_id)) {
            item = {
                ...item,
                status: action
            }
            newArray.push(item)
            return item
        }
        else {
            newArray.push(item)
            return item
        }
    })
    return newArray
}


export const getApplications = (state = INITIAL_STATE, action = { type: "" }) => {
    const { type } = action;

    switch (type) {
        case GET_MORTGAGE_APPLICATION_REQUEST:
            return {
                ...state,
                gettingApplications: true,
            };
        case GET_MORTGAGE_APPLICATION:
            return {
                ...state,
                ...action.applications,
                gettingApplications: false,
            };
        case GET_MORTGAGE_APPLICATION_ERROR:
            return {
                ...state,
                gettingApplications: false,
            };
        case MORTGAGE_APPLY_SUCCESS:
            return {
                ...state,
                entities: {
                    ...state.entities,
                    applications: {
                        ...state.entities.applications,
                        [action.application.id]: {
                            ...action.application
                        }
                    }
                },
                submittingApplication: false,
            };
        case ACCEPT_MORTGAGE_SUCCESS:
            return {
                ...state,
                entities: {
                    ...state.entities,
                    applications: {
                        ...state.entities.applications,
                        [action.id]: {
                            ...state.entities.applications[action.id],
                            status: "ACCEPTED",
                            pre_approvals: performAcceptUpdate(action.bank_id, state.entities.applications[action.id].pre_approvals, "ACCEPTED")
                        }
                    }
                }
            };
        case DECLINE_MORTGAGE_SUCCESS:
            return {
                ...state,
                entities: {
                    ...state.entities,
                    applications: {
                        ...state.entities.applications,
                        [action.id]: {
                            ...state.entities.applications[action.id],
                            status: "DECLINED",
                            pre_approvals: performAcceptUpdate(action.bank_id, state.entities.applications[action.id].pre_approvals, "DECLINED")
                        }
                    }
                }
            };
        // case ADD_DEPOSIT_SUCCESS:
        //     return {
        //         ...state,
        //         savings: {
        //             total: action?.details?.amount + state?.savings?.total,
        //             transactions: {
        //                 ...state?.savings?.transactions,
        //                 ...action.details
        //             }
        //         },
        //         depositing: false,
        //     };
        default:
            return state;
    }
}


export const submitMortgage = (state = INITIAL_STATE, action) => {
    const { type } = action;

    switch (type) {
        case MORTGAGE_APPLY_REQUEST:
            return {
                ...state,
                submittingApplication: true,

            };
        case MORTGAGE_APPLY_SUCCESS:
            return {
                ...state,
                submittingApplication: false,
            };
        case MORTGAGE_APPLY_ERROR:
            return {
                ...state,
                submittingApplication: false,
            };
        default:
            return state;
    }
}


export const submitMortgageForPreview = (state = INITIAL_STATE, action) => {
    const { type } = action;

    switch (type) {

        case MORTGAGE_APPLY_FOR_PREVIEW:
            return {
                ...state,
                ...action.application,
            };
        default:
            return state
    }
}