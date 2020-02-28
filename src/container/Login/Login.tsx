import React, { Dispatch, useState } from 'react';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import { logOut, saveSocialToken, connectTokenGoogle, connectTokenFacebook } from '../../redux/actions/authenticate/actions';
import { SocialResponse, SocialMediaResponseSuccess, SocialResponse as SocialMediaResponse } from '../../services/login/social/socialResponse';
import { RootState } from '../../redux/reducers/rootReducer';
import { AuthenticateState } from '../../redux/actions/authenticate/actionTypes';
import FacebookSocial from '../../components/social/FacebookSocial';
import GoogleSocial from '../../components/social/GoogleSocial';

const socialButton = {
    backgroundColor: '#d5d5d5',
    borderRadius: '25px',
    margin: '4px',
    '& > span': {
        fontSize: '0.6rem'
    }
}

const useStyles = makeStyles({
    root: {
        height: 'calc(100% - 3rem)',
        backgroundColor: 'blue'
    },
    container: {
        display: 'flex',
        flex: 1,
        height: '100%',
        backgroundColor: 'red'
    },
    left: {
        display: 'flex',
        flex: 1,
        backgroundColor: 'white'
    },
    right: {
        display: 'flex',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: 'blue'
    },
    paper: {
        display: 'grid',
        height: '50vh',
        width: '50vh',
        margin: 'auto 0',
        gridTemplateColumns: '20% 30% 30% 20%',
        gridTemplateRows: '20% 10% 10% 15% 15% 30%',
    },
    description: {
        gridColumnStart: 2,
        gridColumnEnd: 4,
        gridRowStart: 2,
        gridRowEnd: 3,
        textAlign: 'center',
        margin: 'auto 0',
        '& > span': {
            fontSize: '1.5rem'
        }
    },
    google: {
        gridColumn: '2 / 3',
        gridRow: '4 / 5',
        ...socialButton
    },
    facebook: {
        gridColumn: '3 / 4',
        gridRow: '4 / 5',
        ...socialButton
    },
    footer: {
        gridColumn: '2 / 4',
        gridRow: '6 / 7',
    }
})

type LoginProps = {
    auth: AuthenticateState;
    clearUserDetails: Function;
    connectTokenGoogle: Function;
    connectTokenFacebook: Function;
    saveSocialToken: Function;
};

export const Login = (props: LoginProps) => {
    const [errors, setErrors] = useState(false);
    const classes = useStyles();

    const socialProps = {
        setErrors,
        clearUserDetails: props.clearUserDetails,
        saveSocialToken: props.saveSocialToken
    }
    
    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <div className={classes.left} />
                <div className={classes.right}>
                    <Paper className={classes.paper}>
                        <div className={classes.description}>
                            <span>Login via social media</span>
                        </div>
                        <GoogleSocial
                            {...socialProps}
                            googleCallback={googleCallback}
                            className={classes.google}
                            connectTokenGoogle={props.connectTokenGoogle} />
                        <FacebookSocial
                            {...socialProps}
                            facebookCallback={facebookCallback}
                            className={classes.facebook}
                            connectTokenFacebook={props.connectTokenFacebook} />
                        <div className={classes.footer}>
                            {errors && <span>errors</span>}
                        </div>
                    </Paper>
                </div>
            </div>
        </div>
    )
}

const facebookCallback = (response: SocialResponse, { saveSocialToken, connectTokenFacebook }: LoginProps): SocialMediaResponse | undefined => {
    if (response.status === "success") {
        saveSocialTokenAndConnectToServer(response, saveSocialToken, connectTokenFacebook);
    } else {
        return response;
    }
};

const googleCallback = (response: SocialResponse, { saveSocialToken, connectTokenGoogle }: LoginProps): SocialMediaResponse | undefined => {
    if (isStatusCodeSuccess(response)) {
        saveSocialTokenAndConnectToServer(response, saveSocialToken, connectTokenGoogle);
    } else {
        return response;
    }
};

const saveSocialTokenAndConnectToServer = (response: SocialMediaResponse, saveSocialToken: Function, connectTokenSocial: Function): void => {
    const socialMediaResponse = response as SocialMediaResponseSuccess;
    saveSocialToken(socialMediaResponse.tokenId);
    connectTokenSocial(socialMediaResponse);
};

const isStatusCodeSuccess = (response: SocialMediaResponse): boolean => {
    return response.status === "success";
};

const actionToProps = (dispatch: Dispatch<Action>) => ({
    clearUserDetails: () => dispatch(logOut()),
    saveSocialToken: (token: string) => dispatch(saveSocialToken(token)),
    connectTokenGoogle: (response: SocialMediaResponseSuccess) => dispatch(connectTokenGoogle(response)),
    connectTokenFacebook: (response: SocialMediaResponseSuccess) => dispatch(connectTokenFacebook(response))
});

const stateToProps = (state: RootState) => ({
    auth: state.authenticateReducer
});

export default connect(stateToProps, actionToProps)(Login)