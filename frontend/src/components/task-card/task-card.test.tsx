import { render, screen, fireEvent } from '@testing-library/react';
import { TaskCard } from './task-card';
import type { Task } from '@/types/task';

const mockTask: Task = {
  id: '1',
  title: 'Test Task',
  description: 'This is a test task',
  status: 'pending',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

describe('TaskCard', () => {
  it('renders task title and description', () => {
    render(<TaskCard task={mockTask} onEdit={jest.fn()} onDelete={jest.fn()} />);
    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('This is a test task')).toBeInTheDocument();
    expect(screen.getByText('pending')).toBeInTheDocument();
  });

  it('calls onEdit and onDelete when buttons are clicked', () => {
    const onEdit = jest.fn();
    const onDelete = jest.fn();

    render(<TaskCard task={mockTask} onEdit={onEdit} onDelete={onDelete} />);
    fireEvent.click(screen.getByText('Edit'));
    fireEvent.click(screen.getByText('Delete'));

    expect(onEdit).toHaveBeenCalledWith('1');
    expect(onDelete).toHaveBeenCalledWith('1');
  });
});
