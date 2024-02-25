import React, {useState, useEffect} from 'react';
import axios from 'axios'

const BASE_URL = "http://localhost:5000/"

const Home = () => {

    const [todos, setTodos] = useState([])
    const [name, setName] = useState('')
    const [currid, setCurrid] = useState(null)
    const [isediting, setIsediting] = useState(false)

    useEffect(() => {
        getTodos()
      })

    const getTodos = async () => {
        try{
        const newTodos = await axios.get(`${BASE_URL}todos`)
        console.log(newTodos)
        setTodos(newTodos.data)

        } catch (err) {
        console.log(err)
        }
    }

    const handleAddTodo = async (e) => {
        e.preventDefault()
        try {
        const res = await axios.post(`${BASE_URL}todos`, {
            name : name
        })
        console.log(res)
        setName('')
        getTodos()
        } catch (err) {
        console.log(err)
        }
    }

    const handleDelete = async (id) => {
        try {
        const res = await axios.delete(`${BASE_URL}todos/${id}`)
        console.log(res)
        getTodos()

        } catch (err) {
        console.log(err)
        }
    }

    const handleEdit = (id, todoname) => {
        setCurrid(id)
        setName(todoname)
        setIsediting(true)
    }

    const handleCancel = () => {
        setCurrid(null)
        setName("")
        setIsediting(false)
    }

    const handleSave = async (e) => {
        e.preventDefault()
        try {
        const res = await axios.put(`${BASE_URL}todos/${currid}`, {
            name : name
        })
        console.log(res)
        getTodos()
        setCurrid(null)
        setName("")
        setIsediting(false)

        } catch (error) {
        console.log(error)
        }
    }

  return (
      <div className = 'todo-container'>
        <h1>MERN STACK TODO APP</h1>
          <form onSubmit = {isediting ? handleSave : handleAddTodo}>
            <input type ="text" value = {name} onChange = {(e) => setName(e.target.value)}/>
            <button>{isediting ? "Save" : "Add Todo"}</button>
            {isediting ? <button onClick = {handleCancel}>Cancel</button> : ""}
          </form>

          <ul>
            { isediting ? "" :
              todos.map((todo, i) => (
                <li key = {i}>{todo.name}<button onClick = {() => handleEdit(todo._id, todo.name)}> Edit </button> <button onClick = {() => handleDelete(todo._id)}> ⨯ </button></li>
              ))
            }
          </ul>
        </div>
  );
}

export default Home;
