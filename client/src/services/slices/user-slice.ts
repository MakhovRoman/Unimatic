import { createAsyncThunk, createSlice,  } from "@reduxjs/toolkit";
import { LoginRequestData, RegisterRequestData, UserType } from "@services/api/types";
import { userAPI } from "@services/api/userApi";
import { RootState } from "@services/store";
import { taskThunks } from "./task-slice";
import axios from "axios";

interface UserState {
  user: UserType,
  isLoading: boolean,
  error: null | string
}

const initialState: UserState = {
  user: {},
  isLoading: false,
  error: null
}

export const userThunks = {
  userMe: createAsyncThunk(
    'user/me',
    async (data: Pick<LoginRequestData, "email">, {dispatch, rejectWithValue}) => {
      try {
        const {id, email, firstName, lastName} = await userAPI.me(data);

        dispatch(userSlice.actions.setUser({id, email, firstName, lastName}));
        id && dispatch(taskThunks.getTaskList({user_id: id}));
      } catch (error) {
        if (error instanceof axios.AxiosError) {
          return rejectWithValue(error?.response?.data)
        }

        return rejectWithValue(null);
      }

    }
  ),
  registration: createAsyncThunk(
    'user/registration',
    async (userData: RegisterRequestData, {dispatch, rejectWithValue}) => {
      try {
        await userAPI.registration(userData);
        dispatch(userThunks.login({
          email: userData.email,
          password: userData.password
        }))
      } catch (error) {
        if (error instanceof axios.AxiosError) {
          return rejectWithValue(error?.response?.data)
        }

        return rejectWithValue(null);
      }
    }
  ),
  login: createAsyncThunk(
    'user/login',
    async (userData: LoginRequestData, {dispatch, rejectWithValue}) => {
      try {
        const {token} = await userAPI.login(userData);
        localStorage.setItem('auth-token', token);

        // load user info
        dispatch(userThunks.userMe({email: userData.email}))
      } catch (error) {
        if (error instanceof axios.AxiosError) {
          return rejectWithValue(error?.response?.data)
        }

        return rejectWithValue(null);
      }
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
      state.error = null;
    }),
    builder.addCase(userThunks.userMe.fulfilled, (state) => {
      state.isLoading = false;
      state.error = null;
    }),
    builder.addCase(userThunks.userMe.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.payload?.message ? action?.payload?.message : null;
    }),

    // registration
    builder.addCase(userThunks.registration.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    }),
    builder.addCase(userThunks.registration.fulfilled, (state) => {
      state.isLoading = false;
      state.error = null;
    }),
    builder.addCase(userThunks.registration.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.payload?.message ? action?.payload?.message : null;
    }),

    // login
    builder.addCase(userThunks.login.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    }),
    builder.addCase(userThunks.login.fulfilled, (state) => {
      state.isLoading = false;
      state.error = null;
    }),
    builder.addCase(userThunks.login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.payload?.message ? action?.payload?.message : null;
    })
  }
})

export const selectUserData = (state: RootState) => state.user;

export const {setUser} = userSlice.actions;
