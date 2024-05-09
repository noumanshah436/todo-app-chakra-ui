import { HStack, Heading } from "@chakra-ui/react";
import TodoList from "./components/TodoList";
import { VStack, IconButton, useColorMode } from "@chakra-ui/react";
import { FaSun, FaMoon } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import AddTodoModal from "./components/AddTodoModal";
import TodoFilters from "./components/TodoFilters";

function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/todos/")
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const deleteTodo = (id) => {
    axios
      .delete(`http://localhost:8000/api/todos/${id}/`)
      .then(() => {
        setTodos(todos.filter((todo) => todo.id !== id));
      })
      .catch((error) => console.error("Error deleting todo:", error));
  };

  const toggleTodo = (id, isCompleted) => {
    axios
      .patch(`http://localhost:8000/api/todos/${id}/`, {
        completed: isCompleted,
      })
      .then((response) => {
        setTodos(todos.map((todo) => (todo.id === id ? response.data : todo)));
      })
      .catch((error) => console.error("Error updating todo:", error));
  };

  const addTodo = (todo) => {
    axios
      .post("http://localhost:8000/api/todos/", todo)
      .then((response) => {
        setTodos([...todos, response.data]);
      })
      .catch((error) => console.error("Error adding todo:", error));
  };

  const filterTodos = (filters) => {
    axios
      .get("http://localhost:8000/api/todos/", {
        params: filters,
      })
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => console.error("Error searching todos:", error));
  };

  return (
    <VStack p={4}>
      <IconButton
        icon={colorMode === "light" ? <FaSun /> : <FaMoon />}
        isRound="true"
        size="lg"
        alignSelf="flex-end"
        onClick={toggleColorMode}
      />
      <Heading
        mb="8"
        fontWeight="extrabold"
        size="2xl"
        bgGradient="linear(to-l, #7928CA, #FF0080)"
        bgClip="text"
      >
        Todo Application
      </Heading>
      <HStack>
        <AddTodoModal addTodo={addTodo} />
        <TodoFilters filterTodos={filterTodos} />
      </HStack>
      <TodoList
        todos={todos}
        deleteTodo={deleteTodo}
        toggleTodo={toggleTodo}
        setTodos={setTodos}
      />
    </VStack>
  );
}

export default App;
