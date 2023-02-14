import React, { useState } from "react";
import Modal from "../Modals";
import { v4 as uuidv4 } from "uuid";
import '../Menu/menu.css'

export default function ToDoList({ todo, setTodo }) {
  const [edit, setEdit] = useState(null);
  const [value, setValue] = useState('');
  const [newTrash, setNewTrash] = useState([]);


  // permanent delete
  // function deleteTodo(id) {
  //   //console.log("delete");
  //   let newToDo = [...todo].filter((item) => item.id !== id);
  //   setTodo(newToDo);
  // }

  // to remove item from the To Do and DONE
  function deleteTodo(id) {
    let newToDo = [...todo].filter((item) => {
      if (item.id === id) {
        item.deleted = 'yes';
        setNewTrash([...newTrash, item]);
      }
      return !item.deleted;
    });
    setFiltered(newToDo);
  }

  // in Done
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

  const [ModalShown, setModalShown] = useState(false);
  const [ToDos, setToDos] = useState(todo);
  const [filtered, setFiltered] = useState(ToDos);

  const openModal =() => {
    setModalShown(!ModalShown);
  }

const onFormSubmit = (todo) => {
  if (todo !== "") {
    const newTodo = [      ...ToDos,      { task: todo, id: uuidv4(), status: false, deleted: false },    ];
    setToDos(newTodo);
    setFiltered(newTodo);
    setTodo(newTodo);
  }
  closeModal();
};

  const closeModal = () => {
    setModalShown(false);
  };


  function todoFilter(status, deleted) {
    if (status === "all") {
      setFiltered(todo.filter((item) => !item.deleted));
    } else if (status === true) {
      setFiltered(todo.filter((item) => item.status && !item.deleted));
    } else if (deleted === 'yes') {
      setFiltered(todo.filter((item) => !item.status && !item.deleted));
    } else {
      setFiltered(todo.filter((item) => item.deleted));
    }
  }


  console.log(todo);

  return (
    <div className="bigDiv">
      <div className="div-allButtons">
        <div className="buttonsRight">
          <button className="menu-buttons" onClick={()=>todoFilter('all')}>
            <p className="menu-buttonsText" >To Do</p>
          </button>
          <button className="menu-buttons" onClick={()=>todoFilter(true)}>
            <p className="menu-buttonsText">Done</p>
          </button>
          <button className="menu-buttons" onClick={()=>todoFilter('yes')}>
            <p className="menu-buttonsText">Trash</p>
          </button>
        </div>
        <div>
            <button className="buttonPlus" onClick={openModal} type="submit">
              +
            </button>
            {ModalShown && <Modal onFormSubmit={onFormSubmit} onModalClose={closeModal}/>}
          {/* </form> */}
        </div>
      </div>
      {filtered.map((item) => (
        <div key={item.id} className="ListOfTasks">
          <div className="tasksWithButtonsModals">
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
            <div className="TaskButtonsToModals">
              <button onClick={() => deleteTodo(item.id)}>Delete</button>
              <button onClick={() => editTodo(item.id, item.task)}>Edit</button>
              <button onClick={() => statusTodo(item.id)}>Open/Close</button>
            </div>
          }
          </div>
        </div>
      ))}
    </div>
  );
}
