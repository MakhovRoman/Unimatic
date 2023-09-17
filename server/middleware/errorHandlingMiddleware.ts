import { ApiError } from "../api/apiError";
import { Request, Response } from "express";

export const errorHandler = (err: Error, req: Request, res: Response, next: (arg: ApiError) => any) => {
  if (err instanceof ApiError) {
    return res.status(err.status).json({message: err.message})
  }

  return res.status(500).json({message: "Что-то пошло не так..."})
}
