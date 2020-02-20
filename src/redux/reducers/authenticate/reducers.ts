import {
  SAVE_TOKEN_SERVER,
  SAVE_TOKEN_SOCIAL,
  SAVE_USER_DETAIL_SOCIAL,
  LOG_OUT,
  LOG_IN,
  AuthenticateState,
  AuthenticateAction
} from "../../actions/authenticate/actionTypes";

const initalState: AuthenticateState = {
  loggedIn: false,
  name: "",
  email: "",
  accessTokenSocial: "",
  accessTokenServer: ""
};

export default function authenticateReducer(
  state: AuthenticateState = initalState,
  action: AuthenticateAction
): AuthenticateState {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        loggedIn: true
      };
    case LOG_OUT:
      return {
        ...initalState
      };
    case SAVE_TOKEN_SERVER:
      return {
        ...state,
        accessTokenServer: action.payload.accessTokenServer
      };
    case SAVE_TOKEN_SOCIAL:
      return {
        ...state,
        accessTokenSocial: action.payload.accessTokenSocial
      };
    case SAVE_USER_DETAIL_SOCIAL:
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email
      };
    default:
      return state;
  }
}
