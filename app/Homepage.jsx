import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import useTodos from "../hooks/useTodos";
import { Todo } from "../components/Todo.jsx";
import { FAB } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { CreateTodo } from "../app/CreateTodo.jsx";
import { TodosContext } from "../context/TodosContext";
import { FiltersContext } from "../context/FiltersContext";
import { Filters } from "../components/Filters.jsx";

export function Homepage() {
  const [modalVisible, setModalVisible] = useState(false);
  const { todos } = useTodos();
  const { setTodos } = useContext(TodosContext);
  const { filterTodos } = useContext(FiltersContext);
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    const fetchFilteredTodos = async () => {
      const result = await filterTodos(todos);
      setFilteredTodos(result);
    };
    fetchFilteredTodos();
  }, [todos, filterTodos]); // Recalcular cuando `todos` o `filterTodos` cambien

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Todo List</Text>
      </View>
      <Filters />

      <Todo todoList={filteredTodos} setTodoList={setTodos} />

      <CreateTodo
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />

      <View style={styles.fabContainer}>
        <FAB
          onPress={() => setModalVisible(true)}
          icon={(props) => <Icon name="plus" {...props} />}
          color="primary"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#f5f5f5",
  },
  header: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  fabContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
});
