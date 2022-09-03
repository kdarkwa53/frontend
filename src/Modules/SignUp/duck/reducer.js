import { SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_ERROR } from "./action";

const INITIAL_STATE = {
  signingUp: false,
  signinSuccess: false,
};

export default function reducer(state = INITIAL_STATE, action = { type: "" }) {
  const { type } = action;

  switch (type) {
    case SIGNUP_REQUEST:
      return {
        ...state,
        signingUp: true,
        signinSuccess: false,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        signingUp: false,
        signinSuccess: true,
        signupdetails: action.data
      };
    case SIGNUP_ERROR:
      return {
        ...state,
        signingUp: false,
        signinSuccess: false,
      };

    default:
      return state;
  }
}
