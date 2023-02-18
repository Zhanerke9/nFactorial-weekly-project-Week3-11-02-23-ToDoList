import React, { useState } from "react";
import Modal from "../Modals";
import { v4 as uuidv4 } from "uuid";
import "../Menu/menu.css";
import ButtonsModal from "../Modals/buttons";
import TrashModal from "../Modals/trash";
import threeDots from "../../images/Vector.png";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // <-- import styles to be used
import { FaCheckSquare, FaRegSquare } from "react-icons/fa";

export default function ToDoList({ todo, setTodo }) {
  const [edit, setEdit] = useState(null);
  const [value, setValue] = useState("");
  const [newTrash, setNewTrash] = useState([]);
  const [inTrash, setInTrash] = useState(false);

  function deleteTodo(id) {
    let itemToDelete = todo.find((item) => item.id === id);
    if (itemToDelete.deleted === "yes") {
      setInTrash(true);
    } else {
      let newToDo = [...todo].filter((item) => {
        if (item.id === id) {
          item.deleted = "yes";
          setNewTrash([...newTrash, item]);
        }
        return item.deleted === "no";
      });
      //setTodo(newToDo);
      setFiltered(newToDo);
    }
  }

  function restoreTodo(id) {
    let itemToRestore = newTrash.find((item) => item.id === id);
    itemToRestore.deleted = "no";
    let newToDo = [...todo.filter((item) => item.id !== id), itemToRestore];
    setTodo(newToDo);
    setNewTrash(newTrash.filter((item) => item.id !== id));
    setInTrash(false);
    setFiltered(newToDo.filter((item) => item.deleted !== "yes"));
  }

  function deleteFromTrash(id) {
    let newToDo = newTrash.filter((item) => item.id !== id);
    setFiltered(newToDo);
    setNewTrash(newToDo);
    setTodo(todo.filter((item) => item.id !== id));
  }

  function statusTodo(id) {
    let itemToUpdate = todo.find((item) => item.id === id);
    itemToUpdate.status = !itemToUpdate.status;
    let trueItems = todo.filter((item) => item.status === true);
    let falseItems = todo.filter((item) => item.status === false);
    setTodo([...falseItems, ...trueItems]);
    setFiltered([...falseItems, ...trueItems]);
  }

  function editTodo(id, task) {
    setEdit(id);
    setValue(task);
  }

  function saveTodo(id) {
    let newTodo = [...todo].map((item) => {
      if (item.id === id) {
        item.task = value;
      }
      return item;
    });
    setTodo(newTodo);
    setEdit(null);
  }

  const [ModalShown, setModalShown] = useState(false);
  const [ToDos, setToDos] = useState(todo);
  const [filtered, setFiltered] = useState(ToDos);

  const openModal = () => {
    setModalShown(!ModalShown);
  };

  const onFormSubmit = (todo) => {
    if (todo !== "") {
      const newTodo = [
        ...ToDos,
        { task: todo, id: uuidv4(), status: false, deleted: "no" },
      ];
      setToDos(newTodo);
      setFiltered(newTodo);
      setTodo(newTodo);
    }
    closeModal();
  };

  const closeModal = () => {
    setModalShown(false);
  };

  const [newModalShown, setNewModalShown] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  function showButtonsModal(id) {
    setSelectedItemId(id);
    setNewModalShown(!newModalShown);
  }

  function closeButtonsModal() {
    setSelectedItemId(null);
    setNewModalShown(false);
  }

  const [TrashItemId, setTrashItemId] = useState(null);
  function openTrashModal(id) {
    setTrashItemId(id);
    setNewModalShown(!newModalShown);
  }

  function closeTrashModal() {
    setTrashItemId(null);
    setNewModalShown(false);
  }

  function todoFilter(status, deleted) {
    if (status === "all") {
      setFiltered(todo.filter((item) => item.deleted === "no"));
    } else if (status === true) {
      setFiltered(todo.filter((item) => item.status && item.deleted === "no"));
    } else if (deleted === "yes") {
      setFiltered(todo.filter((item) => !item.status && item.deleted === "no"));
    } else {
      setFiltered(todo.filter((item) => item.deleted === "yes"));
    }
  }

  console.log(todo);

  return (
    <div className="bigDiv">
      <div className="div-allButtons">
        <div className="buttonsRight">
          <button className="menu-buttons" onClick={() => todoFilter("all")}>
            <p className="menu-buttonsText">To Do</p>
          </button>
          <button className="menu-buttons" onClick={() => todoFilter(true)}>
            <p className="menu-buttonsText">Done</p>
          </button>
          <button className="menu-buttons" onClick={() => todoFilter("yes")}>
            <p className="menu-buttonsText">Trash</p>
          </button>
        </div>
        <div>
          <button className="buttonPlus" onClick={openModal} type="submit">
            +
          </button>
          {ModalShown && (
            <Modal onFormSubmit={onFormSubmit} onModalClose={closeModal} />
          )}
        </div>
      </div>

      {filtered.map((item) => (
        <div key={item.id} className="ListOfTasks">
          <div className="tasksWithButtonsModals">
            {edit === item.id ? (
              <div>
                <button
                  onClick={() => saveTodo(item.id)}
                  className="taskButtonsStyle"
                >
                  <FontAwesomeIcon icon={faSave} />
                </button>
              </div>
            ) : (
              <div className="TaskButtonsToModals">
                <>
                  {item.deleted === "no" && (
                    <button onClick={() => showButtonsModal(item.id)}>
                      <img src={threeDots} alt="buttons" />
                    </button>
                  )}

                  {selectedItemId === item.id && item.deleted === "no" && (
                    <ButtonsModal
                      item={item}
                      deleteTodo={deleteTodo}
                      editTodo={editTodo}
                      statusTodo={statusTodo}
                      closeNewModal={closeButtonsModal}
                      inTrash={inTrash}
                    />
                  )}
                  {item.deleted === "yes" && (
                    <button onClick={() => openTrashModal(item.id)}>
                      <img src={threeDots} alt="buttons" />
                    </button>
                  )}
                  {TrashItemId === item.id && item.deleted === "yes" && (
                    <TrashModal
                      item={item}
                      restoreTodo={restoreTodo}
                      deleteFromTrash={deleteFromTrash}
                      closeTrashModal={closeTrashModal}
                    />
                  )}
                </>
                <div className="TaskButtonsToModals">
                  {item.deleted === "no" && (
                    <button
                      onClick={() => statusTodo(item.id)}
                      className="taskButtonsStyle"
                    >
                      {item.status === false ? (
                        <FaRegSquare />
                      ) : (
                        <FaCheckSquare />
                      )}
                    </button>
                  )}
                </div>
              </div>
            )}
            {edit === item.id ? (
              <div>
                <input
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </div>
            ) : (
              <div
                style={{
                  textDecoration: item.status ? "line-through" : "none",
                }}
              >
                {item.task}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
