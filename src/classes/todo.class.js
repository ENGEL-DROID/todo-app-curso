


export class Todo {

    // Éste método fromJson se ha creado al final del tutorial y sirve sólo para recuperar los elementos del localStorage en forma de Instancia y no en forma de Objeto como lo devuelve el Json.parse
    static fromJson({id,tarea,completado,creado}) {
        const tempTodo      = new Todo(tarea);
        tempTodo.id         = id;
        tempTodo.completado = completado;
        tempTodo.creado     = creado;
        return tempTodo;
    }

    constructor(tarea) {

        this.tarea       = tarea;
        this.id          = new Date().getTime();
        this.completado  = false;
        this.creado      = new Date();
        
    }
}