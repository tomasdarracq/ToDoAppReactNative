import React from "react";
import { TodosProvider } from "./context/TodosContext";
import { Homepage } from "./app/Homepage";
import { StatusBar } from "expo-status-bar";
import { FiltersProvider } from "./context/FiltersContext";

export default function App() {
  return (
    <TodosProvider>
      <FiltersProvider>
        <StatusBar style="auto" />
        <Homepage />
      </FiltersProvider>
    </TodosProvider>
  );
}
