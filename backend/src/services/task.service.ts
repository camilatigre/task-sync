import { prisma } from '../prisma/client';
import { Task } from '@prisma/client';

export type CreateTaskInput = {
  title: string;
  description?: string | null;
  status: string;
};

export class TaskService {
  static async getAll(params?: { status?: string; page?: number; pageSize?: number }): Promise<Task[]> {
    const { status, page = 1, pageSize = 10 } = params || {};

    const filters = status ? { status } : {};

    return prisma.task.findMany({
      where: filters,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
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
    }).catch(() => null);
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
