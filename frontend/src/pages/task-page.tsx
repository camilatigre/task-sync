import { useState } from 'react';
import { TaskList } from '@/components/task-list';
import { useTasks } from '@/context/tasks/use-tasks';
import { TaskModal } from '@/components/task-modal';
import type { Task } from '@/types/task';

export const TaskPage = () => {
  const { tasks, dispatch, isLoading, error } = useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (id: string) => {
    console.log('Edit task', id);
  };

  const handleDelete = (id: string) => {
    dispatch({ type: 'DELETE_TASK', payload: id });
  };

  const handleCreate = (task: Partial<Task>) => {
    dispatch({ type: 'CREATE_TASK', payload: { ...task, id: crypto.randomUUID() } as Task });
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Tasks</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + New Task
        </button>
      </div>

      {isLoading && <p className="text-center py-10">Loading tasks...</p>}
      {error && <p className="text-center text-red-500 py-10">{error}</p>}

      {!isLoading && !error && (
        <TaskList tasks={tasks} onEdit={handleEdit} onDelete={handleDelete} />
      )}

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreate}
      />
    </div>
  );
};
