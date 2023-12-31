import React, { useState } from "react";

export const EditTodoForm = ({ editTodo, task }) => {
  const [value, setValue] = useState(task.task);

  const handleSubmit = (e) => {
    // prevent default action
    e.preventDefault();
    // edit task
    editTodo(task.id,value,task.completed);
  };
  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="task-input"
        placeholder="Update task"
      />
      <button type="submit" className="task-btn">
        Add Task
      </button>
    </form>
  );
};
