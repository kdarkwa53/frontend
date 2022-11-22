import {
  LOGIN_SUCCESS,
  RESEND_PHONE_OTP_REQUEST,
  RESEND_PHONE_OTP_ERROR,
  RESEND_PHONE_OTP_SUCCESS,
  LOGIN_ERROR, LOGIN_REQUEST,
  PHONE_VERIFICATION_SUCCESS,
  PHONE_VERIFICATION_ERROR,
  PHONE_VERIFICATION_REQUEST,
  ADD_PIN, ADD_USER,
  UPDATE_USER_PROFILE_PICTURE,
  VERIFY_USER,
  RECOVER_PASSWORD_SUCCESS,
  RECOVER_PASSWORD_REQUEST,
  RECOVER_PASSWORD_ERROR,
  SET_USER_TYPE,
 UPDATE_USER,
 SIGNOUT_ERROR,
 SIGNOUT_REQUEST,
 SIGNOUT_SUCCESS,
 USER_PERMISSIONS,
} from "./action";



const INITIAL_STATE = {
  loggingIn: false,
  loginSuccess: false,
  verifying: false,
  userType: "business",
  recoverpass: false,
  signingOut: false
};

export const loginReducer = (state = INITIAL_STATE, action = { type: "" }) => {
  const { type } = action;

  switch (type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loggingIn: true,
        loginSuccess: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        loginSuccess: true,
        userType: action.accountType
      };
    case LOGIN_ERROR:
      return {
        ...state,
        loggingIn: false,
        loginSuccess: false,
      };
    case SIGNOUT_REQUEST:
      return {
        ...state,
        signingOut:true
      };
    case SIGNOUT_SUCCESS:
      return {
        ...state,
        signingOut:false
      };
    case SIGNOUT_ERROR:
      return {
        ...state,
        signingOut:false
      };
    case PHONE_VERIFICATION_REQUEST:
      return {
        ...state,
        verifying: true
      };
    case PHONE_VERIFICATION_SUCCESS:
      return {
        ...state,
        verifying: false

      };
    case PHONE_VERIFICATION_ERROR:
      return {
        ...state,
        verifying: false
      };
    case RESEND_PHONE_OTP_REQUEST:
      return {
        ...state,
        verifying: true
      };
    case RESEND_PHONE_OTP_SUCCESS:
      return {
        ...state,
        verifying: false

      };
      
    case RESEND_PHONE_OTP_ERROR:
      return {
        ...state,
        verifying: false
      };
    case RECOVER_PASSWORD_REQUEST:
      return {
        ...state,
        recoverpass: true
      };
    case RECOVER_PASSWORD_SUCCESS:
      return {
        ...state,
        recoverpass: false

      };

    case RECOVER_PASSWORD_ERROR:
      return {
        ...state,
        recoverpass: false
      };
    default:
      return state;
  }
}

export const userReducer = (state = {type: "customer"}, action = { type: "" }) => {
  const { type } = action;

  switch (type) {
    case ADD_USER:
      return {
        ...state,
        ...action.user
      };
      case USER_PERMISSIONS:
        return {
          ...state,
          user_permissions: action.permissions
        };
    case UPDATE_USER:
      return {
        ...state,
        [action.value]: action.response
      };
    case UPDATE_USER_PROFILE_PICTURE:
      return {
        ...state,
        image_url: action.data
      };
    case VERIFY_USER:
      return {
        ...state,
        id_verification_response: action.details
      };
    case ADD_PIN:
      return {
        ...state,
          app_passcode: action.passcode        
      };
    case SET_USER_TYPE:
      return {
        ...state,
        type: action.data
      };
    default:
      return state;
  }
}