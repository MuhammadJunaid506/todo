import { createContext, useState} from "react";
import axios from "axios"

const Todoscontext = createContext();

export const TodosProvider = ({children})=>{
    const [todos, setTodos] = useState([]);

    const getallTodos = async ()=>{
    const res = await axios.get("http://localhost:8080/todos")
    setTodos(res.data)
    }
    return(
        <Todoscontext.Provider value={{todos, setTodos , getallTodos}}>
            {children}
        </Todoscontext.Provider>
    )
}

export default Todoscontext;