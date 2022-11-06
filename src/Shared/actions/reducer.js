import {
    CHANGE_LANGUAGE,
    SET_DEFAULT_LANGUAGE
} from "./types"

import { lang } from "../../helpers/lang";


const INITIAL_STATE = {
    defaultLang: 'EN',
    selectedLang: 'EN'
};

export default function reducer(state = INITIAL_STATE, action = { type: "" }) {
    const { type } = action;

    switch (type) {
        case CHANGE_LANGUAGE:
            return {
                ...state,
                ...lang[action.language],
                selectedLang: action.language
            };
        case SET_DEFAULT_LANGUAGE:
            return {
                ...state,
                ...lang[INITIAL_STATE.defaultLang],
            };
        default:
            return state;
    }
}
