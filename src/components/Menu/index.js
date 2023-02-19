import "./menu.css";
import React, { useState } from "react";
// import Modal from '../Modals/index.js'
import ToDoList from "../ToDoList";

export default function Menu() {
  const tasksAll = [
    { id: 1, task: "Sign Offer from IBM", status: false, deleted: "no" },
    {
      id: 2,
      task: "Write a resignation letter",
      status: false,
      deleted: "no",
    },
    {
      id: 3,
      task: "Organize farewell party",
      status: false,
      deleted: "no",
    },
    { id: 4, task: "Book tickets to Astana", status: false, deleted: "no" },
    { id: 5, task: "Packing", status: false, deleted: "no" },
  ];

  const [ToDos, setToDos] = useState(tasksAll);

  return (
    <div className="tasks-List">
      <ToDoList todo={ToDos} setTodo={setToDos} />
    </div>
  );
}
