import {
  GETTING_PERMISSIONS_REQUEST,
  GETTING_PERMISSIONS_SUCCESS,
  GETTING_PERMISSIONS_ERROR,
  GETTING_ROLES_ERROR,
  GETTING_ROLES_REQUEST,
  GETTING_ROLES_SUCCESS,
  ADDING_ROLE_ERROR,
  ADDING_ROLE_REQUEST,
  ADDING_ROLE_SUCCESS
} from "./types"



const INITIAL_STATE = {
  gettingPermissions: false,
  gettingRoles: false,
  addingRole: false
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