import React, { createContext, useEffect, useState, useContext } from "react";

export const FiltersContext = createContext();
export const FiltersProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    date: "true",
    priority: "false",
  });

  const comparePriorities = (a, b) => {
    const priorityMap = { high: 3, medium: 2, low: 1 };

    const priorityA = priorityMap[a.priority.toLowerCase()];
    const priorityB = priorityMap[b.priority.toLowerCase()];

    return priorityB - priorityA;
  };

  const filterTodos = (todos) => {
    if (todos.length === 0) return [];

    if (filters.date === "true") {
      return todos.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    if (filters.priority === "true") {
      return todos.sort(comparePriorities);
    }

    return todos;
  };

  return (
    <FiltersContext.Provider value={{ filters, setFilters, filterTodos }}>
      {children}
    </FiltersContext.Provider>
  );
};

export const useFiltersContext = () => useContext(FiltersContext);
