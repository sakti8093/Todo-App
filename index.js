import  express  from "express";
import { getAllTodos, getTdodById ,addTodos,delTodo,editTodo} from "./todo.js";
import cors from 'cors'

const app=express();

app.use(express.json());
app.use(cors())

app.get('/',(req,res)=>{
    res.send({
        status:"success",
        data:"welcome to Todo App"
    })
})

app.get('/todos',(req,res)=>{
    try{
        let todos=getAllTodos();
        res.send({
            status:"success",
            data:todos
        })
    }catch(err){
        res.send({
            status:"error",
            data:"Internal Server Error"
        })
    }
})

app.get('/todos/:id',(req,res)=>{
    let {id}=req.params;
    try{
    if(isNaN(parseInt(id))){
     return  res.send({
            status:"error",
            data:"Invalid Id"
        })
    }else{
       id=parseInt(id);
      let todos =getTdodById(id);
      if(todos){
      return  res.send({
            status:"success",
            data:todos
        })
      }else{
       return  res.send({
            status:"error",
            data:"Invalid Id"
        })
      }
    }
}catch(err){
    return  res.status(500).send({
        status:"error",
        data:"Internal Server Error"
    })
}
})

app.post( '/todos' ,(req,res)=>{

    const data=req.body;
    try{
            if(data.task){
                const todos=addTodos( data );
                return res.status(200).send({
                    status:"success",
                    data:todos
                })
            }else{
                return res.status(400).send({
                    status:"error",
                    data:"Incomplete Details"
                })
            }
        }catch(err){
            return res.send({
                status:"error",
                data:"Internal Server Error"
            })
        }

 })

 app.delete( '/todos/:id' ,(req,res)=>{
    try{
        let {id}=req.params;

        if(isNaN(parseInt(id))){
            return res.send({
                status:"error",
                data:"Invalid Id"
            })
        }else{
            id=parseInt(id);
            let todos= delTodo(id);
            return res.send({
                status:"success",
                data:todos
            })
        }
    }catch(err){
        return res.send({
            status:"error",
            data:"Internal Server Error"
        })
    }
 } )

 app.patch('/todos/:id',(req,res)=>{
    try{
        let {id}=req.params;

        if(isNaN(parseInt(id))){
            return res.send({
                status:"error",
                data:"Invalid Id"
            })
        }else{
            id=parseInt(id);
            if(req.body.status || req.body.status == false ){
                let todos= editTodo(id, req.body )
                return res.send({
                    status:"success",
                    data:todos
                })
            }else{
                return res.status(404).send({
                    status:"error",
                    data:"Incomplete Details"
                })
            }
           
        }
    }catch(err){
        return res.send({
            status:"error",
            data:"Internal Server Error"
        })
    }
 })



app.listen(3050,()=>{
    console.log('http://localhost:3050')
})


