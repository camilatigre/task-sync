import React from 'react';
import ReactDOM from 'react-dom/client';
import { TaskPage } from '@/pages/task-page';
import { TasksProvider } from '@/context/tasks/tasks-context';
import { SocketHandler } from '@/components/socket-handler';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TasksProvider>
      <SocketHandler />
      <TaskPage />
    </TasksProvider>
  </React.StrictMode>,
);
