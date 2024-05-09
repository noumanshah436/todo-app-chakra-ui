import { VStack, StackDivider, Badge, Input } from "@chakra-ui/react";
import TodoItem from "./TodoItem";
import axios from "axios";

const TodoList = ({ todos, deleteTodo, toggleTodo, setTodos }) => {
  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      const context = this;
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(context, args), delay);
    };
  };

  const searchTodo = debounce((title) => {
    axios
      .get("http://localhost:8000/api/todos/", {
        params: { search: title },
      })
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => console.error("Error searching todos:", error));
  }, 300);

  return (
    <VStack
      divider={<StackDivider />}
      borderColor="gray.100"
      borderWidth="2px"
      p="4"
      borderRadius="lg"
      w="100%"
      maxW={{ base: "90vw", sm: "80vw", lg: "50vw", xl: "40vw" }}
      alignItems="stretch"
    >
      <Input
        variant="filled"
        placeholder="Search todo"
        onChange={(e) => searchTodo(e.target.value)}
      />
      {todos.length === 0 ? (
        <Badge colorScheme="green" p="4" m="4" borderRadius="lg">
          No Todos
        </Badge>
      ) : (
        todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
          />
        ))
      )}
    </VStack>
  );
};

export default TodoList;
