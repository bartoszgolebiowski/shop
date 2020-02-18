import { ReactFacebookLoginInfo } from "react-facebook-login"
import { SocialResponse, SocialMediaResponseSuccess, SocialMediaResponseFailed } from "./socialResponse"

export interface FacebookLogin {
    callback(res: ReactFacebookLoginInfo): SocialMediaResponseSuccess | SocialMediaResponseFailed,
}

export const facebookLogin: FacebookLogin = {
    callback: (res: ReactFacebookLoginInfo) => {
        return instanceOfA(res) ?
            onSuccess(res) :
            onFailed(res)
    },
}

const onSuccess = (response: ReactFacebookLoginInfo): SocialMediaResponseSuccess => {
    return {
        name: response.name || '',
        email: response.email || '',
        pictureUrl: response.picture?.data.url || '',
        accessToken: response.accessToken,
        status: 'success'
    }
}

const onFailed = (res: any): SocialMediaResponseFailed => {
    return {
        errors: res,
        status: 'failed'
    }
}

const instanceOfA = (response: ReactFacebookLoginInfo): boolean => {
    return !response.hasOwnProperty('status')
}