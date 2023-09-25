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
  exp?: number,
  iat?: number
}

export interface TaskRequestData {
  user_id: number,
  title: string,
  content: string
}

export interface TaskResponseData extends TaskRequestData {
  id: number,
  createdAt: string
}

export interface TaskUpdateRequestData extends Omit<TaskResponseData, "createdAt"> {
  id: number
}
