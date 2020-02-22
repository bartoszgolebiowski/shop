import fetchMock from "fetch-mock";
import SagaTester from "redux-saga-tester";
import createSagaMiddleware from "redux-saga";

import { RootState } from "../../reducers/rootReducer";
import {
  GET_SERVER_TOKEN_VIA_FACEBOOK,
  LOG_OUT
} from "../../actions/authenticate/actionTypes";

import { connectTokenGoogleAsync, connectTokenFacebookAsync } from "./sagas";
import rootReducer, { initialState } from "../../reducers/rootReducer";
import {
  AuthenticateSaga,
  GET_SERVER_TOKEN_VIA_GOOGLE,
  LOG_IN
} from "../../actions/authenticate/actionTypes";
import { SERVER_URL, CONNECT_TOKEN } from "../../../constants/server/constants";

const sagaMiddleware = createSagaMiddleware();
let sagaTester: SagaTester<RootState>;

describe("Check if authorization sagas generators work", () => {
  beforeEach(() => {
    sagaTester = new SagaTester({
      initialState: initialState,
      reducers: rootReducer,
      middlewares: [sagaMiddleware]
    });
  });

  afterEach(() => {
    fetchMock.reset();
    sagaTester.reset(true);
  });

  it("Handle connectTokenFacebookAsync success", async () => {
    mockServerResponse("success");
    const input: AuthenticateSaga = generateInput(
      GET_SERVER_TOKEN_VIA_FACEBOOK
    );
    sagaTester.start(connectTokenFacebookAsync, input);
    await sagaTester.waitFor(LOG_IN, true);

    expect(sagaTester.getCalledActions()).toEqual([
      {
        type: "SAVE_TOKEN_SERVER",
        payload: { accessTokenServer: "access_token" }
      },
      { type: "SAVE_USER_DETAIL_SOCIAL", payload: input.payload },
      { type: "LOG_IN" }
    ]);
    expect(sagaTester.getState().authenticateReducer).toEqual({
      loggedIn: true,
      name: "name",
      email: "email",
      pictureUrl: "pictureUrl",
      accessTokenSocial: "",
      accessTokenServer: "access_token"
    });
  });

  it("Handle connectTokenGoogleAsync success", async () => {
    mockServerResponse("success");
    const input: AuthenticateSaga = generateInput(GET_SERVER_TOKEN_VIA_GOOGLE);
    const sagaTester = new SagaTester({
      initialState: initialState,
      reducers: rootReducer,
      middlewares: [sagaMiddleware]
    });

    sagaTester.start(connectTokenGoogleAsync, input);
    await sagaTester.waitFor(LOG_IN, true);

    expect(sagaTester.getCalledActions()).toEqual([
      {
        type: "SAVE_TOKEN_SERVER",
        payload: { accessTokenServer: "access_token" }
      },
      { type: "SAVE_USER_DETAIL_SOCIAL", payload: input.payload },
      { type: "LOG_IN" }
    ]);
    expect(sagaTester.getState().authenticateReducer).toEqual({
      loggedIn: true,
      name: "name",
      email: "email",
      pictureUrl: "pictureUrl",
      accessTokenSocial: "",
      accessTokenServer: "access_token"
    });
  });

  it("Handle connectTokenGoogleAsync failed", async () => {
    mockServerResponse("failed");
    const input: AuthenticateSaga = generateInput(GET_SERVER_TOKEN_VIA_GOOGLE);
    const sagaTester = new SagaTester({
      initialState: initialState,
      reducers: rootReducer,
      middlewares: [sagaMiddleware]
    });

    sagaTester.start(connectTokenGoogleAsync, input);
    await sagaTester.waitFor(LOG_OUT, true);

    expect(sagaTester.getCalledActions()).toEqual([{ type: "LOG_OUT" }]);
    expect(sagaTester.getState().authenticateReducer).toEqual({
      loggedIn: false,
      name: "",
      email: "",
      pictureUrl: "",
      accessTokenSocial: "",
      accessTokenServer: ""
    });
  });

  it("Handle connectTokenFacebookAsync failed", async () => {
    mockServerResponse("failed");
    const input: AuthenticateSaga = generateInput(GET_SERVER_TOKEN_VIA_GOOGLE);
    const sagaTester = new SagaTester({
      initialState: initialState,
      reducers: rootReducer,
      middlewares: [sagaMiddleware]
    });

    sagaTester.start(connectTokenFacebookAsync, input);
    await sagaTester.waitFor(LOG_OUT, true);

    expect(sagaTester.getCalledActions()).toEqual([{ type: "LOG_OUT" }]);
    expect(sagaTester.getState().authenticateReducer).toEqual({
      loggedIn: false,
      name: "",
      email: "",
      pictureUrl: "",
      accessTokenSocial: "",
      accessTokenServer: ""
    });
  });
});

const mockServerResponse = (type: string) => {
  if (type === "success") {
    fetchMock.mock(`${SERVER_URL}${CONNECT_TOKEN}`, () => {
      return new Promise(resolve => {
        resolve({
          access_token: "access_token",
          token_type: "token_type",
          expires_in: 3600
        });
      });
    });
  } else {
    fetchMock.mock(`${SERVER_URL}${CONNECT_TOKEN}`, () => {
      throw new Error("Failed");
    });
  }
};

const generateInput = (type: string) => ({
  type,
  payload: {
    name: "name",
    email: "email",
    pictureUrl: "pictureUrl",
    accessToken: "accessToken",
    status: "success"
  }
});
