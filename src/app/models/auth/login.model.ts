export interface LoginModel{
    email: string;
    password: string;
}

export interface LoginResponseModel{
    accessToken:string;
    expiration: string,
    requiredAuthenticatorType: number
}