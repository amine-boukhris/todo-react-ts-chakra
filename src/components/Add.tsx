import { Flex, Input, Icon, Button } from "@chakra-ui/react";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { Todo as TodoType, getTodos, updateTodos } from "../utils";

const Add = () => {
  const [todo, setTodo] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };

  const addTodo = () => {
    if (todo.trim() !== "") {
      const newTodo: TodoType = {
        id: Date.now(),
        text: todo,
        checked: false,
      };
      const oldTodos: TodoType[] = getTodos();
      const updatedTodos: TodoType[] = [...oldTodos, newTodo];

      updateTodos(updatedTodos);
      setTodo("");
    }
  };

  return (
    <Flex alignItems={"center"} gap={1}>
      <Input
        _focus={{
          borderColor: "blue.500",
          borderWidth: "1px",
          boxShadow: "none",
        }}
        size={"md"}
        flex={"1"}
        placeholder="Add to do"
        value={todo}
        onChange={handleInputChange}
      />
      <Button colorScheme={"blue"} onClick={addTodo}>
        <Icon as={FaPlus} />
      </Button>
    </Flex>
  );
};

export default Add;
