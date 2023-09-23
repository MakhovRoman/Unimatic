import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@services/store";
import { getModalState } from "@utils/getModalState";

interface TaskState {
  current: number | null,
  title: string,
  content: string,
  isOpen: boolean
}

export interface TaskRequestData {
  title: string,
  content: string
}

const initialState: TaskState = {
  current: null,
  title: '',
  content: '',
  isOpen: getModalState()
}

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setCurrentTask: (state, action) => {
      state.current = action.payload,
      state.isOpen = true
    },
    openTaskModal: (state) => {
      localStorage.setItem("modal_state", "true");
      state.isOpen = getModalState();
    },
    closeTaskModal: (state) => {
      localStorage.setItem("modal_state", "false");
      state.isOpen = getModalState();
    }
  }
})

export const selectTaskData = (state: RootState) => state.task;

export const {setCurrentTask, closeTaskModal, openTaskModal} = taskSlice.actions;
