import React, { useState } from "react";

export default function ToDoList({ todo, setTodo }) {
  const [edit, setEdit] = useState(null);
  const [value, setValue] = useState('');

  function deleteTodo(id) {
    //console.log("delete");
    let newToDo = [...todo].filter((item) => item.id !== id);
    setTodo(newToDo);
  }

  function statusTodo(id) {
    let newToDo = [...todo].filter((item) => {
      if (item.id === id) {
        item.status = !item.status;
      }
      return item;
    });
    setTodo(newToDo);
  }

  function editTodo(id, task) {
    setEdit(id);
    setValue(task);
  }

  function saveTodo(id){
    let newTodo = [...todo].map(item=>{
        if(item.id === id){
            item.task = value;
        }
        return item
  })
  setTodo(newTodo);
  setEdit(null)
  }


  console.log(todo);

  return (
    <div>
      {todo.map((item) => (
        <div key={item.id}>
          {edit === item.id ?
            <div>
              <input value={value} onChange={(e)=>setValue(e.target.value)}/>
            </div>
           :
            <div>{item.task}</div>
          }
          {edit === item.id ?
            <div>
              <button onClick={()=>saveTodo(item.id)} >Save</button>
            </div> :
            <div>
              <button onClick={() => deleteTodo(item.id)}>Delete</button>
              <button onClick={() => editTodo(item.id, item.task)}>Edit</button>
              <button onClick={() => statusTodo(item.id)}>Open/Close</button>
            </div>
          }
        </div>
      ))}
    </div>
  );
}
