import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { taskAPI } from "@services/api/taskAPI";
import { TaskRequestData, TaskResponseData } from "@services/api/types";
import { RootState } from "@services/store";
import { getModalState } from "@utils/getModalState";

interface TaskState {
  current: number | null,
  taskList: TaskResponseData[],
  title: string,
  content: string,
  isOpen: boolean
}

const initialState: TaskState = {
  current: null,
  taskList: [],
  title: '',
  content: '',
  isOpen: getModalState()
}

export const taskThunks = {
  create: createAsyncThunk(
    'task/create',
    async(data: TaskRequestData, {dispatch}) => {
      await taskAPI.create(data);
      dispatch(taskThunks.getTaskList({user_id: data.user_id}));
    }
  ),

  getTaskList: createAsyncThunk(
    'task/getTaskList',
    async(data: Pick<TaskRequestData, "user_id">, {dispatch}) => {
      const list = await taskAPI.getTaskList(data);
      dispatch(taskSlice.actions.setTaskList(list));
    }
  )
}

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setCurrentTask: (state, action) => {
      state.current = action.payload,
      state.isOpen = true
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

      state.isOpen = getModalState();
    }
  }
})

export const selectTaskData = (state: RootState) => state.task;

export const {setCurrentTask, closeTaskModal, openTaskModal, setTaskList} = taskSlice.actions;
