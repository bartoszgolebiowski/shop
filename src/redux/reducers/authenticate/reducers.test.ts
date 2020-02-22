import reducer from "./reducers";

import {
  SAVE_TOKEN_SOCIAL,
  SAVE_TOKEN_SERVER,
  SAVE_USER_DETAIL_SOCIAL,
  LOG_OUT,
  LOG_IN,
  AuthenticateState,
  SocialTokenAction,
  ServerTokenAction
} from "../../actions/authenticate/actionTypes";

import { SocialResponse } from "./../../../services/login/social/socialResponse";

describe("Authenticate reducer", () => {
  it("SAVE_USER_DETAIL_SOCIAL", () => {
    const response: SocialResponse = {
      name: "name",
      email: "email",
      pictureUrl: "pictureUrl",
      accessToken: "accessToken",
      status: "success"
    };
    const expected: AuthenticateState = {
      loggedIn: false,
      name: "name",
      email: "email",
      pictureUrl: "pictureUrl",
      accessTokenSocial: "",
      accessTokenServer: ""
    };
    expect(
      reducer(undefined, { type: SAVE_USER_DETAIL_SOCIAL, payload: response })
    ).toEqual(expected);
  });

  it("SAVE_TOKEN_SERVER", () => {
    const response: ServerTokenAction = {
      accessTokenServer: "accessTokenServer"
    };
    const expected: AuthenticateState = {
      loggedIn: false,
      name: "",
      email: "",
      pictureUrl: "",
      accessTokenSocial: "",
      accessTokenServer: "accessTokenServer"
    };
    expect(
      reducer(undefined, { type: SAVE_TOKEN_SERVER, payload: response })
    ).toEqual(expected);
  });

  it("SAVE_TOKEN_SOCIAL", () => {
    const response: SocialTokenAction = {
      accessTokenSocial: "accessTokenSocial"
    };
    const expected: AuthenticateState = {
      loggedIn: false,
      name: "",
      email: "",
      pictureUrl: "",
      accessTokenSocial: "accessTokenSocial",
      accessTokenServer: ""
    };
    expect(
      reducer(undefined, { type: SAVE_TOKEN_SOCIAL, payload: response })
    ).toEqual(expected);
  });

  it("LOG_OUT", () => {
    const expected: AuthenticateState = {
      loggedIn: false,
      name: "",
      email: "",
      pictureUrl: "",
      accessTokenSocial: "",
      accessTokenServer: ""
    };
    expect(reducer(undefined, { type: LOG_OUT })).toEqual(expected);
  });

  it("LOG_IN", () => {
    const expected: AuthenticateState = {
      loggedIn: true,
      name: "",
      email: "",
      pictureUrl: "",
      accessTokenSocial: "",
      accessTokenServer: ""
    };
    expect(reducer(undefined, { type: LOG_IN })).toEqual(expected);
  });
});
