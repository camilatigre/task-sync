import type { Task } from '@/types/task';

export type TasksState = {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
};

export type TasksAction =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: Task[] }
  | { type: 'FETCH_ERROR'; payload: string }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'CREATE_TASK'; payload: Task };

export const initialState: TasksState = {
  tasks: [],
  isLoading: false,
  error: null,
};

export function tasksReducer(state: TasksState, action: TasksAction): TasksState {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, isLoading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, isLoading: false, tasks: action.payload };
    case 'FETCH_ERROR':
      return { ...state, isLoading: false, error: action.payload };
    case 'DELETE_TASK': {
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
      };
    }
    case 'CREATE_TASK': {
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    }
    default:
      return state;
  }
}
