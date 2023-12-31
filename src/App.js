import './App.css';
import React, {useState, useEffect} from 'react';
import {getTodos, postTodo, putTodo, deleteTodo} from './actions/todos';


function App() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    getTodos().then(res => {
      setTodos(res);
    })
  }

  const addTodo = () => {
    postTodo(todo).then(() => {
      getData();
    })
  }

  const completeTodo = (todo) => {
    const newTodo = {...todo, isDone: true}
    putTodo(newTodo).then(() => {
      getData();
    });
  }

  const removeTodo = (todo) => {
    deleteTodo(todo).then(() => {
      getData();
    });
  }

  return (
    <div className="App">
     <input value={todo} onChange={(e)=> setTodo(e.target.value)}/>
     <button onClick={addTodo}>Submit</button>
     {todos.length > 0 && todos.map((todo, idx) => (
      <div key={idx}>
        <span className={todo.isDone ? 'done' : ''}>{todo.description}</span>
        <span>
          {todo.isDone ? <button onClick={() => removeTodo(todo)}>Delete</button> : <button onClick={() => completeTodo(todo)}>Complete</button>}
        </span>
      </div>
     ))}
    </div>
  );
}

export default App;
