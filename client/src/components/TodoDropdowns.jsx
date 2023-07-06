import React from "react";
import Select from "react-select";

export const TodoDropdowns = ({
  taskLocal,
  filter,
  handleFilterChange,
  sort,
  handleSortChange,
  direction,
  handleDirectionChange,
}) => {
  const completedTasks = taskLocal.filter((el) => el.completed === true);
  const uncompletedTasks = taskLocal.filter((el) => el.completed === false);

  const filterOptions = [
    { value: "all", label: `Show all tasks #${taskLocal.length}` },
    { value: "completed", label: `Filter by completed #${completedTasks.length}` },
    { value: "uncompleted", label: `Filter by uncompleted #${uncompletedTasks.length}` },
  ];

  const sortOptions = [
    { value: "id", label: "Sort by task ID" },
    { value: "status", label: "Sort by task status" },
    { value: "date", label: "Sort by Date" },
    { value: "description", label: "Sort by description" },
  ];

  const directionOptions = [
    { value: "asc", label: "ASC" },
    { value: "desc", label: "DESC" },
  ];

  return (
    <div className="TodoDropdowns">
      <div>
        <label htmlFor="filter">Filter: </label>
        <Select
          id="filter"
          options={filterOptions}
          value={filterOptions.find((option) => option.value === filter)}
          onChange={(selectedOption) => handleFilterChange(selectedOption.value)}
        />
      </div>
      <div>
        <label htmlFor="sort">Sort: </label>
        <Select
          id="sort"
          options={sortOptions}
          value={sortOptions.find((option) => option.value === sort)}
          onChange={(selectedOption) => handleSortChange(selectedOption.value)}
        />
      </div>
      <div>
        <label htmlFor="direction">Direction: </label>
        <Select
          id="direction"
          options={directionOptions}
          value={directionOptions.find((option) => option.value === direction)}
          onChange={(selectedOption) => handleDirectionChange(selectedOption.value)}
        />
      </div>
    </div>
  );
};
