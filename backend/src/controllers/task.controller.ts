import { Request, Response } from 'express';
import { TaskService } from '../services/task.service';
import { AppError } from '../errors/app-error';

export class TaskController {
  static async list(req: Request, res: Response) {
    const tasks = await TaskService.getAll();
    return res.json(tasks);
  }

  static async get(req: Request, res: Response) {
    const { id } = req.params;
    const task = await TaskService.getById(id);

    if (!task) {
      throw new AppError('Task not found', 404);
    }

    return res.json(task);
  }

  static async create(req: Request, res: Response) {
    const { title, description, status } = req.body;

    if (!title) {
      throw new AppError('Title is required', 400);
    }

    if (!status) {
      throw new AppError('Status is required', 400);
    }

    const task = await TaskService.create({ title, description, status });
    return res.status(201).json(task);
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const { title, description, status } = req.body;

    const updated = await TaskService.update(id, { title, description, status });

    if (!updated) {
      throw new AppError('Task not found', 404);
    }

    return res.json(updated);
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;
    const deleted = await TaskService.delete(id);

    if (!deleted) {
      throw new AppError('Task not found', 404);
    }

    return res.status(204).send();
  }
}
