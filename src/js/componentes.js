import {Todo} from '../classes/todo.class';
import {todoList} from '../index';

// Referencias en el Html:
const divTodoList   = document.querySelector('.todo-list');
const txtInput      = document.querySelector('.new-todo');
const btnBorrar     = document.querySelector('.clear-completed');
const ulFiltors     = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

export const crearTodoHtml = (todo) => {

    const htmlTodo = `
    <li class="${ (todo.completado) ? 'completed' : '' }" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : '' }>
            <label> ${todo.tarea} </label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>
    `;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append(div.firstElementChild);

    return div.firstElementChild;
}

// Eventos:
txtInput.addEventListener('keyup', (event) => {
    if(event.keyCode == 13 && txtInput.value.length >0){ // Si se ha presionado la tecla Enter y tiene algún caractér
        const nuevoTodo = new Todo(txtInput.value);
        todoList.nuevoTodo(nuevoTodo); // Almacenar en el array
        crearTodoHtml(nuevoTodo); // Montar en el Html
        txtInput.value = '';  // Borrar el input
        console.log(todoList);
    }
})

divTodoList.addEventListener('click', (event) => {
    const nombreElemento = event.target.localName; // input, label, button
    const todoElemento   = event.target.parentElement.parentElement;
    const todoId         = todoElemento.getAttribute('data-id');
    
    if(nombreElemento.includes('input')){  // si se hace click en el checkbox del input
        todoList.marcarCompletado(todoId); // cambiar true/false
        todoElemento.classList.toggle('completed'); // cambiar la clase que tacha visualmente la tarea
    } else if(nombreElemento.includes('button')){
        todoList.eliminarTodo(todoId);  // Eliminar del array
        divTodoList.removeChild(todoElemento); // Eliminar del Html
    }
})

btnBorrar.addEventListener('click', () => {
    // Eliminar del array
    todoList.eliminarCompletados();  
    // Recorrer La lista <ul> que contine las tareas, en orden inverso para no alterar los índices
    for(let i=divTodoList.children.length-1; i>=0; i--){
        // Almacenar cada tarea del Html 
        const elemento = divTodoList.children[i];  // Tarea del Html
        // Si el elemento contiene la clase 'completed' activada
        if(elemento.classList.contains('completed')){
            divTodoList.removeChild(elemento);
        }
    }
})

ulFiltors.addEventListener('click', (event) => {
    // Se almacena el texto que se ha clicado
    const filtro = event.target.text;
    // Si el filtro devuelve undefined entonces terminar el proceso
    if(!filtro){ return; }
    // Eliminar la clase selected
    anchorFiltros.forEach(element => element.classList.remove('selected'));
    // Agregar la clase selected a los seleccionados
    event.target.classList.add('selected');
    // Se recorren los elementos del Html
    for (const elemento of divTodoList.children) {
        // Ocultar la clase hidden que oculta un elemento en el Html
        elemento.classList.remove('hidden');
        // Almacenar el elemento que contenga la clase
        const completado = elemento.classList.contains('completed');
        // Según la opción elegida filtrar
        switch (filtro) {
            case 'Pendientes':
                // Si está completado entonces ocultar
                if(completado){
                    elemento.classList.add('hidden');
                }
                break;
        
            case 'Completados':
                // Si NO está completado entonces ocultar
                if(!completado){
                    elemento.classList.add('hidden');
                }
                break;
        
            default:
                break;
        }
    }
})