import { Heading } from "@chakra-ui/react";
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";
import { VStack, IconButton, useColorMode } from "@chakra-ui/react";
import { FaSun, FaMoon } from "react-icons/fa";
import { useState } from "react";

function App() {
  const initialTodos = [
    {
      id: 1,
      body: "get bread",
      isCompleted: true,
      priority: "low",
    },
    {
      id: 2,
      body: "get butter",
      isCompleted: false,
      priority: "low",
    },
    {
      id: 3,
      body: "finish report",
      isCompleted: true,
      priority: "high",
    },
    {
      id: 4,
      body: "clean room",
      isCompleted: false,
      priority: "high",
    },
  ];

  // Define a custom sorting function
  const compareTodos = (todo1, todo2) => {
    // If both todos have the same priority
    if (todo1.priority === todo2.priority) {
      // If both todos have the same completion status
      if (todo1.isCompleted === todo2.isCompleted) {
        return 0; // Leave them in their current order
      }
      // Otherwise, sort by completion status (completed todos come last)
      return todo1.isCompleted ? 1 : -1;
    }
    // Otherwise, sort by priority (high priority todos come first)
    return todo1.priority === "high" ? -1 : 1;
  };

  const { colorMode, toggleColorMode } = useColorMode();
  const [todos, setTodos] = useState(initialTodos);
  const sortedTodos = todos.sort(compareTodos);

  const deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(newTodos);
  };

  const udpateTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: true } : todo
      )
    );
  };

  const addTodo = (todo) => {
    setTodos([...todos, todo]);
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
      <TodoList
        todos={sortedTodos}
        deleteTodo={deleteTodo}
        udpateTodo={udpateTodo}
      />
      <AddTodo addTodo={addTodo} />
    </VStack>
  );
}

export default App;
