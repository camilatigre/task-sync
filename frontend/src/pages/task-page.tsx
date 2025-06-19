// TaskPage.tsx
import { useState } from 'react';
import { TaskList } from '@/components/task-list';
import { useTasks } from '@/context/tasks/use-tasks';
import { TaskModal } from '@/components/task-modal';
import { useSocket } from '@/hooks/use-sockets';
import type { Task } from '@/types/task';

export const TaskPage = () => {
  const { tasks, isLoading, error } = useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useSocket();

  const handleEdit = (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (task) {
      setSelectedTask(task);
      setIsModalOpen(true);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`http://localhost:3333/tasks/${id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error('Failed to delete task', error);
    }
  };

  const handleSubmit = async (task: Partial<Task>) => {
    try {
      if (selectedTask) {
        await fetch(`http://localhost:3333/tasks/${selectedTask.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(task),
        });
      } else {        
        await fetch('http://localhost:3333/tasks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(task),
        });
      }

      setIsModalOpen(false);
      setSelectedTask(null);
    } catch (error) {
      console.error('Failed to save task', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Tasks</h1>
        <button
          onClick={() => {
            setIsModalOpen(true);
            setSelectedTask(null);
          }}
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
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTask(null);
        }}
        onSubmit={handleSubmit}
        initialValues={selectedTask ?? undefined}
      />
    </div>
  );
};
