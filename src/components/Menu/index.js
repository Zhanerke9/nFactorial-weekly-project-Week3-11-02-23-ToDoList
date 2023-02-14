import "./menu.css";
import React, { useState } from "react";
// import Modal from '../Modals/index.js'
import ToDoList from "../ToDoList";

export default function Menu() {
  const tasksAll = [
    { id: 1, task: "Sign Offer from IBM", status: false, deleted: false },
    {
      id: 2,
      task: "Write a resignation letter",
      status: false,
      deleted: false,
    },
    {
      id: 3,
      task: "Organize farewell party",
      status: false,
      deleted: false,
    },
    { id: 4, task: "Book tickets to Astana", status: false, deleted: false },
    { id: 5, task: "Packing", status: false, deleted: false },
  ];


  const [ToDos, setToDos] = useState(tasksAll);

  return (
    // <div className="bigDiv">
    //   <div className="div-allButtons">
    //     <div className="buttonsRight">
    //       <button className="menu-buttons" onClick={()=>todoFilter('all')}>
    //         <p className="menu-buttonsText" >To Do</p>
    //       </button>
    //       <button className="menu-buttons" onClick={()=>todoFilter(true)}>
    //         <p className="menu-buttonsText">Done</p>
    //       </button>
    //       <button className="menu-buttons" onClick={()=>todoFilter(false)}>
    //         <p className="menu-buttonsText">Trash</p>
    //       </button>
    //     </div>
    //     <div>
    //         <button className="buttonPlus" onClick={openModal} type="submit">
    //           +
    //         </button>
    //         {ModalShown && <Modal onFormSubmit={onFormSubmit} onModalClose={closeModal}/>}
    //       {/* </form> */}
    //     </div>
    //   </div>
      <div className="tasks-List">
      <ToDoList todo={ToDos} setTodo={setToDos} />
        {/* <button></button> */}
        {/* <div>
            <ToDoList />
        </div> */}
        {/* <div> */}
          {/* {ToDos.map((item) => (
            <li key={item.id}>{item.task}</li>
          ))} */}
        {/* </div> */}
            {/* </div> */}
      </div>

  );
}
