import { request } from "./apiRequest";
import { TaskRequestData, TaskResponseData } from "./types";

export const taskAPI = {
  create: (data: TaskRequestData): Promise<TaskResponseData> =>
    request.post<TaskResponseData, TaskRequestData>('api/task/', data),

  getTaskList: <T =  Pick<TaskRequestData, "user_id">>(data: T): Promise<TaskResponseData[]> =>
    request.post<TaskResponseData[], T>('api/task/all/', data)
}
