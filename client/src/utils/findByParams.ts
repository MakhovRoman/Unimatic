import { TaskResponseData } from "@services/api/types"

export const findByParams = (array: TaskResponseData[], id: number, params: "title" | "content") => {
  return array.find(item => item.id === id)![params];
}
