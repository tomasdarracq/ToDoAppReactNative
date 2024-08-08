import React, { useState, useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import useTodos from "../hooks/useTodos";
import { Todo } from "../components/Todo.jsx";
import { FAB } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { CreateTodo } from "../app/CreateTodo.jsx";
import { TodosContext } from "../context/TodosContext";

export function Homepage() {
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar la visibilidad del modal
  const { todos } = useTodos();
  const { setTodos } = useContext(TodosContext);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Todo List</Text>
      </View>

      {/* Componente que muestra los "todos" */}
      <Todo todoList={todos} setTodoList={setTodos} />

      {/* Componente CreateTodo para manejar el formulario en el modal */}
      <CreateTodo
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />

      {/* Botón FAB que abre el modal */}
      <View style={styles.fabContainer}>
        <FAB
          onPress={() => setModalVisible(true)} // Abre el modal cuando se presiona el botón
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
