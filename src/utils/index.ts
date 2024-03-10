export interface Todo {
  id: number;
  text: string;
  checked: boolean;
}

export const getTodos = () : Todo[] => {
  const todos = localStorage.getItem('todos');
  return todos ? JSON.parse(todos) : [];
}

export const updateTodos = (todos: Todo[]) => {
  localStorage.setItem("todos", JSON.stringify(todos));
}

export const deleteTodo = (id: number) => {
  const oldTodos: Todo[] = getTodos()
  const newTodos: Todo[] = oldTodos.filter((todo) => todo.id != id)
  updateTodos(newTodos)
}