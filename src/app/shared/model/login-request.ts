export interface LoginRequest {
    email: string;
    password: string;
}

export interface JwtResp {
    email: string;
    jwtToken: string;
}
