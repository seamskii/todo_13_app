import axios from "axios";

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

export const getAllTasks = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/tasks`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    throw error;
  }
};

export const createTask = async (task) => {
  try {
    const response = await axios.post(`${API_ENDPOINT}/tasks`, {
      task: task,
      completed: false,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to create task:", error);
    throw error;
  }
};

export const updateTask = async (id, task, completed) => {
  try {
    const response = await axios.patch(`${API_ENDPOINT}/tasks/${id}`, {
      task: task,
      completed: completed,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to update task:", error);
    throw error;
  }
};

export const deleteTask = async (id) => {
  console.log("Dell")
  try {
    await axios.delete(`${API_ENDPOINT}/tasks/${id}`);
  } catch (error) {
    console.error("Failed to delete task:", error);
    throw error;
  }
};
