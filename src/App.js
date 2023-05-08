import React, {useState, useEffect} from 'react';
import './App.css';
import Toggle from './components/Toggle';
import {AiOutlineDelete} from 'react-icons/ai';
import {AiOutlineCheck} from 'react-icons/ai';

function App() {
  const[isCompleteScreen, setIsCompleteScreen]=useState(false);
  const[allTodos, setAllTodos] = useState([]);
  const[newTitle, setNewTitle] = useState('');
  const[newDescription, setNewDescription] = useState('');
  
const handleAddTodo = () =>{
  let newTodoItem={
    title: newTitle,
    description: newDescription
  }

  let updatedTodoArr = [...allTodos];
  updatedTodoArr.push(newTodoItem);
  setAllTodos(updatedTodoArr);
  localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));
}

const handleDeleteTodo =(index)=>{
  let reducedTodo = [...allTodos];
  reducedTodo.splice(index);

  localStorage.setItem('todolist', JSON.stringify(reducedTodo));
  setAllTodos(reducedTodo)
}

useEffect(()=>{
  let saveTodo = JSON.parse(localStorage.getItem('todolist'));
  if(saveTodo){
    setAllTodos(saveTodo);
  }
},[])

  return (
    <div className="App">
      <h1>My Todos</h1>
      <div className='todo-wrapper'>
        <div className='todo-input'>

        <div className='todo-input-item'>
            <label>Title</label>
            <input type="text" value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} placeholder="what's the title?"/>
          <div className='todo-input-item'>
            <label>Description</label>
            <input type="text" value={newDescription} onChange={(e)=> setNewDescription(e.target.value)} placeholder="What's the description?"/>
        </div>
        <button type='button' onClick={handleAddTodo} className='primaryBtn'>Add</button>
        </div>
        </div>

      </div>

      <div className='btn-area'>
        <button className='secondaryBtn' onClick={()=>setIsCompleteScreen(!isCompleteScreen)}>Todo</button>
        {isCompleteScreen && <Toggle/>}
        <button className='secondaryBtn' onClick={()=>setIsCompleteScreen(!isCompleteScreen)}>Description
        </button>
        {isCompleteScreen && <Toggle/>}
      </div>

      <div className='todo-list'>
        {allTodos.map((item, index)=>{
          return(
            <div className='todo-list-item' key={index}>
        <div>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        </div>

        <div>
          <AiOutlineDelete className='icon' onClick={()=>handleDeleteTodo(index)}/>
          <AiOutlineCheck className='check-icon'/>
        </div>
        </div>
          )
        })}
      </div>

    </div>
  );
}

export default App;
