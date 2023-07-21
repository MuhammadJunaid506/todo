import axios from 'axios';
import React,{useState, useEffect, useContext} from 'react'
import { useParams, useNavigate} from 'react-router-dom'
import Todoscontext from '../context/MainContext';

const Edit = () => {
    const {id} = useParams();
    const Navigate = useNavigate()
    const [input, setInput] = useState({name:"" , desc:"" });
    const { getallTodos} = useContext(Todoscontext)
    useEffect(()=>{
        const gettaskbyid = async ()=>{
        const res =  await axios.get(`http://localhost:8080/todos/${id}`)
            setInput(res.data)
        }
        gettaskbyid();
    },[id])

    const HandleUpdate = async (e)=>{
        e.preventDefault();
        await axios.put(`http://localhost:8080/todos/${id}`,input)
        getallTodos();
        Navigate('/');
      }

  return (
    <div className='homediv' id='hom'>
      <h1>TODO APP</h1>
      <form onSubmit={HandleUpdate}>
      <input type='text' placeholder='Update task name here' name='name'
      onChange={(e)=>{
        setInput({...input,[e.target.name]:e.target.value})
      }} value={input.name}
      />
      <input type='text' placeholder='Update task desc here' name='desc' onChange={(e)=>{
        setInput({...input,[e.target.name]:e.target.value})
      }} value={input.desc}/>
      <button >Update Task</button>
      </form>
    </div>
  )
}

export default Edit
