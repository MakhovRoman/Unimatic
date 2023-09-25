import { TaskResponseData } from "@services/api/types";
import { findByParams } from "./findByParams";

export const setModalState = (taskList: TaskResponseData[], id: number) => {
  localStorage.setItem('modal_title', findByParams(taskList, id, "title"));
  localStorage.setItem('modal_content', findByParams(taskList, id, "content"));
  localStorage.setItem('modal_state', "true");
}
