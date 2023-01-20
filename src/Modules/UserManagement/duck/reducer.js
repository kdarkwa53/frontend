import { removeByKey } from "../../../helpers/utils";
import { DECLINE_MORTGAGE_REQUEST } from "../../MyApplications/duck/type";
import {
  GETTING_PERMISSIONS_REQUEST,
  GETTING_PERMISSIONS_SUCCESS,
  GETTING_PERMISSIONS_ERROR,
  GETTING_ROLES_ERROR,
  GETTING_ROLES_REQUEST,
  GETTING_ROLES_SUCCESS,
  ADDING_ROLE_ERROR,
  ADDING_ROLE_REQUEST,
  ADDING_ROLE_SUCCESS,
  GETTING_USERS_REQUEST,
  GETTING_USERS_SUCCESS,
  GETTING_USERS_ERROR,
  ADDING_USER_REQUEST,
  ADDING_USER_SUCCESS,
  ADDING_USER_ERROR,
  GET_PENDING_TRANX_REQUEST,
  GET_PENDING_TRANX_SUCCESS,
  GET_PENDING_TRANX_ERROR,
  APPROVE_TRANX_REQUEST,
  APPROVE_TRANX_SUCCESS,
  APPROVE_TRANX_ERROR,
  DECLINE_TRANX_SUCCESS,
  DECLINE_TRANX_REQUEST,
  DECLINE_TRANX_ERROR,
  EDIT_USER_SUCCESS,
  APPROVE_USER_REQUEST,
  APPROVE_USER_SUCCESS,
  APPROVE_USER_ERROR,
  DECLINE_USER_REQUEST,
  DECLINE_USER_SUCCESS,
  DECLINE_USER_ERROR
} from "./types"



const INITIAL_STATE = {
  gettingPermissions: false,
  gettingRoles: false,
  addingRole: false,
  addingUser: false,
  gettingUsers: false,
  getPending: false,
  approveTranx: false,
  approvingUser: false,
  decliningUser: false
};


export default function reducer(state = INITIAL_STATE, action = { type: "" }) {
  const { type } = action;

  switch (type) {
    case APPROVE_USER_REQUEST:
      return {
        ...state,
        approvingUser: true,
      };
    case APPROVE_USER_SUCCESS:
      return {
        ...state,
        approvingUser: false,
      };
    case APPROVE_USER_ERROR:
      return {
        ...state,
        approvingUser: false,
      };
      case DECLINE_USER_REQUEST:
        return {
          ...state,
          decliningUser: true,
        };
      case DECLINE_USER_SUCCESS:
        return {
          ...state,
          decliningUser: false,
        };
      case DECLINE_USER_ERROR:
        return {
          ...state,
          decliningUser: false,
        };
    case GET_PENDING_TRANX_REQUEST:
      return {
        ...state,
        getPending: true,
      };
    case GET_PENDING_TRANX_SUCCESS:
      return {
        ...state,
        pending_tranx: action.data,
        getPending: false,
      };
    case GET_PENDING_TRANX_ERROR:
      return {
        ...state,
        getPending: false,
      };
    case APPROVE_TRANX_REQUEST:
      return {
        ...state,
        approveTranx: true,
      };
    case APPROVE_TRANX_SUCCESS:
      return {
        ...state,
        pending_tranx: removeByKey(state?.pending_tranx, action.data),
        approveTranx: false,
      };
    case APPROVE_TRANX_ERROR:
      return {
        ...state,
        approveTranx: false,
      };
    case DECLINE_TRANX_REQUEST:
      return {
        ...state,
        approveTranx: true,
      };
    case DECLINE_TRANX_SUCCESS:
      return {
        ...state,
        pending_tranx: removeByKey(state?.pending_tranx, action.data),
        approveTranx: false,
      };
    case DECLINE_TRANX_ERROR:
      return {
        ...state,
        approveTranx: false,
      };
    case ADDING_USER_REQUEST:
      return {
        ...state,
        addingUser: true,
      };
    case ADDING_USER_SUCCESS:
      return {
        ...state,
        // users: {
        //   ...state.users,
        //   ...action.data
        // },
        addingUser: false,
      };
    case EDIT_USER_SUCCESS:
      return {
        ...state,
        addingUser: false,
      };
    case ADDING_USER_ERROR:
      return {
        ...state,
        addingUser: false,
      };
    case GETTING_USERS_REQUEST:
      return {
        ...state,
        gettingUsers: true,
      };
    case GETTING_USERS_SUCCESS:
      return {
        ...state,
        users: action.data,
        gettingUsers: false,
      };
    case GETTING_USERS_ERROR:
      return {
        ...state,
        gettingUsers: false,
      };
    case GETTING_PERMISSIONS_REQUEST:
      return {
        ...state,
        gettingPermissions: true,
      };
    case GETTING_PERMISSIONS_SUCCESS:
      return {
        ...state,
        permissions: action.data,
        gettingPermissions: false,
      };
    case GETTING_PERMISSIONS_ERROR:
      return {
        ...state,
        gettingPermissions: false,
      };
    case GETTING_ROLES_REQUEST:
      return {
        ...state,
        gettingPermissions: false,
      };
    case GETTING_ROLES_SUCCESS:
      return {
        ...state,
        roles: action.data,
        gettingRoles: true,
      };
    case GETTING_ROLES_ERROR:
      return {
        ...state,
        gettingRoles: false,
      };
    case ADDING_ROLE_REQUEST:
      return {
        ...state,
        roles: {
          ...state.roles,
          ...action.data
        },
        addingRole: true,
      };
    case ADDING_ROLE_SUCCESS:
      return {
        ...state,
        // roles: action.data,
        addingRole: false,
      };
    case ADDING_ROLE_ERROR:
      return {
        ...state,
        addingRole: false,
      };
    default:
      return state;
  }
}