import React, { useState, useRef, useEffect } from "react";
import TodoList from "./ToDoList";
import  '../Style.css'

export default function Todo() {
  const [error,setError]=useState(false)
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(0);

  if (error) {
    setTimeout(() => {
      setError(false)
    }, 2000);
  }

  const addTodo = () => {
    if (todo !== '') {
      const existTodo = todos.find((item) => item.list.toLowerCase() == todo.toLowerCase())
      if (!existTodo) {
        setTodos([...todos, { list: todo, id: Date.now(), status: false }]);
        setTodo("");
        setError(false)
      } else {
        setError(true)
      }
      
    } else {
      setError(true)
    } 
    if (editId) {
      const editTodo = todos.find((item) => item.id === editId)
      const updateTodo = todos.map((item) => item.id === editTodo.id
        ? (item = { id: item.id, list: todo })
        :(item = { id: item.id, list: item.list })
      )
      console.log(todos);
      console.log(updateTodo);
      setTodos(updateTodo)
      setEditId(0)
      setTodo("")
}
  };

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const onDelete = (id) => {
    
    const filteredTodos = todos.filter((item) => item.id !== id);
    setTodos(filteredTodos);
  };

  const onComplete = (id) => {
    const updatedTodos = todos.map((list) => {
      if (list.id === id) {
        return { ...list, status: !list.status };
      }
      return list;
    });
    setTodos(updatedTodos);
  };

  const onEdit = (id) => {
    const editTodo = todos.find((todo) => todo.id === id)
    setTodo(editTodo.list)
    setEditId(editTodo.id)
    
  }

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container">
      <h2>Todo App</h2>
      <form className="form-group" onSubmit={submitHandler}>
        <input style={{border:error?"2px solid red":"1px solid black"}}
          type="text"
          placeholder="Enter your todo"
          className="form-control"
          value={todo}
          onChange={(e) => setTodo(e.target.value.trimStart())}

          ref={inputRef}
        />
        <button onClick={addTodo}>{ editId ? 'Edit' :'Add'}</button>
      </form>
      <TodoList onComplete={onComplete} onEdit={onEdit} onDelete={onDelete } todos={todos} />
    </div>
  );
}

