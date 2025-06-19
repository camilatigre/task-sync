import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react';
import { TaskModal } from './task-modal';

describe('TaskModal', () => {
  it('renders with empty form when no initialValues', async () => {
    const handleSubmit = jest.fn();
    const handleClose = jest.fn();

    await act(async () => {
      render(
        <TaskModal isOpen={true} onClose={handleClose} onSubmit={handleSubmit} />
      );
    });

    expect(screen.getByText(/new task/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/title/i)).toHaveValue('');
    expect(screen.getByLabelText(/description/i)).toHaveValue('');
    expect(screen.getByLabelText(/status/i)).toHaveValue('pending');
  });

  it('calls onSubmit and onClose when saving', async () => {
    const handleSubmit = jest.fn();
    const handleClose = jest.fn();

    await act(async () => {
      render(
        <TaskModal isOpen={true} onClose={handleClose} onSubmit={handleSubmit} />
      );
    });

    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: 'My Task' },
    });

    fireEvent.change(screen.getByLabelText(/status/i), {
      target: { value: 'done' },
    });

    fireEvent.click(screen.getByText(/save/i));

    expect(handleSubmit).toHaveBeenCalledWith({
      title: 'My Task',
      description: '',
      status: 'done',
    });

    expect(handleClose).toHaveBeenCalled();
  });
});
