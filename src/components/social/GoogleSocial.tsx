import React from 'react'
import Button from '@material-ui/core/Button';

import { googleLogin } from '../../services/login/social/google';
import { APP_ID_GOOGLE } from '../../constants/server/constants';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { SocialResponse } from '../../services/login/social/socialResponse';

type GoogleSocialType = {
    className: string,
    googleCallback: Function,
    clearUserDetails: Function,
    saveSocialToken: Function,
    connectTokenGoogle: Function,
    setErrors: Function
}

export const GoogleSocial = (props : GoogleSocialType) => {
    const {
        className,
        googleCallback,
        clearUserDetails,
        setErrors
    } = props;

    return (
        <GoogleLogin
            clientId={APP_ID_GOOGLE}
            onSuccess={(resGoogle: GoogleLoginResponse | GoogleLoginResponseOffline) => {
                const resServer: SocialResponse = googleLogin.onSuccess(resGoogle);
                const errors = googleCallback(resServer, props);
                if (errors) {
                    console.log(errors); //todo catch failed attemt to login
                    clearUserDetails();
                }
                setErrors(errors ? true : false)
            }}
            onFailure={(resFailed: any) => {
                const resGoogle = googleLogin.onFailure(resFailed);
                clearUserDetails();
                console.log(resGoogle); //todo catch failed attemt to login
                setErrors(true)
            }}
            render={renderProps => (
                <Button className={className} onClick={renderProps.onClick}>Google</Button>
              )}
        />
    )
}

export default GoogleSocial