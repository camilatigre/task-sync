import { useEffect } from 'react';
import { io } from 'socket.io-client';
import type { Task } from '@/types/task';
import { useTasks } from '@/context/tasks/use-tasks';

const socket = io('http://localhost:3333', {
    transports: ['websocket'],
    withCredentials: true,
  });

export const useSocket = () => {
  const { dispatch } = useTasks();

  useEffect(() => {
    socket.on('task:created', (task: Task) => {
        console.log('[socket] task:created', task);
        dispatch({ type: 'CREATE_TASK', payload: task });
      });
      

    socket.on('task:deleted', (id: string) => {
      dispatch({ type: 'DELETE_TASK', payload: id });
    });

    socket.on('task:updated', (task: Task) => {
      dispatch({ type: 'UPDATE_TASK', payload: task });
    });

    return () => {
      socket.off('task:created');
      socket.off('task:deleted');
      socket.off('task:updated');
    };
  }, [dispatch]);
};
