export interface LoginRequestData {
  email: string,
  password: string
}

export interface RegisterRequestData extends LoginRequestData {
  firstName: string,
  lastName: string
}

export interface UserType {
  id?: number,
  email?: string,
  firstName?: string,
  lastName?: string
}

export interface TokenType {
  token: string
}

export interface TokenDecode extends UserType {
  exp: number,
  iat: number
}
