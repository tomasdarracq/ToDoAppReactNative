import React, { createContext, useEffect, useState, useContext } from "react";
import { fetchTodos, postTodos } from "../api/todosAPI";

export const TodosContext = createContext();

export const TodosProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    const getTodos = async () => {
      try {
        const response = await fetchTodos();
        setTodos(response);
      } catch (error) {
        console.log(error);
      }
    };
    getTodos();
  }, []);

  const addTodo = async (todo) => {
    try {
      const newTodo = await postTodos(todo);
      setTodos((prevTodos) => [...prevTodos, newTodo]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TodosContext.Provider value={{ todos, setTodos, addTodo }}>
      {children}
    </TodosContext.Provider>
  );
};

export const useTodosContext = () => useContext(TodosContext);
