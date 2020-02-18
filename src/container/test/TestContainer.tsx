import React, { Dispatch } from 'react'
import { Action } from 'redux'
import { connect } from 'react-redux';
import { useQuery } from '@apollo/react-hooks';
import { ApolloError } from 'apollo-boost';
import FacebookLogin, { ReactFacebookLoginInfo } from 'react-facebook-login';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

import Counter from '../../components/counter/Counter'
import { incrementAsync, decrementAsync } from '../../redux/actions/counter/actions'
import { GET_RATES } from '../../graphql/query/test/queries'
import { Rate } from '../../graphql/model/home/models';
import { googleLogin } from '../../services/login/social/google'
import { facebookLogin } from '../../services/login/social/facebook'
import { serverLogin } from '../../services/login/authenticate'
import { SocialResponse as SocialMediaResponse, SocialMediaResponseSuccess } from '../../services/login/social/socialResponse';
import { APP_ID_FACEBOOK, APP_ID_GOOGLE } from '../../constants/server/constants';

type HomeProps = {
    value: number,
    onIncrement: Function,
    onDecrement: Function,
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
                callback={(res: ReactFacebookLoginInfo) => {
                    const response: SocialMediaResponse = facebookLogin.callback(res)
                    if (response.status === 'success') {
                        serverLogin.loginViaFacebok(response as SocialMediaResponseSuccess)
                    }
                }}
            />
            <GoogleLogin
                clientId={APP_ID_GOOGLE}
                buttonText='Login'
                onSuccess={(res: GoogleLoginResponse | GoogleLoginResponseOffline) => {
                    const response: SocialMediaResponse = googleLogin.onSuccess(res)
                    if (response.status === 'success') {
                        serverLogin.loginViaGoogle(response as SocialMediaResponseSuccess)
                    }
                }}
                onFailure={(res: any) => {
                    const result = googleLogin.onFailure(res)
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
});

const stateToProps = (state: any) => ({
    value: state.counterReducer.value
});

export default connect(stateToProps, actionToProps)(Test)