
import {
    GET_PROFILE_ERROR,
    GET_PROFILE_REQUEST,
    GET_PROFILE_SUCCESS,
    UPDATE_PROFILE_ERROR,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,

} from "./type";

const INITIAL_STATE = {
    gettingProfile: false,
    updatingProfile: false
};





export default function reducer(state = INITIAL_STATE, action) {
    const { type } = action;
    switch (type) {
        case GET_PROFILE_REQUEST:
            return {
                ...state,
                gettingProfile: true,
            };
        case GET_PROFILE_SUCCESS:
            return {
                ...state,
                ...action.data,
                gettingProfile: false,
            };
        case GET_PROFILE_ERROR:
            return {
                ...state,
                gettingProfile: false,
            };
        case UPDATE_PROFILE_REQUEST:
            return {
                ...state,
                updatingProfile: true,
            };
        case UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                updatingProfile: false,
            };
        case UPDATE_PROFILE_ERROR:
            return {
                ...state,
                updatingProfile: false,
            };
        default:
            return state;
    }
}

