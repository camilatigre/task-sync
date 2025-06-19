import { prisma } from '../prisma/client';
import { Task } from '@prisma/client';

type CreateTaskInput = {
  title: string;
  description?: string | null;
  status: string;
};

export class TaskService {
  static async getAll(): Promise<Task[]> {
    return prisma.task.findMany({ orderBy: { createdAt: 'desc' } });
  }

  static async getById(id: string): Promise<Task | null> {
    return prisma.task.findUnique({ where: { id } });
  }

  static async create(data: CreateTaskInput): Promise<Task> {
    return prisma.task.create({ data });
  }

  static async update(id: string, data: Partial<Task>): Promise<Task | null> {
    return prisma.task.update({
      where: { id },
      data,
    }).catch(() => null); // Garante retorno null se não existir
  }

  static async delete(id: string): Promise<boolean> {
    try {
      await prisma.task.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }
}
