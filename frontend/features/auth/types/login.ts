export interface LoginRequest {

  email: string;

  password: string;

}

export interface LoginResponse {

  accessToken: string;

  refreshToken: string;

  fullName: string;

  email: string;

  message: string;

}