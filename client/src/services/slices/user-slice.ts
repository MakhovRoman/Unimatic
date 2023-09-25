import { createAsyncThunk, createSlice,  } from "@reduxjs/toolkit";
import { LoginRequestData, RegisterRequestData, UserType } from "@services/api/types";
import { userAPI } from "@services/api/userApi";
import { RootState } from "@services/store";
import { taskThunks } from "./task-slice";

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
    async (data: Pick<LoginRequestData, "email">, {dispatch}) => {
      const {id, email, firstName, lastName} = await userAPI.me(data);

      dispatch(userSlice.actions.setUser({id, email, firstName, lastName}));
      id && dispatch(taskThunks.getTaskList({user_id: id}));
    }
  ),
  registration: createAsyncThunk(
    'user/registration',
    async (userData: RegisterRequestData, {dispatch}) => {
      await userAPI.registration(userData);
      dispatch(userThunks.login({
        email: userData.email,
        password: userData.password
      }))
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
  },
  extraReducers: (builder) => {
    // userMe
    builder.addCase(userThunks.userMe.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    }),
    builder.addCase(userThunks.userMe.fulfilled, (state) => {
      state.isLoading = false;
      state.isError = false;
    }),
    builder.addCase(userThunks.userMe.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    }),

    // registration
    builder.addCase(userThunks.registration.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    }),
    builder.addCase(userThunks.registration.fulfilled, (state) => {
      state.isLoading = false;
      state.isError = false;
    }),
    builder.addCase(userThunks.registration.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    }),

    // login
    builder.addCase(userThunks.login.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    }),
    builder.addCase(userThunks.login.fulfilled, (state) => {
      state.isLoading = false;
      state.isError = false;
    }),
    builder.addCase(userThunks.login.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    })
  }
})

export const selectUserData = (state: RootState) => state.user;

export const {setUser} = userSlice.actions;
