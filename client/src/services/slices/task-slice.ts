import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { taskAPI } from "@services/api/taskAPI";
import { TaskRequestData, TaskResponseData, TaskUpdateRequestData } from "@services/api/types";
import { RootState } from "@services/store";
import { getModalState } from "@utils/getModalState";
import axios from "axios";

interface TaskState {
  current: CurrentTask | null,
  taskList: TaskResponseData[],
  isOpen: boolean,
  isLoading: boolean,
  error: null | string
}

interface CurrentTask {
  id: string,
}

const initialState: TaskState = {
  current: null,
  taskList: [],
  isOpen: getModalState(),
  isLoading: false,
  error: null
}

export const taskThunks = {
  create: createAsyncThunk(
    'task/create',
    async(data: TaskRequestData, {dispatch, rejectWithValue}) => {
      try {
        await taskAPI.create(data);
        dispatch(taskThunks.getTaskList({user_id: data.user_id}));
      } catch (error) {
        if (error instanceof axios.AxiosError) {
          return rejectWithValue(error?.response?.data)
        }

        return rejectWithValue(null);
      }

    }
  ),

  getTaskList: createAsyncThunk(
    'task/getTaskList',
    async(data: Pick<TaskRequestData, "user_id">, {dispatch, rejectWithValue}) => {
      try {
        const list = await taskAPI.getTaskList(data);
        list.sort((a, b) => Number(a.id) - Number(b.id));
        dispatch(taskSlice.actions.setTaskList(list));
      } catch (error) {
        if (error instanceof axios.AxiosError) {
          return rejectWithValue(error?.response?.data)
        }

        return rejectWithValue(null);
      }
    }
  ),

  update: createAsyncThunk(
    'task/update',
    async (data: TaskUpdateRequestData, {dispatch, rejectWithValue}) => {
      try {
        await taskAPI.update(data);
        dispatch(taskThunks.getTaskList({user_id: data.user_id}));
      } catch (error) {
        if (error instanceof axios.AxiosError) {
          return rejectWithValue(error?.response?.data)
        }

        return rejectWithValue(null);
      }

    }
  ),

  delete: createAsyncThunk(
    'task/delete',
    async (id: number, {rejectWithValue}) => {
      try {
        await taskAPI.delete(id);
      } catch (error) {
        if (error instanceof axios.AxiosError) {
          return rejectWithValue(error?.response?.data)
        }

        return rejectWithValue(null);
      }

    }
  )
}

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setCurrentTask: (state, action) => {
      state.current = action.payload;
      state.isOpen = true;

      if (action.payload?.id !== undefined) {
        localStorage.setItem('task_current', action.payload?.id)
      }

    },
    setTaskList: (state, action) => {
      state.taskList = action.payload
    },
    openTaskModal: (state) => {
      localStorage.setItem("modal_state", "true");
      state.isOpen = getModalState();
    },
    closeTaskModal: (state) => {
      localStorage.setItem("modal_state", "false");
      localStorage.setItem("modal_title", '');
      localStorage.setItem("modal_content", '');
      localStorage.setItem('task_current', '');

      state.isOpen = getModalState();
    }
  },
  extraReducers: (builder) => {
    // create task
    builder.addCase(taskThunks.create.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    }),
    builder.addCase(taskThunks.create.fulfilled, (state) => {
      state.isLoading = false;
      state.error = null;
    }),
    builder.addCase(taskThunks.create.rejected, (state) => {
      state.isLoading = false;
      state.error = action?.payload?.message ? action?.payload?.message : null;
    }),

    // get taskList
    builder.addCase(taskThunks.getTaskList.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    }),
    builder.addCase(taskThunks.getTaskList.fulfilled, (state) => {
      state.isLoading = false;
      state.error = null;
    }),
    builder.addCase(taskThunks.getTaskList.rejected, (state) => {
      state.isLoading = false;
      state.error = action?.payload?.message ? action?.payload?.message : null;
    }),

    // update
    builder.addCase(taskThunks.update.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    }),
    builder.addCase(taskThunks.update.fulfilled, (state) => {
      state.isLoading = false;
      state.error = null;
    }),
    builder.addCase(taskThunks.update.rejected, (state) => {
      state.isLoading = false;
      state.error = action?.payload?.message ? action?.payload?.message : null;
    }),

    // delete
    builder.addCase(taskThunks.delete.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    }),
    builder.addCase(taskThunks.delete.fulfilled, (state) => {
      state.isLoading = false;
      state.error = null;
    }),
    builder.addCase(taskThunks.delete.rejected, (state) => {
      state.isLoading = false;
      state.error = action?.payload?.message ? action?.payload?.message : null;
    })
  }
})

export const selectTaskData = (state: RootState) => state.task;

export const {setCurrentTask, closeTaskModal, openTaskModal, setTaskList} = taskSlice.actions;
