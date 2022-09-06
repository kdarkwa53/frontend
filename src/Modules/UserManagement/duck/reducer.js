import {
  GETTING_PERMISSIONS_REQUEST,
  GETTING_PERMISSIONS_SUCCESS,
  GETTING_PERMISSIONS_ERROR
} from "./types"



const INITIAL_STATE = {
  gettingPermissions: false,
  
};


export default function reducer(state = INITIAL_STATE, action = { type: "" }) {
  const { type } = action;

  switch (type) {
    case GETTING_PERMISSIONS_REQUEST:
            return {
                ...state,
                gettingPermissions: false,
            };
        case GETTING_PERMISSIONS_SUCCESS:
            return {
                ...state,
                permissions: action.data,
                gettingPermissions: true,
            };
        case GETTING_PERMISSIONS_ERROR:
            return {
                ...state,
                gettingPermissions: false,
            };
    default:
      return state;
  }
}