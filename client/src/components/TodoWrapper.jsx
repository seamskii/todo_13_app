import React, { useEffect, useState } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { EditTodoForm } from "./EditTodoForm";
import useSWR from "swr";
import { getAllTasks, deleteTask, createTask, updateTask } from "./api";
import { TodoDropdowns } from "./TodoDropdowns";

export const TodoWrapper = () => {
  const [todoLocal, setTodoLocal] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("id");
  const [direction, setDirection] = useState("asc");

  const fetcher = async () => {
    const response = await getAllTasks();
    return response;
  };

  const { data } = useSWR("tasks", fetcher);

  useEffect(() => {
    if (data) {
      setTodoLocal(data);
    }
  }, [data]); // Empty dependency array

  const addTodo = async (task) => {
    try {
      const existingTodo = todoLocal.find((todo) => todo.task === task);
      if (existingTodo) {
        window.alert("Task already exists: " + task);
        return;
      }
      await createTask(task);
      fetchData(); // Fetch updated data with new IDs
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const existingTodo = todoLocal.find((todo) => todo.id === id);
      if (!existingTodo) {
        console.error("Todo not found in local state.");
        return;
      }
      await deleteTask(id);
      fetchData();
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const toggleComplete = async (id) => {
    try {
      const todoToUpdate = todoLocal.find((todo) => todo.id === id);
      const completed = !todoToUpdate.completed;
      await updateTask(id, todoToUpdate.task, completed);
      fetchData();
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const editTodo = (id) => {
    setTodoLocal((prevTodoLocal) =>
      prevTodoLocal.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const editTask = async (id, task) => {
    try {
      const existingTodo = todoLocal.find((todo) => todo.id === id);
      const currentTaskStatus =
        existingTodo.task === task ? existingTodo.completed : false;
      await updateTask(id, task, currentTaskStatus);

      setTodoLocal((prevTodoLocal) =>
        prevTodoLocal.map((todo) =>
          todo.id === id
            ? {
                ...todo,
                task: task,
                completed: currentTaskStatus,
                isEditing: !todo.isEditing,
              }
            : todo
        )
      );
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const fetchData = async () => {
    const updatedData = await fetcher();
    if (updatedData) {
      setTodoLocal(updatedData);
    }
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const handleDirectionChange = (e) => {
    setDirection(e.target.value);
  };

  const filteredAndSortedTodos = todoLocal
    .filter((todo) => {
      if (filter === "completed") {
        return todo.completed;
      } else if (filter === "uncompleted") {
        return !todo.completed;
      }
      return true;
    })
    .sort((a, b) => {
      let compareValue;
      switch (sort) {
        case "id":
          compareValue = parseInt(a.id) - parseInt(b.id);
          break;
        case "status":
          compareValue = a.completed - b.completed;
          break;
        case "date":
          compareValue =
            a.createdAt && b.createdAt
              ? a.createdAt.localeCompare(b.createdAt)
              : 0;
          break;
        case "description":
          compareValue = (a.description || "").localeCompare(
            b.description || ""
          );
          break;
        default:
          compareValue = 0;
          break;
      }
      return direction === "asc" ? compareValue : -compareValue;
    });

  if (!data) return <h2>Loading...</h2>;

  return (
    <div className="TodoWrapper">
      <h1>Get Things Done!</h1>
      <TodoDropdowns
        todoLocal={todoLocal}
        filter={filter}
        handleFilterChange={handleFilterChange}
        sort={sort}
        handleSortChange={handleSortChange}
        direction={direction}
        handleDirectionChange={handleDirectionChange}
      />

      <TodoForm addTodo={addTodo} />
      {filteredAndSortedTodos.map((element) =>
        element.isEditing ? (
          <EditTodoForm key={element.id} editTodo={editTask} task={element} />
        ) : (
          <Todo
            key={element.id}
            task={element}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            toggleComplete={toggleComplete}
          />
        )
      )}
    </div>
  );
};
