import { Request, Response } from 'express';
import { TaskService } from '../services/task.service';

export class TaskController {
  static async getAll(req: Request, res: Response): Promise<void> {
    const tasks = await TaskService.getAll();
    res.status(200).json(tasks);
  }

  static async getById(req: Request, res: Response): Promise<void> {
    const task = await TaskService.getById(req.params.id);

    if (task === null) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }

    res.status(200).json(task);
  }

  static async create(req: Request, res: Response): Promise<void> {
    const newTask = await TaskService.create(req.body);
    res.status(201).json(newTask);
  }

  static async update(req: Request, res: Response): Promise<void> {
    const updatedTask = await TaskService.update(req.params.id, req.body);

    if (updatedTask === null) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }

    res.status(200).json(updatedTask);
  }

  static async delete(req: Request, res: Response): Promise<void> {
    const deleted = await TaskService.delete(req.params.id);

    if (!deleted) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }

    res.status(204).send();
  }
}
