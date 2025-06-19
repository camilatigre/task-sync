import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { TaskController } from '../controllers/task.controller';
import { validateRequest } from '../middlewares/validate-request';
import { createTaskSchema } from '../validators/task.validator';

const router = Router();

router.get('/', asyncHandler(TaskController.getAll));
router.get('/:id', asyncHandler(TaskController.getById));
router.post(
  '/',
  validateRequest(createTaskSchema),
  asyncHandler(TaskController.create)
);
router.put(
  '/:id',
  validateRequest(createTaskSchema), // opcional: pode usar .partial() se quiser permitir updates parciais
  asyncHandler(TaskController.update)
);
router.delete('/:id', asyncHandler(TaskController.delete));

export default router;
