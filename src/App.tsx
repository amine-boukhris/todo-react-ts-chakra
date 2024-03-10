import "./App.css";
import { Container } from "@chakra-ui/react";
import TodoList from "./components/TodoList";

function App() {
  return (
    <Container py="10">
      <TodoList />
    </Container>
  );
}

export default App;
