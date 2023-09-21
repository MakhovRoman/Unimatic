import { request } from "./apiRequest";
import { LoginRequestData, TokenType, UserType } from "./types";

export const userAPI = {
  registration: (data: LoginRequestData): Promise<TokenType> =>
    request.post<TokenType, LoginRequestData>('api/user/registration', data),

  login: (data: LoginRequestData): Promise<TokenType> =>
    request.post<TokenType, LoginRequestData>('api/user/login', data),

  check: (): Promise<"OK"> => request.post<"OK", LoginRequestData>('api/user/auth'),

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  me: (data: any): Promise<UserType> => request.post<UserType, any>('api/user/me', data)
}
