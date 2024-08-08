import React from "react";
import { deleteTodos } from "../api/todosAPI";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";

export function Todo({ todoList, setTodoList }) {
  const getPriorityStyle = (priority) => {
    switch (priority) {
      case "High":
        return styles.highPriority;
      case "Medium":
        return styles.mediumPriority;
      case "Low":
        return styles.lowPriority;
      default:
        return {};
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodos(id);
      // Actualiza la lista de tareas después de eliminar
      setTodoList((prevList) => prevList.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Failed to delete todo:", error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {todoList.length === 0 ? (
        <Text style={styles.noTodosText}>No todos available</Text>
      ) : (
        todoList
          .sort((a, b) => {
            return Date.parse(a.date) - Date.parse(b.date);
          })
          .map((todo) => (
            <View key={todo.id} style={styles.todoItem}>
              <Text style={styles.title}>{todo.title}</Text>
              <Text style={styles.description}>{todo.description}</Text>
              <Text style={styles.date}>
                {new Date(todo.date).toLocaleDateString()}
              </Text>
              <View
                style={[
                  styles.priorityContainer,
                  getPriorityStyle(todo.priority),
                ]}
              >
                <Text style={styles.priorityText}>{todo.priority}</Text>
              </View>
              <View style={styles.checkTodo}>
                <TouchableOpacity
                  onPress={() => {
                    handleDelete(todo.id);
                  }}
                >
                  <Text style={styles.doneText}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
  },
  title: {
    alignSelf: "flex-start",
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  description: {
    fontSize: 16,
    color: "#555",
    marginVertical: 5,
  },
  date: {
    fontSize: 14,
    color: "#777",
    marginBottom: 10,
  },
  todoItem: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginVertical: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
    width: "100%", // Para asegurar que cada todo ocupe todo el ancho posible
  },
  priorityContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    alignSelf: "flex-start",
  },
  highPriority: {
    backgroundColor: "#FD9595",
  },
  mediumPriority: {
    backgroundColor: "#edf6ff",
  },
  lowPriority: {
    backgroundColor: "#e9f9ee",
  },
  priorityText: {
    fontSize: 14,
    color: "black",
    fontWeight: "bold",
  },
  noTodosText: {
    fontSize: 18,
    color: "#888",
  },
  checkTodo: {
    borderRadius: 5,
    padding: 3,
    alignSelf: "flex-end",
    backgroundColor: "#F2B9B9",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  doneText: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
  },
});
