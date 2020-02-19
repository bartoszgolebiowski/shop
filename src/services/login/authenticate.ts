import qs from 'qs'
import { SERVER_URL, CONNECT_TOKEN } from '../../constants/server/constants';

export interface LoginService {
    loginViaFacebok(socialReponse: string): Promise<Response>,
    loginViaGoogle(socialReponse: string): Promise<Response>,
}

export const serverLogin: LoginService = {
    async loginViaFacebok(token: string): Promise<Response> {
        return getServerToken(token, 'Facebook')
    },
    async loginViaGoogle(token: string): Promise<Response> {
        return getServerToken(token, 'Google')
    }
}

const statusCode = (statusCode: number) => ({ statusCode })

const getServerToken = (token: string, grant_type: string): any => {
    return fetch(`${SERVER_URL}${CONNECT_TOKEN}`, {
        method: 'POST',
        body: qs.stringify({ token, grant_type }),
        mode: 'cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
        .then(response => [statusCode(200), response.json()])
        .catch(err => [statusCode(500), err]);
}
