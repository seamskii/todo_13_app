import React from "react";

export const TodoDropdowns = ({
  todoLocal,
  filter,
  handleFilterChange,
  sort,
  handleSortChange,
  direction,
  handleDirectionChange,
}) => {
  const completedTasks = todoLocal.filter((el) => el.completed === true);
  const uncompletedTasks = todoLocal.filter((el) => el.completed === false);

  return (
    <div className="TodoDropdowns">
      <div>
        <label htmlFor="filter">Filter: </label>
        <select id="filter" value={filter} onChange={handleFilterChange}>
          <option value="all">Show all tasks #{todoLocal.length} </option>
          <option value="completed">
            Filter by completed #{completedTasks.length}
          </option>
          <option value="uncompleted">
            Filter by uncompleted #{uncompletedTasks.length}
          </option>
        </select>
      </div>
      <div>
        <label htmlFor="sort">Sort: </label>
        <select id="sort" value={sort} onChange={handleSortChange}>
          <option value="id">Sort by task ID</option>
          <option value="status">Sort by task status</option>
          <option value="date">Sort by Date</option>
          <option value="description">Sort by description</option>
        </select>
      </div>
      <div>
        <label htmlFor="direction">Direction: </label>
        <select
          id="direction"
          value={direction}
          onChange={handleDirectionChange}
        >
          <option value="asc">ASC</option>
          <option value="desc">DESC</option>
        </select>
      </div>
    </div>
  );
};
