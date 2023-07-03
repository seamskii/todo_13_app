import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllTasks = async (req, res) => {
  try {
    const response = await prisma.todo13.findMany();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getTasksById = async (req, res) => {
  try {
    const response = await prisma.todo13.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

export const createTask = async (req, res) => {
  const { task, completed } = req.body;
  try {
    const newtask = await prisma.todo13.create({
      data: {
        task: task,
        completed: completed,
      },
    });
    res.status(201).json(newtask);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateTask = async (req, res) => {
  const { task, completed } = req.body;
  try {
    const updatetask = await prisma.todo13.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        task: task,
        completed: completed,
      },
    });
    res.status(200).json(updatetask);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const deletetask = await prisma.todo13.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json(deletetask);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
