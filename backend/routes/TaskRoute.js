import express from 'express';
import { getAllTasksHandler, getTaskByIdHandler, createTaskHandler, updateTaskHandler, deleteTaskHandler } from '../controllers/TaskLogic.js';

const router = express.Router();

router.get('/tasks', getAllTasksHandler);
router.get('/tasks/:id', getTaskByIdHandler);
router.post('/tasks', createTaskHandler);
router.patch('/tasks/:id', updateTaskHandler);
router.delete('/tasks/:id', deleteTaskHandler);

export default router;
