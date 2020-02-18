import { GoogleLoginResponse, GoogleLoginResponseOffline } from "react-google-login";
import { SocialMediaResponseFailed, SocialMediaResponseSuccess } from "./socialResponse";

export interface GoogleLogin {
    onSuccess(response: GoogleLoginResponse | GoogleLoginResponseOffline): SocialMediaResponseSuccess | SocialMediaResponseFailed,
    onFailure(response: any): SocialMediaResponseFailed
}

export const googleLogin: GoogleLogin = {
    onSuccess: (response: GoogleLoginResponse | GoogleLoginResponseOffline): SocialMediaResponseSuccess | SocialMediaResponseFailed => {
        return (instanceOfA(response)) ?
            onSuccessOnline(<GoogleLoginResponse>response) :
            onSuccessOffline(<GoogleLoginResponseOffline>response);
    },
    onFailure: (response: any): SocialMediaResponseFailed => {
        return {
            errors: response,
            status: 'failed'
        }
    }
}

const onSuccessOnline = (response: GoogleLoginResponse): SocialMediaResponseSuccess => {
    return {
        name: response.getBasicProfile().getName(),
        email: response.getBasicProfile().getEmail(),
        pictureUrl: response.getBasicProfile().getImageUrl(),
        accessToken: response.accessToken,
        tokenObj: response.tokenObj,
        tokenId: response.tokenId,
        status: 'success'
    }
}

const onSuccessOffline = (response: GoogleLoginResponseOffline): SocialMediaResponseFailed => {
    return {
        errors: response,
        status: 'failed'
    }
}

const instanceOfA = (response: GoogleLoginResponse | GoogleLoginResponseOffline): boolean => {
    return !response.hasOwnProperty('code')
}