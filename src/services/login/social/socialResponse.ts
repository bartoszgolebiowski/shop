interface AuthResponse {
  readonly access_token: string;
  readonly id_token: string;
  readonly login_hint: string;
  readonly scope: string;
  readonly expires_in: number;
  readonly first_issued_at: number;
  readonly expires_at: number;
}

export type SocialResponse = {
  name?: string
  email?: string
  pictureUrl?: string
  accessToken?: string
  status: string
}


export interface SocialMediaResponseSuccess extends SocialResponse {
  tokenObj?: AuthResponse,
  tokenId?: string,
}

export interface SocialMediaResponseFailed extends SocialResponse {
  errors: any
}

