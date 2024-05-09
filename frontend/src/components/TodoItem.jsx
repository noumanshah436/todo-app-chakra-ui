import {
  HStack,
  Text,
  IconButton,
  Spacer,
  Checkbox,
  Badge,
} from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";

const TodoItem = ({ todo, toggleTodo, deleteTodo }) => {
  
  const priorityColor = () => {
    if (todo.priority === "low") {
      return "green";
    } else if (todo.priority === "medium") {
      return "orange";
    } else {
      return "red";
    }
  };

  return (
    <HStack key={todo.id}>
      <Checkbox
        onChange={(e) => toggleTodo(todo.id, e.target.checked)}
        colorScheme="green"
        isChecked={todo.completed}
      >
        <Text color={priorityColor} as={todo.completed ? "s" : undefined}>
          {todo.title}
        </Text>
      </Checkbox>
      <Spacer />
      
      <Badge variant='subtle' colorScheme={priorityColor()}>
        {todo.priority.toUpperCase()}
      </Badge>
      <IconButton
        icon={<FaTrash />}
        isRound="true"
        onClick={() => deleteTodo(todo.id)}
      />
    </HStack>
  );
};

export default TodoItem;
