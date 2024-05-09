import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
  Select,
} from "@chakra-ui/react";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { useRef, useState } from "react";

const AddTodoModal = ({ addTodo }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const [priority, setPriority] = useState("low");
  const toast = useToast();
  const [content, setContent] = useState("");
  const [date, setDate] = useState(new Date());

  const handleSubmit = () => {
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
      title: content,
      completed: false,
      priority: priority,
      due_date: date.toISOString(),
    };

    addTodo(todo);
    setContent("");
    setPriority("low");
    setDate(new Date());
    onClose();
  };

  return (
    <>
      <Button colorScheme="pink" px="8" onClick={onOpen}>
        Add Todo
      </Button>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Todo</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Add new task</FormLabel>
              <Input
                ref={initialRef}
                variant="filled"
                placeholder="Add new task"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Priority</FormLabel>
              <Select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </Select>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Due Date</FormLabel>
              <SingleDatepicker
                name="date-input"
                date={date}
                onDateChange={setDate}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleSubmit} colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddTodoModal;
