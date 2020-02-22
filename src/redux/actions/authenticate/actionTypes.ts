import { SocialResponse } from "./../../../services/login/social/socialResponse";

export const GET_SERVER_TOKEN_VIA_GOOGLE: string =
  "GET_SERVER_TOKEN_VIA_GOOGLE";
export const GET_SERVER_TOKEN_VIA_FACEBOOK: string =
  "GET_SERVER_TOKEN_VIA_FACEBOOK";
export const SAVE_TOKEN_SOCIAL: string = "SAVE_TOKEN_SOCIAL";
export const SAVE_TOKEN_SERVER: string = "SAVE_TOKEN_SERVER";
export const SAVE_USER_DETAIL_SOCIAL: string = "SAVE_USER_DETAIL_SOCIAL";
export const LOG_OUT: string = "LOG_OUT";
export const LOG_IN: string = "LOG_IN";

type ActionSocialToken = {
  type: string;
  payload: SocialTokenAction;
};

type ActionServerToken = {
  type: string;
  payload: ServerTokenAction;
};

type ActionSocialResponse = {
  type: string;
  payload: SocialResponse;
};

type ActionLogin = {
  type: string;
  payload?: any;
};

export type AuthenticateSaga = {
  type: string;
  payload: SocialResponse;
};

export type AuthenticateState = {
  loggedIn: boolean;
  name: string;
  email: string;
  pictureUrl: string;
  accessTokenSocial: string;
  accessTokenServer: string;
};

export type SocialTokenAction = { accessTokenSocial: string };
export type ServerTokenAction = { accessTokenServer: string };
export type AuthenticateAction =
  | ActionSocialToken
  | ActionServerToken
  | ActionSocialResponse
  | ActionLogin;
export type AuthenticatePayload =
  | SocialTokenAction
  | ServerTokenAction
  | SocialResponse;
