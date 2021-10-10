
import './App.css';
import Header from './Components/Header';
import {Footer} from './Components/Footer';
import {Todos} from './Components/Todos';
import {AddTodo} from './Components/AddTodo';
import React, { useState } from 'react';

function App() {
  const onDelete = (todo)=>{
    console.log("i m on delete of todo",todo);
    setTodos(todos.filter((e)=>{
      return e!==todo;
    }))
  }
  const addTodo = (title,desc)=>{
    console.log("I am adding this todo",title,desc)
    let sno = todos[todos.length-1].sno + 1;
    const myTodo = {
      sno: sno,
      title: title,
      desc: desc,
    }
    setTodos([...todos, myTodo]);
    console.log(myTodo);
  }
  const [todos, setTodos] =  useState([
    {
      sno:1,
      title: "coding",
description: "you need to do code with harry"
    },
    {
      sno:2,
      title: "shopping",
description: "you need to go shopping to market"
    },
    {
      sno:3,
      title: "series",
description: "you need to watch friends on tv"
    }
  ]);
  return (
    <>
    <Header title="My Todo List" searchBar={false}/>
    <AddTodo addTodo={addTodo}/>
    <Todos todos={todos} onDelete={onDelete}/>
    <Footer/>
    </>
  );
}

export default App;
