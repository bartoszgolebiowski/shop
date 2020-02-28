import React from 'react'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import Button from '@material-ui/core/Button';

import { facebookLogin } from '../../services/login/social/facebook';
import { APP_ID_FACEBOOK } from '../../constants/server/constants';

export const FacebookSocial = (props) => {
    const {
        className,
        facebookCallback,
        clearUserDetails,
        setErrors
    } = props;

    return (
        <FacebookLogin
            appId={APP_ID_FACEBOOK}
            fields="name,email,picture"
            callback={(resFacebook) => {
                const resServer = facebookLogin.callback(resFacebook);
                const errors = facebookCallback(resServer, props);
                if (errors) {
                    clearUserDetails();
                    console.log(errors); //todo catch failed attemt to login
                }
                setErrors(errors ? true : false)
            }}
            onFailure={(resFailed) => {
                const resFacebook = facebookLogin.onFailure(resFailed);
                clearUserDetails();
                console.log(resFacebook); //todo catch failed attemt to login
                setErrors(true)
            }}
            render={renderProps => (
                <Button className={className} onClick={renderProps.onClick}>
                    Facebook
                </Button>
            )}
        />
    )
}

export default FacebookSocial