import { useTasksContext } from './tasks-context';

export const useTasks = () => {
  const { state, dispatch } = useTasksContext();
  return { ...state, dispatch };
};
