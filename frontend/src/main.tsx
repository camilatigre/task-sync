import React from 'react';
import ReactDOM from 'react-dom/client';
import { TaskPage } from '@/pages/task-page';
import { TasksProvider } from '@/context/tasks/tasks-context';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TasksProvider>
      <TaskPage />
    </TasksProvider>
  </React.StrictMode>,
);
