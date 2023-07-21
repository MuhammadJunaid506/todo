import React,{useContext,useEffect, useState} from 'react'
import Todoscontext from '../context/MainContext'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Home = () => {
  const [input, setInput] = useState({name:"" , desc:"" })
  const {todos, setTodos , getallTodos} = useContext(Todoscontext)
  useEffect(()=>{
    getallTodos();
  },[])
  
  const HandleSubmit = async (e)=>{
    e.preventDefault();
    await axios.post("http://localhost:8080/todos",input)
    getallTodos();
    setInput({
      name:"",desc:""
    })
  }

  const HandleClickDelete = async(id)=> {
    await axios.delete(`http://localhost:8080/todos/${id}`)
    const remaingtask = todos.filter((item)=>{
      return item.id !== id
    })
    setTodos(remaingtask)
    getallTodos();
  }

  
  const handleDragStart = (e, id) => {
    e.dataTransfer.setData('text/plain', id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (e) => {
    const id = e.dataTransfer.getData('text/plain');
    const updatedTodos = todos.map((item) => {
      if (item.id === id) {
        return { ...item, completed: true };
      }
      return item;
    });
    setTodos(updatedTodos);
    await axios.put(`http://localhost:8080/todos/${id}`, { completed: true });
  };

  return (
    <div className='homediv'>
      <h1>TODO APP</h1>
      <form onSubmit={HandleSubmit}>
      <input type='text' placeholder='add task name here' name='name'
      onChange={(e)=>{
        setInput({...input,[e.target.name]:e.target.value})
      }} value={input.name}
      />
      <input type='text' placeholder='add task desc here' name='desc' onChange={(e)=>{
        setInput({...input,[e.target.name]:e.target.value})
      }} value={input.desc}/>
      <button >Add Task</button>
      </form>
          <div className='todolist'>
        {Object.keys(todos).length > 0 ?(
          todos.map((item) =>{
            return(
          <div className='listitems'key={item.id}
          draggable
          onDragStart={(e) => handleDragStart(e, item.id)}
          onDragOver={handleDragOver}
          onDrop={handleDrop}> 
            <h2>{item.id}</h2>
            <h1>{item.name}</h1>
            <h4>{item.desc}</h4>
            <Link to={`/edit/${item.id}`}><button>Edit Task</button> </Link>
            <button onClick={() => HandleClickDelete(item.id) }>Delete Task</button>
          </div>
          )})
         ):( 
          <div>No Data Found</div>
         )} 
         </div>
    </div>
  )
}

export default Home
