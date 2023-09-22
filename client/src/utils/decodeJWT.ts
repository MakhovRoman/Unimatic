import { LoginRequestData, TokenDecode } from "@services/api/types"
import jwtDecode from "jwt-decode"

export const decodeJWT = (token: string):string => {
  const decode = jwtDecode(token) as TokenDecode;
  const {email} = decode as Pick<LoginRequestData, "email">;

  return email;
}
