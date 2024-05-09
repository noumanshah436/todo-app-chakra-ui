import {
  Button,
  HStack,
  Input,
  Radio,
  RadioGroup,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { nanoid } from "nanoid";

const AddTodo = ({ addTodo }) => {
  const [priority, setPriority] = useState("low");
  const toast = useToast();
  const [content, setContent] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!content) {
      toast({
        title: "No content",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    const todo = {
      id: nanoid(),
      body: content,
      isCompleted: false,
      priority: priority,
    };

    addTodo(todo);
    setContent("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <HStack mt="8">
        <Input
          variant="filled"
          placeholder="Add a new todo..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <RadioGroup onChange={setPriority} value={priority}>
          <Stack spacing={5} direction="row">
            <Radio colorScheme="red" value="high">
              High
            </Radio>
            <Radio colorScheme="green" value="low">
              Low
            </Radio>
          </Stack>
        </RadioGroup>
      </HStack>
      <HStack justifyContent="center"mt="4" >
      <Button colorScheme="pink" px="8" type="submit">
        Add Todo
      </Button>
      </HStack>
    </form>
  );
};

export default AddTodo;
