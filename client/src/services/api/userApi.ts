import { request } from "./apiRequest";
import { LoginRequestData } from "./types";

export const userAPI = {
  registration: (data: LoginRequestData): Promise<"OK"> =>
    request.post<"OK", LoginRequestData>('api/user/registration', data)
}
