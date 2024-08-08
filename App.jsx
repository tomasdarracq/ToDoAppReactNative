import React from "react";
import { TodosProvider } from "./context/TodosContext";
import { Homepage } from "./app/Homepage";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <TodosProvider>
      <StatusBar style="auto" />
      <Homepage />
    </TodosProvider>
  );
}
