import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { TaskController } from '../controllers/task.controller';

const router = Router();

router.get('/', asyncHandler(TaskController.getAll));
router.get('/:id', asyncHandler(TaskController.getById));
router.post('/', asyncHandler(TaskController.create));
router.put('/:id', asyncHandler(TaskController.update));
router.delete('/:id', asyncHandler(TaskController.delete));

export default router;
