import {
  ReactFacebookLoginInfo,
  ReactFacebookFailureResponse
} from "react-facebook-login";
import { SocialResponse, SocialMediaResponseFailed } from "./socialResponse";

export interface FacebookLogin {
  callback(response: ReactFacebookLoginInfo): SocialResponse;
  onFailure(response: ReactFacebookFailureResponse): SocialMediaResponseFailed;
}

export const facebookLogin: FacebookLogin = {
  callback: (response: ReactFacebookLoginInfo) => {
    return instanceOfA(response) ? onSuccess(response) : onFailed(response);
  },
  onFailure: (
    response: ReactFacebookFailureResponse
  ): SocialMediaResponseFailed => ({
    errors: { ...response },
    status: "failed"
  })
};

const onSuccess = (response: ReactFacebookLoginInfo): SocialResponse => ({
  name: response.name || "",
  email: response.email || "",
  pictureUrl: response.picture?.data.url || "",
  accessToken: response.accessToken,
  status: "success"
});

const onFailed = (response: any): SocialMediaResponseFailed => ({
  errors: response,
  status: "failed"
});

const instanceOfA = (response: ReactFacebookLoginInfo): boolean =>
  !response.hasOwnProperty("status");
