import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { taskAPI } from "@services/api/taskAPI";
import { TaskRequestData, TaskResponseData, TaskUpdateRequestData } from "@services/api/types";
import { RootState } from "@services/store";
import { getModalState } from "@utils/getModalState";

interface TaskState {
  current: CurrentTask | null,
  taskList: TaskResponseData[],
  isOpen: boolean
}

interface CurrentTask {
  id: string,
}

const initialState: TaskState = {
  current: null,
  taskList: [],
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
      list.sort((a, b) => Number(a.id) - Number(b.id));
      dispatch(taskSlice.actions.setTaskList(list));
    }
  ),

  update: createAsyncThunk(
    'task/update',
    async (data: TaskUpdateRequestData, {dispatch}) => {
      await taskAPI.update(data);
      dispatch(taskThunks.getTaskList({user_id: data.user_id}));
    }
  ),

  delete: createAsyncThunk(
    'task/delete',
    async (id: number) => {
      await taskAPI.delete(id);
    }
  )
}

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setCurrentTask: (state, action) => {
      localStorage.setItem('task_current', action.payload.id)

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
      localStorage.setItem('task_current', '');

      state.isOpen = getModalState();
    }
  }
})

export const selectTaskData = (state: RootState) => state.task;

export const {setCurrentTask, closeTaskModal, openTaskModal, setTaskList} = taskSlice.actions;
