import { Request, Response } from "express";
import { Todo } from "../db";
import { ApiError } from "../api/apiError";

class TodoController {
  async create(req: Request, res: Response) {
    const { user_id, title, content } = req.body;
    const task = await Todo.create({ user_id, title, content });

    return res.json(task);
  }

  async modify(req: Request, res: Response) {

  }

  async getOne(req: Request, res: Response) {

  }

  async getAll(req: Request, res: Response) {
    const {user_id} = req.query;

    const tasks = await Todo.findAll({where: {user_id}});

    return res.json(tasks)
  }

  async delete(req: Request, res: Response) {

  }
}


export const todoController = new TodoController;
