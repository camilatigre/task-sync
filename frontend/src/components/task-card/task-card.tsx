import type { FC } from 'react';
import type { Task } from '@/types/task';

type TaskCardProps = {
  task: Task;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

export const TaskCard: FC<TaskCardProps> = ({ task, onEdit, onDelete }) => {
  return (
    <div className="border p-4 rounded-xl shadow-sm space-y-2 bg-white">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{task.title}</h3>
        <span className="text-sm text-gray-500">{task.status}</span>
      </div>
      {task.description && <p className="text-sm text-gray-700">{task.description}</p>}
      <div className="flex justify-end gap-2">
        <button onClick={() => onEdit(task.id)} className="text-blue-600 hover:underline text-sm">Edit</button>
        <button onClick={() => onDelete(task.id)} className="text-red-600 hover:underline text-sm">Delete</button>
      </div>
    </div>
  );
};
