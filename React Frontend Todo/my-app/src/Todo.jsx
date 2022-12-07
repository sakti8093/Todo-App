import { useEffect, useState } from "react"
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Text,
    Box,
    FormControl,
    Input,
    Select,
    Button,
  } from '@chakra-ui/react'
import axios from 'axios'

export const Todo=()=>{
    const [ input,setInput ]=useState("")
    const [data,setData]=useState([]);
    let count=1;

    useEffect(()=>{
        getData();
    },[])

    const getData=async()=>{
       let res1= await fetch("http://localhost:3050/todos")
       let res2=await res1.json();
       setData(res2.data);
    }

    const changeData=async(id,status)=>{
        // const res=await axios.patch('http://localhost:3050/todos',{ status:true })
        // res.data.headers['content-type']
        // res.data.json();
        await fetch(`http://localhost:3050/todos/${id}`,{
            method:"PATCH",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify( { status:!status } )
        })
        getData();
    }

    const delData=async(id)=>{
        await fetch(`http://localhost:3050/todos/${id}`,{
            method:"DELETE"
        })
        getData();
    }

    const AddTodo=async(e)=>{
        e.preventDefault()
        console.log( input );
        await fetch('http://localhost:3050/todos',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                task:input
            })
        })
        getData();
    }


    return <Box>
           <Text fontSize='30px'  >Todo App</Text>
           <Box width='40%' border='1px solid black' margin='auto'>
                <form onSubmit={AddTodo} >
                    <Input variant='outline' placeholder="Enter Task"  onChange={(e)=>setInput(e.target.value)} />
                    <Button type="submit" colorScheme='red' >Submit</Button>
                </form>
           </Box>
           <TableContainer>
            <Table variant='simple'>
                <TableCaption>All Todos are Listed Here</TableCaption>
                <Thead>
                <Tr>
                    <Th>Sl No.</Th>
                    <Th>Todos</Th>
                    <Th>Status</Th>
                    <Th>Toggle</Th>
                    <Th>Delete</Th>
                </Tr>
                </Thead>
                <Tbody>
                { data.map((elem)=>(
                <Tr key={ elem.id } >
                    <Td>{ count++ }</Td>
                    <Td>{ elem.task } </Td>
                    <Td> { elem.status?"completed" :"pending" } </Td>
                    <Td onClick={()=>changeData(elem.id,elem.status)} > Toggle </Td>
                    <Td onClick={()=>delData(elem.id) } >Delete</Td>
                </Tr>
                ))}       
                </Tbody>
            </Table>
           </TableContainer>
        </Box>
}