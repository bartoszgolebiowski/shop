import { put, takeEvery, call, select } from "redux-saga/effects";
import {
  ServerTokenAction,
  AuthenticateSaga
} from "../../actions/authenticate/actionTypes";
import {
  serverLogin,
  LoginServerReponse,
  ServerResponse
} from "../../../services/login/authenticate";
import {
  GET_SERVER_TOKEN_VIA_GOOGLE,
  GET_SERVER_TOKEN_VIA_FACEBOOK,
  SAVE_TOKEN_SERVER,
  SAVE_USER_DETAIL_SOCIAL,
  LOG_IN,
  LOG_OUT,
  AuthenticateAction
} from "../../actions/authenticate/actionTypes";
import { RootState } from "../../reducers/rootReducer";

const { loginViaFacebok, loginViaGoogle } = serverLogin;

export function* connectTokenGoogleAsync(socialData: AuthenticateSaga) {
  yield* connectToken(socialData, loginViaGoogle);
}
export function* connectTokenFacebookAsync(socialData: AuthenticateSaga) {
  yield* connectToken(socialData, loginViaFacebok);
}
export function* watchConnectToken() {
  yield takeEvery(GET_SERVER_TOKEN_VIA_GOOGLE, connectTokenGoogleAsync);
  yield takeEvery(GET_SERVER_TOKEN_VIA_FACEBOOK, connectTokenFacebookAsync);
}

function* connectToken(
  socialData: AuthenticateSaga,
  loginVia: (socialReponse: string) => Promise<LoginServerReponse>
) {
  try {
    const tokenSocial: string = yield select(getSocialMediaToken);
    const responseServer: LoginServerReponse = yield call(
      loginVia,
      tokenSocial
    );
    if (responseServer.statusCode === 200) {
      const { access_token }: ServerResponse = responseServer.response;
      yield localStorage.setItem("token", access_token);
      yield put(saveServerToken(SAVE_TOKEN_SERVER, serverToken(access_token)));
      yield put(
        extractUserDetailsFromSocialResponse(
          SAVE_USER_DETAIL_SOCIAL,
          socialData
        )
      );

      yield put(logIn());
    } else {
      throw new Error("Login via social media has failed")
    }
  } catch {
    yield put(logOut());
    yield localStorage.removeItem("token");
  }
}

const logIn = (): AuthenticateAction => ({ type: LOG_IN });
const logOut = (): AuthenticateAction => ({ type: LOG_OUT });
const saveServerToken = (
  type: string,
  payload: ServerTokenAction
): AuthenticateAction => ({ type, payload });
const extractUserDetailsFromSocialResponse = (
  type: string,
  { payload }: AuthenticateSaga
): AuthenticateAction => ({ type, payload });
const getSocialMediaToken = (state: RootState): string =>
  state.authenticateReducer.accessTokenSocial;
const serverToken = (accessTokenServer: string): ServerTokenAction => ({
  accessTokenServer
});
