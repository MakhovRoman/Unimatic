import { createAsyncThunk, createSlice,  } from "@reduxjs/toolkit";
import { LoginRequestData, RegisterRequestData, TokenDecode, UserType } from "@services/api/types";
import { userAPI } from "@services/api/userApi";
import { RootState } from "@services/store";
import jwtDecode from "jwt-decode";

interface UserState {
  user: UserType,
  isLoading: boolean,
  isError: boolean
}

const initialState: UserState = {
  user: {},
  isLoading: false,
  isError: false
}

export const userThunks = {
  userMe: createAsyncThunk(
    'user/me',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (data: Pick<LoginRequestData, "email">, {dispatch}) => {
      const {id, email, firstName, lastName} = await userAPI.me(data);

      dispatch(userSlice.actions.setUser({id, email, firstName, lastName}))
    }
  ),
  registration: createAsyncThunk(
    'user/registration',
    async (userData: RegisterRequestData, {dispatch}) => {
      const {token} = await userAPI.login(userData);
      localStorage.setItem('auth-token', token)
      const {id, email}: TokenDecode = await jwtDecode(token);

      // load user info
      dispatch(userSlice.actions.setUser({id, email}));
      email && dispatch(userThunks.userMe({email}))
    }
  ),
  login: createAsyncThunk(
    'user/login',
    async (userData: LoginRequestData, {dispatch}) => {
      const {token} = await userAPI.login(userData);
      localStorage.setItem('auth-token', token);

      // load user info
      dispatch(userThunks.userMe({email: userData.email}))
    }
  )
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    }
  }
})

export const selectUserData = (state: RootState) => state.user;

export const {setUser} = userSlice.actions;
