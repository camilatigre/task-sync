import { Request, Response } from 'express';
import { TaskService } from '../services/task.service';
import { AppError } from '../errors/app-error';

export class TaskController {
  static async getAll(req: Request, res: Response) {
    const { status, page, pageSize } = req.query;
    const tasks = await TaskService.getAll({
      status: status as string,
      page: page ? Number(page) : undefined,
      pageSize: pageSize ? Number(pageSize) : undefined,
    });
    res.json(tasks);
  }

  static async getById(req: Request, res: Response) {
    const task = await TaskService.getById(req.params.id);
    if (!task) throw new AppError('Task not found', 404);
    res.json(task);
  }

  static async create(req: Request, res: Response) {
    const task = await TaskService.create(req.body);
    res.status(201).json(task);
  }

  static async update(req: Request, res: Response) {
    const task = await TaskService.update(req.params.id, req.body);
    if (!task) throw new AppError('Task not found', 404);
    res.json(task);
  }

  static async delete(req: Request, res: Response) {
    const success = await TaskService.delete(req.params.id);
    if (!success) throw new AppError('Task not found', 404);
    res.status(204).send();
  }
}
