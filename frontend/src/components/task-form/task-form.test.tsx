import { render, screen, fireEvent } from '@testing-library/react';
import { TaskForm } from './task-form';

describe('TaskForm', () => {
  it('should render with empty fields', () => {
    render(<TaskForm onSubmit={jest.fn()} />);
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/status/i)).toBeInTheDocument();
  });

  it('should show error when submitting empty title', () => {
    render(<TaskForm onSubmit={jest.fn()} />);
    fireEvent.click(screen.getByText(/save/i));
    expect(screen.getByText(/title is required/i)).toBeInTheDocument();
  });

  it('should call onSubmit with valid data', () => {
    const handleSubmit = jest.fn();
    render(<TaskForm onSubmit={handleSubmit} />);
    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'New Task' } });
    fireEvent.change(screen.getByLabelText(/status/i), { target: { value: 'done' } }); 
    fireEvent.click(screen.getByText(/save/i));
    expect(handleSubmit).toHaveBeenCalledWith({
      title: 'New Task',
      description: '',
      status: 'done',
    });
  });
});
