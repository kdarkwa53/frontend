
import {
    CHANGE_LANGUAGE,
    SET_DEFAULT_LANGUAGE
} from "./types";


export const changeLanguage = (language) => {
    return {
        type: CHANGE_LANGUAGE,
        language,
    };
}

export const setDelautLanguage = () => {
    return {
        type: SET_DEFAULT_LANGUAGE,
    };
}

