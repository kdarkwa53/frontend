import axios from "axios";

import {
  urlEcodedConfig,
  removeCookies,
  accounts,
  REACT_APP_BUSINESS_SERVICE_API_URL,
  REACT_APP_BASE_API_URL,
  getUserType,
  authHeader,
} from "../../../helpers/contants";

import {
  showErrorNotification,
  showSuccessNotification,
} from "../../../Shared/actions/alert.actions";
import Cookies from "js-cookie";
import { saveKCYValues } from "../../BusinessKYC/duck/action";
// import { requestForToken } from "../../../firebase";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";

export const PHONE_VERIFICATION_REQUEST = "PHONE_VERIFICATION_REQUEST";
export const PHONE_VERIFICATION_SUCCESS = "PHONE_VERIFICATION_SUCCESS";
export const PHONE_VERIFICATION_ERROR = "PHONE_VERIFICATION_ERROR";
export const RESEND_PHONE_OTP_REQUEST = "RESEND_PHONE_OTP_REQUEST";
export const RESEND_PHONE_OTP_SUCCESS = "RESEND_PHONE_OTP_SUCCESS";
export const RESEND_PHONE_OTP_ERROR = "RESEND_PHONE_OTP_ERROR";
export const UPDATE_USER_PROFILE_PICTURE = "UPDATE_USER_PROFILE_PICTURE"
export const RECOVER_PASSWORD_SUCCESS = "RECOVER_PASSWORD_SUCCESS"
export const RECOVER_PASSWORD_ERROR = "RECOVER_PASSWORD_ERROR"
export const RECOVER_PASSWORD_REQUEST = "RECOVER_PASSWORD_REQUEST"

export const ADD_PIN = "ADD_PIN";
export const ADD_USER = "ADD_USER"
export const VERIFY_USER = "VERIFY_USER"
export const UPDATE_USER = "UPDATE_USER"
export const USER_PERMISSIONS = "USER_PERMISSIONS"

export const SIGNOUT_ERROR = "SIGNOUT_ERROR"
export const SIGNOUT_REQUEST = "SIGNOUT_REQUEST"
export const SIGNOUT_SUCCESS = "SIGNOUT_SUCCESS"

export const SET_USER_TYPE = "SET_USER_TYPE"

const saveUserPermissions = (per)=>{
  let user_per = []

  per.map((p)=>user_per.push(p.name))

  return user_per
}
export const updateUser = (value, response)=>{
  return async (dispatch) => {
  dispatch({
    type: UPDATE_USER,
    value,
    response
  });
}
}
export const login = (details, history, accountType) => {
  details = {
    ...details,
    "device_token": "token"
  }
  return async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });

    try {
      const { data } = await axios.post(
        `${REACT_APP_BUSINESS_SERVICE_API_URL}/login`,
        details,
        urlEcodedConfig
      );

      let { user } = data;

      console.log(user)
      user = {
        ...user,
        "pre_qualification_questions": "{}",
        'userType': accountType
      }

      // Verify user before login
      if (user.phone_verified_at === null) {
        history.push({ pathname: "/phone", state: details })
        dispatch({
          type: LOGIN_ERROR,
        });
        return
      }

      if (data && data.token) {
        console.log(data)
        Cookies.set("javAccessToken", data.token.access_token, {
          expires: 7,
        });

        Cookies.set("userType", accountType, {
          expires: 365,
        });
        
        if (accountType === 'business'){
          Cookies.set("javBusiness", JSON.stringify(user), {
            expires: 7,
          });
        }else{
          console.log("I'm here customer")
          Cookies.set("javCustomer", JSON.stringify(user), {
            expires: 7,
          });
        }
       

    dispatch(saveKCYValues({
      client_information: {
        street_address: user.business_address,
        client_org_legal_name: user.business_name,
          
      },
      user_roles: [
          {
            // date_of_birth: ,
          email: user.email,
          full_legal_name: user.full_name,
          phone_number: user.phone_number,
          user_type:"super admin",
          }
      ]
  }))

        showSuccessNotification(
          "Login successful!",
          "You have successfully logged in."
        );
        dispatch({
          type: LOGIN_SUCCESS,
          accountType
        });
        dispatch({
          type: ADD_USER,
          user
        });

        dispatch({
          type: USER_PERMISSIONS,
          permissions: saveUserPermissions(data.permissions) 
        })

        dispatch({
          type: SET_USER_TYPE,
          data: accountType
        })

        // Route to home
        history.go("/")
      }

    } catch (error) {
      console.log("eoor: ",error)
      dispatch({
        type: LOGIN_ERROR,
      });
      if (!error.response) {
        dispatch(
          showErrorNotification("Action failed", "Check your internet and try again")
        );
      } else {
        dispatch(
          showErrorNotification(error?.response?.data?.message)
        );
      }
    }
  };
};


export const recoverPassword = (details, history) => {

  const userType = getUserType()

  return async (dispatch) => {
    dispatch({ type: RECOVER_PASSWORD_REQUEST });
    try {
      const { data } = await axios.post(
        `${REACT_APP_BASE_API_URL}/${userType}/forgot-password`,
        details,
        urlEcodedConfig
      );

    dispatch({
      type: RECOVER_PASSWORD_SUCCESS
    })

      dispatch(
        showSuccessNotification(data?.message)
      );

      history.push({ pathname: '/password-reset', state: details})

    } catch (error) {
      dispatch({
        type: RECOVER_PASSWORD_ERROR,
      });
      if (!error.response) {
        dispatch(
          showErrorNotification("Action failed", "Check your internet and try again")
        );
      } else {
        dispatch(
          showErrorNotification(error?.response?.data?.message)
        );
      }
    }
  };
};

export const userLogout = (history, accountType)=>{
  const userType = getUserType()
  return async (dispatch) => {
    dispatch({type: SIGNOUT_REQUEST})
    const accessToken = Cookies.get("javAccessToken");
    try {
      // await axios.get(
      //   `${REACT_APP_BASE_API_URL}/${userType}/logout/`,
      //   {
      //     headers: {
      //       "Authorization": `Bearer ${accessToken}`,
      //       "Accept": "application/json",
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );
      dispatch(showErrorNotification('Session expired'))
      removeCookies(accountType);
      // dispatch({ type: SIGNOUT_SUCCESS })
      history.go("/");
    } catch (error) {
      dispatch({ type: SIGNOUT_ERROR })
     console.log(error)
    }
  };
}

export const userTimerOut = (history, accountType) => {
  return async (dispatch) => {
    dispatch({ type: SIGNOUT_REQUEST })
    try {
    
      dispatch(showErrorNotification('Session expired'))
      removeCookies(accountType);
      history.go("/");
    } catch (error) {
      dispatch({ type: SIGNOUT_ERROR })
      console.log(error)
    }
  };
}

export const busLogin = (details, history) => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
      const { data } = await axios.post(
        `${REACT_APP_BUSINESS_SERVICE_API_URL}/login`,
        details,
        urlEcodedConfig
      );

      const { user } = data;


      if (data && data.token) {
        Cookies.set("javBuzAccessToken", data.token.access_token, {
          expires: 7,
        });

        Cookies.set("javCustomer", data.user, {
          expires: 7,
        });

        showSuccessNotification(
          "Login successful!",
          "You have successfully logged in."
        );
        dispatch({
          type: LOGIN_SUCCESS,
        });
        dispatch({
          type: ADD_USER,
          user
        });
        if (user.phone_verified_at === null) {
          history.push({ pathname: "/phone", state: details })
        } else {
          history.go("/")
        }
      }

    } catch (error) {
      dispatch({
        type: LOGIN_ERROR,
      });
      if (!error.response) {
        dispatch(
          showErrorNotification("Action failed", "Check your internet and try again")
        );
      } else {
        dispatch(
          showErrorNotification(error?.response?.data?.message)
        );
      }
    }
  };
};

export const verifyPhone = (code, phone, history) => {
  const userType = getUserType()

  console.log(userType)

  const body = { "phone_verification_code": code, "phone_number": phone }
  return async (dispatch) => {
    dispatch({ type: PHONE_VERIFICATION_REQUEST });
    // const accessToken = Cookies.get("javAccessToken");
    try {
      await axios.post(
        `${REACT_APP_BASE_API_URL}/${userType}/account/verify`,
        body,
        authHeader
      );
      console.log(body)
      showSuccessNotification(
        "Phone Verification successful!",
        "You have successfully logged in."
      );
      dispatch({
        type: PHONE_VERIFICATION_SUCCESS,
      });
      removeCookies();
      history.push("/login");
    } catch (error) {

      dispatch({
        type: PHONE_VERIFICATION_ERROR,
      });
      // console.log(error)
      dispatch(
        showErrorNotification(
          error.response.data.message,
        )
      );
    }
  };
};

export const updateProfilePicture = (data) => {
  return {
    type: UPDATE_USER_PROFILE_PICTURE,
    data
  }
}

export const resendOTP = (phone) => {
  const body = { "phone_number": phone, "type": "phone" }
  const userType = getUserType()
  return async (dispatch) => {
    dispatch({ type: RESEND_PHONE_OTP_REQUEST });
    const accessToken = Cookies.get("javAccessToken");
    try {
      const { data } = await axios.post(
        `${REACT_APP_BASE_API_URL}/${userType}/verify/resend`,
        body,
        {
          headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      showSuccessNotification(
        data,
        `New OTP sent to ${phone}`
      );
      dispatch({
        type: RESEND_PHONE_OTP_SUCCESS,
      });
      removeCookies();
    } catch (error) {
      dispatch({
        type: RESEND_PHONE_OTP_ERROR,
      });
      dispatch(
        showErrorNotification(
          error.response.data.message,
        )
      );
    }
  };
};