import express from 'express';
import { getAllTasks, getTasksById, createTask, updateTask, deleteTask } from '../controllers/TaskController.js';

const router = express.Router();

router.get('/tasks', getAllTasks);
router.get('/tasks/:id', getTasksById);
router.post('/tasks', createTask);
router.patch('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);

export default router;
