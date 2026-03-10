// Centralized API service for all todo-related HTTP requests
const API_URL = "http://localhost:8080/todos";

// Creates a new todo with the given title and optional due date
export const createTodo = (title, dueDate) => {
  return fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, completed: false, dueDate: dueDate || null }),
  }).then((res) => res.json());
};

// Updates an existing todo's fields by its ID
export const updateTodo = (id, data) => {
  return fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => res.json());
};

// Permanently deletes a todo by its ID
export const deleteTodo = (id) => {
  return fetch(`${API_URL}/${id}`, { method: "DELETE" });
};

// Fetches all non-deleted todos matching a specific due date
export const fetchTodosByDate = (date) => {
  return fetch(`${API_URL}/by-date?date=${date}`).then((res) => res.json());
};
