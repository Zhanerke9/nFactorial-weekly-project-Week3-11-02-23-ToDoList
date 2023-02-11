import "./menu.css";
import React, { useState } from "react";

export default function Menu() {
  const tasksAll = [
    { task: "Sign Offer from IBM", done: false, deleted: false },
    { task: "Write a resignation letter", done: false, deleted: false },
    { task: "Organize farewell party", done: false, deleted: false },
    { task: "Book tickets to Astana", done: false, deleted: false },
    { task: "Packing", done: false, deleted: false },
  ];

  const [taskList, setTaskList] = useState(tasksAll);
  const [newTask, setNewTask] = useState('');

  // to be continued :)

  const addTask = (e) => {
    e.preventDefault();
    setTaskList([...taskList, { task: newTask, done: false, deleted: false }]);
    setNewTask('');
  };

  return (
    <div className="bigDiv">
      <div className="div-allButtons">
        <button className="menu-buttons">
          <p className="menu-buttonsText">To Do</p>
        </button>
        <button className="menu-buttons">
          <p className="menu-buttonsText">Done</p>
        </button>
        <button className="menu-buttons">
          <p className="menu-buttonsText">Trash</p>
        </button>
        <form onSubmit={addTask}>
          <input
            type="text"
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
          />
          <button type="submit">Add Task</button>
        </form>
      </div>
      <div className="tasks-List">
        <ul>
          {taskList.map((item, index) => (
            <li key={index}>{item.task}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
