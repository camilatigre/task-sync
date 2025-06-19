import { render, screen } from '@testing-library/react';
import { TaskList } from './task-list';
import type { Task } from '@/types/task';

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Sample Task',
    description: 'Just testing',
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

it('renders a list of tasks', () => {
  render(<TaskList tasks={mockTasks} onEdit={() => {}} onDelete={() => {}} />);
  expect(screen.getByText('Sample Task')).toBeInTheDocument();
});

it('shows empty state when no tasks', () => {
  render(<TaskList tasks={[]} onEdit={() => {}} onDelete={() => {}} />);
  expect(screen.getByText('No tasks found.')).toBeInTheDocument();
});
