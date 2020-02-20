import qs from "qs";
import { SERVER_URL, CONNECT_TOKEN } from "../../constants/server/constants";

export type ServerResponse = {
  token_type: string;
  access_token: string;
  expires_in: number;
};

export type LoginServerReponse = {
  statusCode: number;
  response: ServerResponse;
};

export interface LoginService {
  loginViaFacebok(socialReponse: string): Promise<LoginServerReponse>;
  loginViaGoogle(socialReponse: string): Promise<LoginServerReponse>;
}

export const serverLogin: LoginService = {
  async loginViaFacebok(token: string): Promise<LoginServerReponse> {
    return getServerToken(token, "Facebook");
  },
  async loginViaGoogle(token: string): Promise<LoginServerReponse> {
    return getServerToken(token, "Google");
  }
};

const statusCode = (
  statusCode: number,
  response: ServerResponse
): LoginServerReponse => ({ statusCode, response });

const getServerToken = (
  token: string,
  grant_type: string
): Promise<LoginServerReponse> => {
  return fetch(`${SERVER_URL}${CONNECT_TOKEN}`, {
    method: "POST",
    body: qs.stringify({ token, grant_type }),
    mode: "cors",
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  })
    .then(response => response.json())
    .then(response => statusCode(200, response))
    .catch(err => statusCode(500, err));
};
