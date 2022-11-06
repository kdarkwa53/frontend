import { generateID } from "../../../helpers/utils"

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
    ADD_TRANSACTION,
} from "./type";

const INITIAL_STATE = {
    depositing: false,
    gettingTransactions: false,
    makingDeposit: false,
};





export default function reducer(state = INITIAL_STATE, action) {
    const { type } = action;
    const id = generateID()
    switch (type) {
        case GET_SAVINGS_REQUEST:
            return {
                ...state,
                gettingTransactions: true,
            };
        case GET_SAVINGS_SUCCESS:
            return {
                ...state,
                transactions: action.data,
                gettingTransactions: false,
            };
        case GET_SAVINGS_ERROR:
            return {
                ...state,
                gettingTransactions: false,
            };
        case ADD_DEPOSIT_REQUEST:
            return {
                ...state,
                depositing: true,
            };
        case MAKE_DEPOSIT_REQUEST:
            return {
                ...state,
                makingDeposit: true,
            };
        case MAKE_DEPOSIT_SUCCESS:
            return {
                ...state,
                wallet: {
                    ...state.wallet,
                    current_balance: parseInt(action.data.amount) + parseInt(state.wallet.current_balance)
                },
                transactions: {
                    ...state.transactions,
                    [id]: {
                        ...action.data
                    }
                },
                makingDeposit: false,
            };
        case MAKE_DEPOSIT_ERROR:
            return {
                ...state,
                makingDeposit: false,
            };
        case ADD_DEPOSIT_SUCCESS:
            return {
                ...state,
                total: parseInt(action.details.amount) + parseInt(state.total),
                transactions: {
                    ...state.transactions,
                    [id]: {
                        ...action.details
                    }
                },
                depositing: false,
            };
        case ADD_TRANSACTION:
            return {
                ...state,
                // total: parseInt(action.details.amount) + parseInt(state.total),
                transactions: {
                    ...state.transactions,
                    [id]: {
                        ...action.details,
                        created_at: new Date(),
                        status: "PENDING",
                        module: "FUND_MY_WALLET"
                    }
                },
                depositing: false,
            };
        case ADD_DEPOSIT_ERROR:
            return {
                ...state,
                depositing: false,
            };
        default:
            return state;
    }
}

