import './styles.css';
import {Todo, TodoList} from './classes';
import {crearTodoHtml} from './js/componentes';

export const todoList = new TodoList();

// Recorrer el array y mostrar en el Html cada elemento encontrado (todo)
todoList.todos.forEach(todo => crearTodoHtml(todo));