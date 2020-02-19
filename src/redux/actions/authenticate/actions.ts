import { SocialResponse } from "../../../services/login/social/socialResponse"
import { GET_SERVER_TOKEN_VIA_GOOGLE, GET_SERVER_TOKEN_VIA_FACEBOOK, SAVE_TOKEN_SOCIAL, SAVE_TOKEN_SERVER, LOG_OUT } from "./actionTypes"

const action = (type: string, payload: any = {}) => {
    return { type, payload }
}

const socialToken = (token: string) => ({ accessTokenSocial: token })
const serverToken = (token: string) => ({ accessTokenServer: token })

export const connectTokenGoogle = (response: SocialResponse) => action(GET_SERVER_TOKEN_VIA_GOOGLE, response)
export const connectTokenFacebook = (response: SocialResponse) => action(GET_SERVER_TOKEN_VIA_FACEBOOK, response)
export const saveSocialToken = (token: string) => action(SAVE_TOKEN_SOCIAL, socialToken(token))
export const saveServerToken = (token: string) => action(SAVE_TOKEN_SERVER, serverToken(token))
export const logOut = () => action(LOG_OUT)

