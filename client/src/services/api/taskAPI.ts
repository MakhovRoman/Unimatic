import { request } from "./apiRequest";
import { TaskRequestData, TaskResponseData, TaskUpdateRequestData } from "./types";

export const taskAPI = {
  create: (data: TaskRequestData): Promise<"OK"> =>
    request.post<"OK", TaskRequestData>('api/task/', data),

  getTaskList: <T =  Pick<TaskRequestData, "user_id">>(data: T): Promise<TaskResponseData[]> =>
    request.post<TaskResponseData[], T>('api/task/all/', data),

  update: (data: TaskUpdateRequestData): Promise<TaskResponseData> =>
    request.put<TaskResponseData ,TaskUpdateRequestData>('api/task/', data),

  delete: (id: number) =>
    request.delete<Promise<"OK">>(`api/task/${id}`, {
      baseURL: __API__ENDPOINT__
    })
}
