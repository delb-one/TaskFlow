import express from 'express';
import {
  createTask,
  updateTask,
  deleteTask,
  getTasksByProject,
} from '../controllers/taskController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);
router.post('/', createTask);
router.route('/:id').put(updateTask).delete(deleteTask);
router.get('/', getTasksByProject);

export default router;