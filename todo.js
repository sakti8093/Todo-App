import fs from 'fs'

function ReadAllTodos(){
    const allTodos=fs.readFileSync('todos.json',{
        encoding:'utf-8'
    })
    return JSON.parse(allTodos);
}

function writeAllTodos(todos){
    const data=JSON.stringify( todos,null,2 );

    fs.writeFileSync('todos.json',data,{
        encoding:'utf-8'
    })
}

export function getAllTodos(){
   let todos=ReadAllTodos();
   return todos;
}

export function getTdodById(todoId){
    console.log(todoId)
    let AllTodos = ReadAllTodos();
   const FoundTodo= AllTodos.find((elem)=>elem.id===todoId)
    return FoundTodo;
}

export function addTodos( data ){
    let todos=ReadAllTodos();

    let maxId=0;

    for( const todo of todos  ){
        if(maxId<todo.id){
            maxId=todo.id
        }
    }
    let { task } = data;
    let todo={ task,status:false, id:maxId+1 };
    todos.push(todo);
    writeAllTodos(todos)
}

export function delTodo(id){
    const todos=ReadAllTodos();
    let idx=null;

    todos.forEach((elem,index) => {
        if(elem.id === id ){
            idx=index;
        }
    })

    if(idx != null ){
        const todo=todos.splice(idx,1);
        writeAllTodos(todos)
        return todo;
    }

}

export function editTodo(id,data){
    const todos=ReadAllTodos();
       
    let idx=null;
    let task=null;

    todos.forEach((elem,index) => {
        if(elem.id === id ){
            idx=index;
            task=elem.task;
        }
    })

    if(idx != null ){
       let { status }  = data;
       let  UpdatedData={ task,status,id:id }
       todos[idx]= UpdatedData; 
       writeAllTodos(todos)
       return todos[idx];
    }
}