import qs from 'qs'
import { SocialMediaResponseSuccess } from "./social/socialResponse";
import { GoogleLoginResponseOffline } from "react-google-login";
import { SERVER_URL, CONNECT_TOKEN } from '../../constants/server/constants';

export interface LoginService {
    loginViaFacebok(socialReponse: SocialMediaResponseSuccess): Promise<boolean>,
    loginViaGoogle(socialReponse: SocialMediaResponseSuccess | GoogleLoginResponseOffline): Promise<boolean>,
}

export const serverLogin: LoginService = {
    async loginViaFacebok({ accessToken }: SocialMediaResponseSuccess): Promise<boolean> {
        try {
            const res = await fetch(`${SERVER_URL}${CONNECT_TOKEN}`, {
                method: 'POST',
                body: qs.stringify({ 'token': accessToken, 'grant_type': 'Facebook' }),
                mode: 'cors',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
            console.log(res);
            return res.status === 200 ? true :false ;
        }
        catch (err) {
            console.log(err);
            return false;
        }
    },
    async loginViaGoogle({ tokenId }: SocialMediaResponseSuccess): Promise<boolean> {
        try {
            const res = await fetch(`${SERVER_URL}${CONNECT_TOKEN}`, {
                method: 'POST',
                body: qs.stringify({'token': tokenId,'grant_type': 'Google'}),
                mode: 'cors',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
            return res.status === 200 ? true :false ;
        }
        catch (err) {
            console.log(err);
            return false;
        }
    },
}