import { SocialResponse } from "../../../services/login/social/socialResponse";
import {
  GET_SERVER_TOKEN_VIA_GOOGLE,
  GET_SERVER_TOKEN_VIA_FACEBOOK,
  SAVE_TOKEN_SOCIAL,
  SAVE_TOKEN_SERVER,
  LOG_OUT,
  SocialTokenAction,
  ServerTokenAction,
  AuthenticateAction,
  AuthenticatePayload
} from "./actionTypes";

const action = (
  type: string,
  payload?: AuthenticatePayload
): AuthenticateAction => {
  return { type, payload };
};

const socialToken = (accessTokenSocial: string): SocialTokenAction => ({
  accessTokenSocial
});
const serverToken = (accessTokenServer: string): ServerTokenAction => ({
  accessTokenServer
});

export const connectTokenGoogle = (response: SocialResponse) =>
  action(GET_SERVER_TOKEN_VIA_GOOGLE, response);
export const connectTokenFacebook = (response: SocialResponse) =>
  action(GET_SERVER_TOKEN_VIA_FACEBOOK, response);
export const saveSocialToken = (token: string) =>
  action(SAVE_TOKEN_SOCIAL, socialToken(token));
export const saveServerToken = (token: string) =>
  action(SAVE_TOKEN_SERVER, serverToken(token));
export const logOut = () => action(LOG_OUT);
