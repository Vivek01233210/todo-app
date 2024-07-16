import { useEffect, useState } from 'react'
import './App.css'
import { TodoProvider } from './context'
import { TodoForm, TodoItems } from './components'

function App() {

  const [todos, setTodos] = useState([])

  // choosing Data.now() as a unique id.
  const addTodo = (todo) => {
    setTodos((prevTodo) => { return [{ id: Date.now(), ...todo }, ...prevTodo] })
  }

  // match and set the todo whose id matches with the updating todo.
  const updateTodo = (id, todo) => {
    setTodos((prevTodo) => { return prevTodo.map((eachTodo) => { return eachTodo.id === id ? todo : eachTodo }) })
  }

  // return all the todos whose ids do not match with the id of the todo which we want to delete.
  const deleteTodo = (id) => {
    setTodos((prev) => { return prev.filter((eachTodo) => { return eachTodo.id !== id }) })
  }

  // reverse the 'completed' value of the particular todo 
  const toggleComplete = (id) => {
    setTodos((prev) => { return prev.map((eachTodo) => { return eachTodo.id === id ? { ...eachTodo, completed: !eachTodo.completed } : eachTodo }) })
  }

  // getting all the todos from localStorage when the application loads.
  useEffect(() => {
    const todoData = JSON.parse(localStorage.getItem('todos'))
    if (todoData && todoData.length > 0) {
      setTodos(todoData)
    }
  }, []);

  // Saving todos to localStorage when there is a change in the todos array of useState.
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])


  return (
    <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((eachTodo) => {
              return (
                <div key={eachTodo.id} className='w-full'>
                  <TodoItems todoObject={eachTodo}/>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App