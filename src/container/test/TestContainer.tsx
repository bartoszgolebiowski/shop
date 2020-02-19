import React, { Dispatch } from 'react'
import { Action } from 'redux'
import { connect } from 'react-redux';
import { useQuery } from '@apollo/react-hooks';
import { ApolloError } from 'apollo-boost';
import FacebookLogin, { ReactFacebookLoginInfo, ReactFacebookFailureResponse } from 'react-facebook-login';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

import Counter from '../../components/counter/Counter'
import { incrementAsync, decrementAsync } from '../../redux/actions/counter/actions'
import { connectTokenGoogle, saveSocialToken, connectTokenFacebook, logOut } from '../../redux/actions/authenticate/actions'
import { GET_RATES } from '../../graphql/query/test/queries'
import { Rate } from '../../graphql/model/home/models';
import { googleLogin } from '../../services/login/social/google'
import { facebookLogin } from '../../services/login/social/facebook'
import { SocialResponse as SocialMediaResponse, SocialMediaResponseSuccess, SocialResponse } from '../../services/login/social/socialResponse';
import { APP_ID_FACEBOOK, APP_ID_GOOGLE } from '../../constants/server/constants';


type HomeProps = {
    value: number,
    auth: any,
    onIncrement: Function,
    onDecrement: Function,
    clearUserDetails: Function,
    connectTokenGoogle: Function,
    connectTokenFacebook: Function,
    saveSocialToken: Function
}

type RateProps = {
    loading: boolean,
    error: ApolloError | undefined,
    data: {
        rates: Rate[]
    }
}


export const Test = (props: HomeProps) => {
    const { loading, error, data } = useQuery(GET_RATES);
    const rateProps: RateProps = {
        loading, error, data
    }

    return (
        <div>
            <Rates {...rateProps} />
            <Counter {...props} />
            <FacebookLogin
                appId={APP_ID_FACEBOOK}
                fields='name,email,picture'
                callback={(resFacebook: ReactFacebookLoginInfo) => {
                    const resServer: SocialResponse = facebookLogin.callback(resFacebook);
                    const errors = facebookCallback(resServer, props)
                    if (errors) {
                        console.log(errors) //todo catch failed attemt to login
                        props.clearUserDetails()
                    }
                }}
                onFailure={(res: ReactFacebookFailureResponse) => {
                    const resFacebook = facebookLogin.onFailure(res)
                    props.clearUserDetails()
                    console.log(resFacebook)  //todo catch failed attemt to login
                }}
            />
            <GoogleLogin
                clientId={APP_ID_GOOGLE}
                buttonText='Login'
                onSuccess={(resGoogle: GoogleLoginResponse | GoogleLoginResponseOffline) => {
                    const resServer: SocialResponse = googleLogin.onSuccess(resGoogle)
                    const errors = googleCallback(resServer, props)
                    if (errors) {
                        console.log(errors)  //todo catch failed attemt to login
                        props.clearUserDetails()
                    }
                }}
                onFailure={(res: any) => {
                    const resGoogle = googleLogin.onFailure(res)
                    props.clearUserDetails()
                    console.log(resGoogle)  //todo catch failed attemt to login
                }}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    );
}

const Rates = ({ loading, error, data }: RateProps) => {
    return (
        <div>
            {loading && <div>Loading...</div>}
            {error && <div>Error</div>}
            {data && <div>Fetch completed</div>}
        </div>
    )
}

const actionToProps = (dispatch: Dispatch<Action>) => ({
    onIncrement: () => dispatch(incrementAsync()),
    onDecrement: () => dispatch(decrementAsync()),
    clearUserDetails: () => dispatch(logOut()),
    saveSocialToken: (token: string) => dispatch(saveSocialToken(token)),
    connectTokenGoogle: (response: SocialMediaResponseSuccess) => dispatch(connectTokenGoogle(response)),
    connectTokenFacebook: (response: SocialMediaResponseSuccess) => dispatch(connectTokenFacebook(response)),
});

const stateToProps = (state: any) => ({
    value: state.counterReducer.value,
    auth: state.authenticateReducer
});

const facebookCallback = (response: SocialResponse, { saveSocialToken, connectTokenFacebook }: HomeProps): SocialMediaResponse | undefined => {
    if (response.status === 'success') {
        const socialMediaResponse = response as SocialMediaResponseSuccess;
        saveSocialToken(socialMediaResponse.accessToken);
        connectTokenFacebook(socialMediaResponse);
    } else {
        return response;
    }
}

const googleCallback = (response: SocialResponse, { saveSocialToken, connectTokenGoogle }: HomeProps): SocialMediaResponse | undefined => {
    if (response.status === 'success') {
        const socialMediaResponse = response as SocialMediaResponseSuccess;
        saveSocialToken(socialMediaResponse.tokenId);
        connectTokenGoogle(socialMediaResponse);
    } else {
        return response;
    }
}

export default connect(stateToProps, actionToProps)(Test)



