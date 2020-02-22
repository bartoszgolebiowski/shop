import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline
} from "react-google-login";
import {
  SocialMediaResponseFailed,
  SocialMediaResponseSuccess,
  SocialResponse
} from "./socialResponse";

export interface GoogleLogin {
  onSuccess(
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ): SocialResponse;
  onFailure(response: any): SocialMediaResponseFailed;
}

export const googleLogin: GoogleLogin = {
  onSuccess: (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ): SocialResponse => {
    return instanceOfA(response)
      ? onSuccessOnline(response as GoogleLoginResponse)
      : onSuccessOffline(response as GoogleLoginResponseOffline);
  },
  onFailure: (response: any): SocialMediaResponseFailed => ({
    ...response,
    status: "failed"
  })
};

const onSuccessOnline = (
  response: GoogleLoginResponse
): SocialMediaResponseSuccess => ({
  name: response.getBasicProfile().getName(),
  email: response.getBasicProfile().getEmail(),
  pictureUrl: response.getBasicProfile().getImageUrl(),
  accessToken: response.accessToken,
  tokenObj: response.tokenObj,
  tokenId: response.tokenId,
  status: "success"
});

const onSuccessOffline = (
  response: GoogleLoginResponseOffline
): SocialMediaResponseFailed => ({
  errors: response,
  status: "failed"
});

const instanceOfA = (
  response: GoogleLoginResponse | GoogleLoginResponseOffline
): boolean => !response.hasOwnProperty("code");
