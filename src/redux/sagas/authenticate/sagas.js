import { put, takeEvery, call, select } from 'redux-saga/effects'
import { serverLogin } from '../../../services/login/authenticate'
import { GET_SERVER_TOKEN_VIA_GOOGLE, GET_SERVER_TOKEN_VIA_FACEBOOK, SAVE_TOKEN_SERVER, SAVE_USER_DETAIL_SOCIAL, LOG_IN, LOG_OUT }
    from "../../actions/authenticate/actionTypes"

const { loginViaFacebok, loginViaGoogle } = serverLogin;


export function* connectTokenGoogleAsync(socialData) {
    try {
        const tokenSocial = yield select(getSocialMediaToken)
        const responseServer = yield call(loginViaGoogle, tokenSocial)
        if (responseServer[0].statusCode === 200) {
            const { access_token } = yield responseServer[1]
            yield localStorage.setItem('token', access_token)
            yield put(saveServerToken(SAVE_TOKEN_SERVER, access_token))
            yield put(extractUserDetailsFromSocialResponse(SAVE_USER_DETAIL_SOCIAL, socialData))
            yield put(logIn())
        } else {
            throw
        }
    } catch {
        yield* cleanUp();
    }
}

export function* connectTokenFacebookAsync(socialData) {
    try {
        const tokenSocial = yield select(getSocialMediaToken)
        const responseServer = yield call(loginViaFacebok, tokenSocial)
        if (responseServer[0].statusCode === 200) {
            const { access_token } = yield responseServer[1]
            yield localStorage.setItem('token', access_token)
            yield put(saveServerToken(SAVE_TOKEN_SERVER, access_token))
            yield put(extractUserDetailsFromSocialResponse(SAVE_USER_DETAIL_SOCIAL, socialData))
            yield put(logIn())
        } else {
            throw
        }
    } catch {
        yield* cleanUp();
    }
}

export function* watchConnectTokenGoogle() {
    yield takeEvery(GET_SERVER_TOKEN_VIA_GOOGLE, connectTokenGoogleAsync)
    yield takeEvery(GET_SERVER_TOKEN_VIA_FACEBOOK, connectTokenFacebookAsync)
}

function* cleanUp() {
    yield put(logOut());
    yield localStorage.clear('token');
}

const logIn = () => ({ type: LOG_IN })
const logOut = () => ({ type: LOG_OUT })
const getSocialMediaToken = (state) => state.authenticateReducer.accessTokenSocial
const saveServerToken = (type, accessTokenServer) => ({ type, payload: { accessTokenServer } })
const extractUserDetailsFromSocialResponse = (type, socialData) => ({ type, payload: socialData.payload })


