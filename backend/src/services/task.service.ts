import { PrismaClient, Task } from '@prisma/client';
import { CreateTaskInput } from '../dto/task.dto';
import { prisma } from '../prisma/client';

export class TaskService {
  private static instance: TaskService;
  
  private constructor(private prisma: PrismaClient) {}

  static getInstance(): TaskService {
    if (!TaskService.instance) {
      TaskService.instance = new TaskService(prisma);
    }
    return TaskService.instance;
  }

  async getAll(params?: { status?: string; page?: number; pageSize?: number }): Promise<Task[]> {
    const { status, page = 1, pageSize = 10 } = params || {};

    const filters = status ? { status } : {};

    return this.prisma.task.findMany({
      where: filters,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
  }

  async getById(id: string): Promise<Task | null> {
    return this.prisma.task.findUnique({ where: { id } });
  }

  async create(data: CreateTaskInput): Promise<Task> {
    return this.prisma.task.create({ data });
  }

  async update(id: string, data: Partial<Task>): Promise<Task | null> {
    return this.prisma.task.update({
      where: { id },
      data,
    }).catch(() => null);
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.prisma.task.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }
}
