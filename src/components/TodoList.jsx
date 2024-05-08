import {
  HStack,
  VStack,
  Text,
  IconButton,
  StackDivider,
  Spacer,
  Badge,
  Checkbox,
} from "@chakra-ui/react";
import { FaTrash, FaSquare } from "react-icons/fa";

const TodoList = ({ todos, deleteTodo, udpateTodo }) => {
  if (!todos.length) {
    return (
      <Badge colorScheme="green" p="4" m="4" borderRadius="lg">
        No Todos, yay!!!
      </Badge>
    );
  }

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
      {todos.map((todo) => (
        <HStack key={todo.id}>
          <Checkbox
            onChange={(e) => udpateTodo(todo.id, e.target.checked)}
            colorScheme="green"
            disabled={todo.isCompleted}
            isChecked={todo.isCompleted}
          />
          {todo.isCompleted ? (
            <Text as="s">
              {todo.body}
            </Text>
          ) : (
            <Text>{todo.body}</Text>
          )}
          <Spacer />
          <IconButton
            icon={<FaSquare />}
            onClick={() => deleteTodo(todo.id)}
            color={todo.priority === "low" ? "green" : "red"}
            size="sm"
          />
          <IconButton
            icon={<FaTrash />}
            isRound="true"
            onClick={() => deleteTodo(todo.id)}
          />
        </HStack>
      ))}
    </VStack>
  );
};

export default TodoList;
