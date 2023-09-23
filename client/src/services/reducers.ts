import { combineReducers } from "@reduxjs/toolkit";
import { userSlice } from "./slices/user-slice";
import { taskSlice } from "./slices/task-slice";

export const rootReducer = combineReducers({
  user: userSlice.reducer,
  task: taskSlice.reducer
})
