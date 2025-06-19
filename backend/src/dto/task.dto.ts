/**
 * Data Transfer Object for creating a task.
 * 
 * @property title - The title of the task. Required.
 * @property description - Optional detailed description of the task.
 * @property status - The current status of the task (e.g., 'pending', 'done').
 */
export interface CreateTaskInput {
    title: string;
    description?: string | null;
    status: string;
  }
  