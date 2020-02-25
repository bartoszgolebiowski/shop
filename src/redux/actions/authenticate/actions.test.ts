import {
  connectTokenGoogle,
  connectTokenFacebook,
  saveSocialToken,
  saveServerToken,
  logOut,
  logIn
} from "./actions";
import {
  GET_SERVER_TOKEN_VIA_GOOGLE,
  GET_SERVER_TOKEN_VIA_FACEBOOK,
  SAVE_TOKEN_SOCIAL,
  SAVE_TOKEN_SERVER,
  LOG_OUT,
  LOG_IN
} from "./actionTypes";
import { SocialResponse } from "../../../services/login/social/socialResponse";
import { AuthenticateAction, AuthenticatePayload } from "./actionTypes";

describe("Authenticate actions", () => {
  it("GET_SERVER_TOKEN_VIA_GOOGLE", () => {
    const input: SocialResponse = {
      name: "name",
      email: "email",
      pictureUrl: "string",
      accessToken: "accessToken",
      status: "string"
    };
    const expected: AuthenticateAction = expectedAction(
      GET_SERVER_TOKEN_VIA_GOOGLE,
      input
    );
    expect(connectTokenGoogle(input)).toEqual(expected);
  });

  it("GET_SERVER_TOKEN_VIA_FACEBOOK", () => {
    const input: SocialResponse = {
      name: "name",
      email: "email",
      pictureUrl: "string",
      accessToken: "accessToken",
      status: "string"
    };
    const expected: AuthenticateAction = expectedAction(
      GET_SERVER_TOKEN_VIA_FACEBOOK,
      input
    );
    expect(connectTokenFacebook(input)).toEqual(expected);
  });

  it("SAVE_TOKEN_SOCIAL", () => {
    const input: string = "accessTokenSocial";
    const expected: AuthenticateAction = expectedAction(SAVE_TOKEN_SOCIAL, {
      accessTokenSocial: input
    });
    expect(saveSocialToken(input)).toEqual(expected);
  });

  it("SAVE_TOKEN_SERVER", () => {
    const input: string = "accessTokenServer";
    const expected: AuthenticateAction = expectedAction(SAVE_TOKEN_SERVER, {
      accessTokenServer: input
    });
    expect(saveServerToken(input)).toEqual(expected);
  });

  it("LOG_OUT", () => {
    const expectedAction: AuthenticateAction = {
      type: LOG_OUT
    };
    expect(logOut()).toEqual(expectedAction);
  });
  it("LOG_IN", () => {
    const expectedAction: AuthenticateAction = {
      type: LOG_IN
    };
    expect(logIn()).toEqual(expectedAction);
  });
});

const expectedAction = (
  type: string,
  payload: AuthenticatePayload
): AuthenticateAction => ({
  type: type,
  payload
});
