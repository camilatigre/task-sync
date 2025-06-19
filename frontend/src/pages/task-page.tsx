import { TaskList } from '@/components/task-list';
import { useTasks } from '@/context/tasks/use-tasks';

export const TaskPage = () => {
  const { tasks, dispatch, isLoading, error } = useTasks();

  const handleEdit = (id: string) => {
    console.log('Edit task', id);
  };

  const handleDelete = (id: string) => {
    dispatch({ type: 'DELETE_TASK', payload: id });
  };

  if (isLoading) return <p className="text-center py-10">Loading tasks...</p>;
  if (error) return <p className="text-center text-red-500 py-10">{error}</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <TaskList tasks={tasks} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};
