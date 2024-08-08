import { useTodosContext } from "../context/TodosContext";

const useTodos = () => {
  const context = useTodosContext();
  if (!context) {
    throw new Error("useTodos must be used within a TodosProvider");
  }
  return context;
};

export default useTodos;
