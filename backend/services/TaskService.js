import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllTasks = async () => {
  try {
    const response = await prisma.task.findMany({
      where:{
        isDeleted:false,
      }
    });
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getTasksById = async (id) => {
  try {
    const response = await prisma.task.findUnique({
      where: {
        id: Number(id),
      },
    });
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createTask = async (task, completed) => {
  try {
    const newtask = await prisma.task.create({
      data: {
        task: task,
        completed: completed,
      },
    });
    return newtask;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateTask = async (id, task, completed) => {
  try {
    const updatetask = await prisma.task.update({
      where: {
        id: Number(id),
      },
      data: {
        task: task,
        completed: completed,
      },
    });
    return updatetask;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteTask = async (id) => {
  try {
    const deletetask = await prisma.task.update({
      where: {
        id: Number(id),
      },
      data: {
        isDeleted:true,
      },
    });
    return deletetask;
  } catch (error) {
    throw new Error(error.message);
  }
};
