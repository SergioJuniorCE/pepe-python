// CRUD
// Create
// Read
// Update
// Delete

import { useEffect, useState } from "react"

type Todo = {
  id: number,
  title: string,
  description: string
  completed: boolean
}

type TodoInsert = {
  title: string,
  description: string
}

function App() {

  const [todos, setTodos] = useState<Todo[]>([] as Todo[])

  const [todo, setTodo] = useState<TodoInsert>({
    title: '',
    description: '',
  })

  useEffect(() => {
    fetch('http://localhost:8000/todos')
      .then(response => response.json())
      .then(data => setTodos(data))
  }, [])

  function addTodo() {
    fetch('http://localhost:8000/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todo)
    })
      .then(response => response.json())
      .then(data => {
        setTodos((prev) => [...prev, data])
      })
  }

  return (
    <>
      <header>
        <nav>
          <ul className="flex flex-row">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <h1 className="text-3xl">Pepe's todos emporium</h1>
        <div className="flex gap-3">
          <label>Title</label>
          <input type="text" className="border-gray-400 border-2"
            placeholder="Enter a title"
            onChange={(e) => setTodo((prev) => {
              return {
                ...prev,
                title: e.target.value
              }
            })}
          />
        </div>
        <div className="flex gap-3">
          <label>Description</label>
          <input type="text" className="border-gray-400 border-2"
            placeholder="Enter a Description"
            onChange={(e) => setTodo((prev) => {
              return {
                ...prev,
                description: e.target.value
              }
            })}
          />
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={addTodo}
        >
          Add Todo
        </button>

        {todos.length > 0 && (
          <ul>
            {todos.map((todo) => (
              <li key={todo.id} className="border-red-500 border-2">
                <h2>Title: {todo.title}</h2>
                <p>Decription: {todo.description}</p>
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  )
}

export default App
