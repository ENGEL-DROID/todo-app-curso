import {Todo} from './index';

export class TodoList{

    constructor(){
        // this.todos = [];
        this.cargarLocalStorage();
    }

    nuevoTodo(todo){
        this.todos.push(todo);
        // Guardar en el almacenamiento local
        this.guardarLocalStorage();
    }

    eliminarTodo(id){
        // Se crea un nuevo array que sobreescribe al anterior agregando todas las tareas menos la que corresponda con el id ingresado como prámetro
        this.todos = this.todos.filter(todo => todo.id != id);
        // Guardar en el almacenamiento local
        this.guardarLocalStorage();
    }
    
    marcarCompletado(id){
        for (const todo of this.todos) {
            if (todo.id == id){
                todo.completado = !todo.completado;
                // Guardar en el almacenamiento local
                this.guardarLocalStorage();
                break;
            }
        }
    }
    
    eliminarCompletados(){
        // Crear un nuevo array que sobreescribe al anterior agregando todas las tareas aún sin completar
        this.todos = this.todos.filter(todo => !todo.completado);  
        // Guardar en el almacenamiento local
        this.guardarLocalStorage();
    }

    guardarLocalStorage(){
        localStorage.setItem('todo', JSON.stringify(this.todos));
    }

    cargarLocalStorage(){
        // Si hay algo en el almacenamiento local
        if(localStorage.getItem('todo')){
            this.todos = JSON.parse(localStorage.getItem('todo'));
        } else { 
            // Si no hay nada en el almacenamiento local entonces inicializar un array vacío para las tareas
            this.todos = [];
        }
        // Se mapean todos los elementos obtenidos del localStorage para reconvertirlos en Instancias de tipo Todo
        this.todos = this.todos.map(obj => Todo.fromJson(obj));
    }
}