import { TaskService } from '../../src/services/task.service';
import { prismaMock } from './__mocks__/client';
import { Task } from '@prisma/client';

const now = new Date();

const mockTask: Task = {
  id: '1',
  title: 'Test Task',
  description: 'Example',
  status: 'pending',
  createdAt: now,
  updatedAt: now,
};

describe('TaskService', () => {
  const service = new TaskService(prismaMock);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return a paginated list of tasks', async () => {
    prismaMock.task.findMany.mockResolvedValue([mockTask]);

    const tasks = await service.getAll();

    expect(tasks).toHaveLength(1);
    expect(tasks[0].title).toBe('Test Task');
    expect(prismaMock.task.findMany).toHaveBeenCalledWith({
      where: {},
      orderBy: { createdAt: 'desc' },
      skip: 0,
      take: 10,
    });
  });

  it('should create a new task', async () => {
    const input = { title: 'New Task', status: 'pending' };
    const expectedTask = {
      ...mockTask,
      ...input,
      id: '2',
      description: null,
    };

    prismaMock.task.create.mockResolvedValue(expectedTask);

    const result = await service.create(input);
    expect(result).toEqual(expectedTask);
    expect(prismaMock.task.create).toHaveBeenCalledWith({ data: input });
  });

  it('should return a task by ID', async () => {
    prismaMock.task.findUnique.mockResolvedValue(mockTask);

    const result = await service.getById('1');
    expect(result).toEqual(mockTask);
    expect(prismaMock.task.findUnique).toHaveBeenCalledWith({ where: { id: '1' } });
  });

  it('should return null when task ID does not exist', async () => {
    prismaMock.task.findUnique.mockResolvedValue(null);

    const result = await service.getById('non-existent-id');
    expect(result).toBeNull();
  });

  it('should update an existing task', async () => {
    const updated = { ...mockTask, title: 'Updated', status: 'done' };
    prismaMock.task.update.mockResolvedValue(updated);

    const result = await service.update('1', { title: 'Updated' });
    expect(result).toEqual(updated);
    expect(prismaMock.task.update).toHaveBeenCalledWith({
      where: { id: '1' },
      data: { title: 'Updated' },
    });
  });

  it('should return null if update fails', async () => {
    prismaMock.task.update.mockRejectedValue(new Error('Not found'));

    const result = await service.update('not-found', { title: 'No' });
    expect(result).toBeNull();
  });

  it('should delete task and return true', async () => {
    prismaMock.task.delete.mockResolvedValue(mockTask);

    const result = await service.delete('1');
    expect(result).toBe(true);
    expect(prismaMock.task.delete).toHaveBeenCalledWith({ where: { id: '1' } });
  });

  it('should handle delete failure gracefully', async () => {
    prismaMock.task.delete.mockRejectedValue(new Error('Error'));

    const result = await service.delete('nonexistent');
    expect(result).toBe(false);
  });
});
