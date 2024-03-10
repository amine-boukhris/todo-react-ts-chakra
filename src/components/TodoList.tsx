import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Heading,
    Stack,
    Text,
    StackDivider,
    Button,
    Flex,
    Input,
    Icon,
} from "@chakra-ui/react";
import Todo from "./Todo";
import { Todo as TodoType, getTodos, updateTodos } from "../utils";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";

const TodoList = () => {
    const [todos, setTodos] = useState<TodoType[]>(getTodos());
    const [todoToAdd, setTodoToAdd] = useState<string>("");
    const [oneEditModeOpen, setOneEditModeOpen] = useState<boolean>(false);

    const handleAddChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTodoToAdd(e.target.value);
    };

    const addTodo = () => {
        if (todoToAdd.trim() !== "") {
            const newTodo: TodoType = {
                id: Date.now(),
                text: todoToAdd,
                checked: false,
            };
            const oldTodos: TodoType[] = getTodos();
            const updatedTodos: TodoType[] = [...oldTodos, newTodo];
            setTodos(updatedTodos);
            updateTodos(updatedTodos);
            setTodoToAdd("");
        }
    };

    const clearAll = () => {
        localStorage.removeItem("todos");
        setTodos([]);
    };

    return (
        <Card size={"md"}>
            <CardHeader>
                <Heading mb="3" color={"blue.600"}>
                    Todo App
                </Heading>
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
                        value={todoToAdd}
                        onChange={handleAddChange}
                    />
                    <Button colorScheme={"blue"} onClick={addTodo}>
                        <Icon as={FaPlus} />
                    </Button>
                </Flex>
            </CardHeader>

            <CardBody>
                {todos.length == 0 ? (
                    <Text textAlign={"center"} color={"gray.500"}>You don't have any to do</Text>
                ) : (
                    <Stack divider={<StackDivider />} spacing="4">
                        {todos.map((todo: TodoType) => {
                            return (
                                <Todo
                                    setTodos={setTodos}
                                    key={todo.id}
                                    todo={todo}
                                    oneEditModeOpen={oneEditModeOpen}
                                    setOneEditModeOpen={setOneEditModeOpen}
                                />
                            );
                        })}
                    </Stack>
                )}
            </CardBody>
            <CardFooter flexDirection={"column"}>
                {/* for this I wanted to first show 5 todos and then show the rest on demand
                but I will implement this in a later time 
                <Button
                    colorScheme="teal"
                    fontWeight={"light"}
                    variant={"link"}
                    size={"sm"}
                    mb="2"
                >
                    Show more
                </Button>
                <Divider /> */}
                <Flex justifyContent={"space-between"} mt={"3"}>
                    <Text>You have {todos.length} pending tasks</Text>
                    <Button
                        colorScheme="blue"
                        variant="solid"
                        size={"sm"}
                        fontWeight={"light"}
                        onClick={clearAll}
                    >
                        Clear all
                    </Button>
                </Flex>
            </CardFooter>
        </Card>
    );
};

export default TodoList;
