import { Request, Response } from "express";
import { Todo } from "../db";

class TodoController {
  async create(req: Request, res: Response) {
    const { user_id, title, content } = req.body;
    const task = await Todo.create({ user_id, title, content });

    return res.json("OK");
  }

  async update(req: Request, res: Response) {
    const {id, title, content} = req.body;

    const task = await Todo.findOne({where: {id}});

    task?.set({title, content});

    await task?.save();

    return res.json(task);
  }

  async getAll(req: Request, res: Response) {
    const {user_id} = req.body;

    const tasks = await Todo.findAll({where: {user_id}});

    return res.json(tasks)
  }

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);

    const task = await Todo.findByPk(id);

    await task?.destroy();

    return res.json("OK");
  }
}

export const todoController = new TodoController;
