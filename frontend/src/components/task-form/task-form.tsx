import { useState } from 'react';
import { z } from 'zod';
import type { FC } from 'react';
import type { Task } from '@/types/task';

const taskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  status: z.enum(['pending', 'in-progress', 'done']),
});

type TaskFormProps = {
  initialValues?: Task;
  onSubmit: (data: z.infer<typeof taskSchema>) => void;
  onCancel?: () => void;
};

export const TaskForm: FC<TaskFormProps> = ({ initialValues, onSubmit, onCancel }) => {
  const [form, setForm] = useState({
    title: initialValues?.title || '',
    description: initialValues?.description || '',
    status: initialValues?.status || 'pending',
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = taskSchema.safeParse(form);
    if (!result.success) {
      setError(result.error.errors[0]?.message || 'Invalid input');
      return;
    }
    setError(null);
    onSubmit(result.data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded-xl shadow">
      <div>
        <label htmlFor="title" className="block mb-1 font-medium">Title</label>
        <input
          id="title"
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label htmlFor="description" className="block mb-1 font-medium">Description</label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label htmlFor="status" className="block mb-1 font-medium">Status</label>
        <select
          id="status"
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex justify-end gap-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="text-gray-600 hover:underline"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </form>
  );
};
