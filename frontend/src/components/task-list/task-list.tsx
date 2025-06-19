import type { FC } from 'react';
import type { Task } from '@/types/task';
import { TaskCard } from '@/components/task-card';

type TaskListProps = {
  tasks: Task[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

export const TaskList: FC<TaskListProps> = ({ tasks, onEdit, onDelete }) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">
        No tasks found.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map(task => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
