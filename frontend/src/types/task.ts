export type Task = {
    id: string;
    title: string;
    description?: string | null;
    status: 'pending' | 'in-progress' | 'done';
    createdAt: string;
    updatedAt: string;
  };