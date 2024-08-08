const url = "http://192.168.0.107:3001/todos";
export async function fetchTodos() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    console.log("Fetched todos:", json); // Añade esta línea para depurar
    return json;
  } catch (error) {
    console.error(error.message);
    return []; // Devolver un array vacío en caso de error
  }
}

export async function postTodos(todo) {
  try {
    const config = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    };
    const response = await fetch(url, config);
    const json = await response.json();
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${json.message || ""}`);
    }
    return json;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}
export async function deleteTodos(id) {
  try {
    const url = `http://192.168.0.107:3001/todos/${id}`;
    const config = {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(
        `Error: ${response.status} ${errorResponse.message || ""}`
      );
    }

    return { success: true };
  } catch (error) {
    console.error("Failed to delete todo:", error.message);
    throw error;
  }
}
