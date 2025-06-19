
import { Dialog } from '@headlessui/react';
import { Fragment } from 'react';
import { TaskForm } from '@/components/task-form';
import type { FC } from 'react';
import type { Task } from '@/types/task';

type TaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Task>) => void;
  initialValues?: Task;
};

export const TaskModal: FC<TaskModalProps> = ({ isOpen, onClose, onSubmit, initialValues }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} as={Fragment}>
      <div className="fixed inset-0 z-40 bg-black/30 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
          <Dialog.Title className="text-lg font-semibold mb-4">
            {initialValues ? 'Edit Task' : 'New Task'}
          </Dialog.Title>
          <TaskForm
            initialValues={initialValues}
            onSubmit={(data) => {
              onSubmit(data);
              onClose();
            }}
            onCancel={onClose}
          />
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
