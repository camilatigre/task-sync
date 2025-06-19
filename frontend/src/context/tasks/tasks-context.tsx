import { createContext, useContext, useReducer, useEffect } from 'react';
import type { ReactNode } from 'react';
import {
  tasksReducer,
  initialState,
  type TasksState,
  type TasksAction,
} from './tasks-reducer';

type TasksContextType = {
  state: TasksState;
  dispatch: React.Dispatch<TasksAction>;
};

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const TasksProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(tasksReducer, initialState);

  useEffect(() => {
    const fetchTasks = async () => {
      dispatch({ type: 'FETCH_START' });
      try {
        const res = await fetch('http://localhost:3333/tasks', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (!res.ok) {
          throw new Error('Failed to fetch tasks');
        }
  
        const data = await res.json();
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (error) {
        dispatch({
          type: 'FETCH_ERROR',
          payload: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    };
  
    fetchTasks();
  }, []);


  return (
    <TasksContext.Provider value={{ state, dispatch }}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTasksContext = () => {
  const context = useContext(TasksContext);
  if (!context) throw new Error('useTasksContext must be used within TasksProvider');
  return context;
};
