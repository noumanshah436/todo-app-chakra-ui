import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormLabel,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { useRef, useState } from "react";

const TodoFilters = ({ filterTodos }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const [priority, setPriority] = useState(undefined);
  const [dueDate, setDueDate] = useState(undefined);
  const [status, setStatus] = useState(undefined);

  const handleFilters = () => {
    const filterObject = {
      ...(priority !== undefined && { priority }),
      ...(dueDate !== undefined && { due_date: dueDate }),
      ...(status !== undefined && {
        completed: status === "complete" ? true : false,
      }),
    };

    filterTodos(filterObject);
    onClose();
  };

  return (
    <>
      <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
        Filters
      </Button>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Filter Todos</DrawerHeader>

          <DrawerBody>
            <FormControl mt={4}>
              <FormLabel>Complete</FormLabel>
              <Select
                value={status}
                placeholder="Select complete"
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="complete">Complete</option>
                <option value="pending">Pending</option>
              </Select>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Priority</FormLabel>
              <Select
                value={priority}
                placeholder="Select Priority"
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
                date={new Date()}
                onDateChange={setDueDate}
              />
            </FormControl>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleFilters} colorScheme="blue">
              Filter
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default TodoFilters;
