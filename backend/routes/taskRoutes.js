import express from 'express';
import {
  createTask,
  updateTask,
  deleteTask,
} from '../controllers/taskController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);
router.post('/', createTask);
router.route('/:id').put(updateTask).delete(deleteTask);

export default router;