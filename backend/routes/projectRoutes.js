import express from 'express';
import {
  getProjects,
  createProject,
  getProjectById,
  deleteProject,
} from '../controllers/projectController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);
router.route('/').get(getProjects).post(createProject);
router.route('/:id').get(getProjectById).delete(deleteProject);

export default router;