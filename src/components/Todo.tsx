import {
    Button,
    ButtonGroup,
    Checkbox,
    Flex,
    Icon,
    Input,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
} from "@chakra-ui/react";
import { FaXmark, FaCheck } from "react-icons/fa6";
import { useState } from "react";
import { LiaEllipsisVSolid } from "react-icons/lia";
import { Todo as TodoType, deleteTodo, getTodos, updateTodos } from "../utils";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

interface TodoProps {
    todo: TodoType; // Assuming TodoType is the type of your todo items
    oneEditModeOpen: boolean;
    setOneEditModeOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
}

const Todo = (props: TodoProps) => {
    const [checked, setChecked] = useState<boolean>(props.todo.checked);
    const [todoText, setTodoText] = useState<string>(props.todo.text);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [dropdown, setDropdown] = useState<boolean>(false);
    const [beforeEditValue, setBeforeEditValue] = useState<string>("");

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTodoText(e.target.value);
    };

    const handleCheck = () => {
        const newValue: boolean = !checked; // not the old one
        const existingTodos: TodoType[] = getTodos();
        const updatedTodos: TodoType[] = existingTodos.map((todo: TodoType) =>
            todo.id == props.todo.id ? { ...todo, checked: newValue } : todo
        );
        setChecked(newValue);
        updateTodos(updatedTodos);
    };

    const toggleDropdown = () => {
        setDropdown(!dropdown);
    };

    const handleDelete = () => {
        deleteTodo(props.todo.id);
        props.setTodos(getTodos())
    };

    const handleEdit = () => {
        if (!props.oneEditModeOpen) {
            setEditMode(true);
            setBeforeEditValue(todoText);
            props.setOneEditModeOpen(true);
        } else {
            alert("You are still editing a to do.");
        }
    };

    const handleAcceptEdit = () => {
        const oldTodos: TodoType[] = getTodos();
        const newTodos: TodoType[] = oldTodos.map((todo) => {
            return todo.id == props.todo.id
                ? { ...todo, text: todoText }
                : todo;
        });
        updateTodos(newTodos);
        setEditMode(false);
        props.setOneEditModeOpen(false);
    };

    const handleDeclineEdit = () => {
        setEditMode(false);
        setTodoText(beforeEditValue);
        setBeforeEditValue("");
        props.setOneEditModeOpen(false);
    };

    return (
        <Flex gap={"3"} alignItems={"center"}>
            <Checkbox
                defaultChecked={checked}
                onChange={handleCheck}
                size="lg"
            />
            <Input
                textDecoration={checked ? "line-through" : "none"}
                color={checked ? "gray.400" : "gray.700"}
                variant={"unstyled"}
                size="lg"
                placeholder="To do"
                value={todoText}
                onChange={handleTextChange}
                isReadOnly={!editMode}
            />
            {editMode ? (
                <ButtonGroup spacing={1}>
                    <Button
                        size={"sm"}
                        colorScheme={"blue"}
                        onClick={handleAcceptEdit}
                    >
                        <Icon as={FaCheck}></Icon>
                    </Button>
                    <Button
                        size={"sm"}
                        color={"red.700"}
                        onClick={handleDeclineEdit}
                    >
                        <Icon as={FaXmark}></Icon>
                    </Button>
                </ButtonGroup>
            ) : (
                <>
                    <Menu placement="bottom">
                        <MenuButton>
                            <Icon
                                as={LiaEllipsisVSolid}
                                boxSize={6}
                                cursor={"pointer"}
                                onClick={toggleDropdown}
                            />
                        </MenuButton>
                        <MenuList py={0} px={0} as={Flex} minW={"4xs"}>
                            <MenuItem
                                flex={1}
                                as={Flex}
                                justifyContent={"center"}
                                py={3}
                                px={4}
                                cursor={"pointer"}
                                onClick={handleEdit}
                            >
                                <EditIcon />
                            </MenuItem>
                            <MenuItem
                                flex={1}
                                as={Flex}
                                justifyContent={"center"}
                                py={3}
                                px={4}
                                cursor={"pointer"}
                                onClick={handleDelete}
                            >
                                <DeleteIcon />
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </>
            )}
        </Flex>
    );
};

export default Todo;
