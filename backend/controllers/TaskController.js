import { getAllTasks, getTasksById, createTask, updateTask, deleteTask } from '../services/TaskService.js';

export const getAllTasksHandler = async (req, res) => {
  try {
    const response = await getAllTasks();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getTaskByIdHandler = async (req, res) => {
  try {
    const response = await getTasksById(req.params.id);
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

export const createTaskHandler = async (req, res) => {
  const { task, completed } = req.body;
  try {
    const newTask = await createTask(task, completed);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateTaskHandler = async (req, res) => {
  const { task, completed } = req.body;
  try {
    const updatedTask = await updateTask(req.params.id, task, completed);
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteTaskHandler = async (req, res) => {
  try {
    const deletedTask = await deleteTask(req.params.id);
    res.status(200).json(deletedTask);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
