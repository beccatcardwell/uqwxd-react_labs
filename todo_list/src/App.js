import React from "react";
import {useState,useEffect} from "react";
import "./App.css";
const App = () => {
  const [todos, setTodos] = useState([]);
  const [todoEditing, setTodoEditing] = useState(null);

  useEffect(() => {
    const json = localStorage.getItem('todos')
    const loadedTodos = JSON.parse(json)
    if (loadedTodos) setTodos(loadedTodos)
  }, [])

  useEffect(() => {
    if (todos.length > 0) {
        const json = JSON.stringify(todos)
        localStorage.setItem("todos", json)
    }
  }, [todos])
  
  // Add the handlesubmit code here
  function handleSubmit(event) {
    event.preventDefault();

    let todo = document.getElementById('todoAdd').value
    const newTodo = {
      id: new Date().getTime(),
      text: todo.trim(),
      completed: false,
    };
    if (newTodo.text.length > 0 ) {
        setTodos([...todos].concat(newTodo));
    } else {
        alert("Enter Valid Task");
    }
    document.getElementById('todoAdd').value = ""
  }
  
  // Add the deleteToDo code here
  function deleteToDo(id) {
    let updatedTodos = [...todos].filter((todo) => todo.id !== id)
    setTodos(updatedTodos)
  }
  
  // Add the toggleComplete code here
  function toggleComplete(id) {
    let updatedTodos = [...todos].map((todo) => {
        if (todo.id === id) todo.completed = !todo.completed
        return todo
    })
    setTodos(updatedTodos)
  }
  
  // Add the submitEdits code here
  function submitEdits(newtodo) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === newtodo.id) {
        todo.text = document.getElementById(newtodo.id).value;
        }
        return todo;
      });
      setTodos(updatedTodos);
      setTodoEditing(null);
    }
  
return(
<div id="todo-list">
    <h1>Todo List</h1>
        <form onSubmit={handleSubmit}>
            <input
              type="text"
              id = 'todoAdd'
            />
            <button type="submit">Add Todo</button>
        </form>
        {todos.map((todo) =>
            <div className="todo" key={todo.id}>
                <div className="todo-text">{todo.id === todoEditing ? <input id={todo.id} type='text' defaultValue={todo.text} /> : todo.text} <input type="checkbox" checked={todo.completed} onChange={() => toggleComplete(todo.id)}/></div>
                <button onClick={() => todo.id === todoEditing ? submitEdits(todo) : setTodoEditing(todo.id)}>{todo.id === todoEditing ? 'Submit Edit' : 'Edit'}</button>
            <button onClick={() => deleteToDo(todo.id)}>Delete</button>
            </div>)}
</div>
);
};
export default App;
