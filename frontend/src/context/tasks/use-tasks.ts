import { useTasksContext } from './tasks-context';

export const useTasks = () => {
  const { state, dispatch } = useTasksContext();
  return {
    tasks: state.tasks,
    isLoading: state.isLoading,
    error: state.error,
    dispatch,
  };
};
