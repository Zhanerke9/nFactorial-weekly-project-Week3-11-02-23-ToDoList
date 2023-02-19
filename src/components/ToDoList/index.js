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
  const [edit, setEdit] = useState(null); // inside map for statements to work
  const [value, setValue] = useState(""); // for changes in the tasks already in list
  const [newTrash, setNewTrash] = useState([]); // for collection of items in trash
  const [inTrash, setInTrash] = useState(false); // for checking if item in trash, so that filter works correctly
  const [ToDos, setToDos] = useState(todo); // for including new task in a list?
  const [filtered, setFiltered] = useState(ToDos); // for tracking all changes!!! - the last one to use in filters :)

    function deleteTodo(id) {
      const itemToDelete = todo.find((item) => item.id === id);
      if (itemToDelete.deleted === "yes") {
        const newTodo = newTrash.filter((item) => item.id !== id);
        setFiltered(newTodo.filter((item) => item.deleted === "no" && (!ActiveDone || item.status === true)));
        setNewTrash(newTodo);
        setTodo(todo.filter((item) => item.id !== id));
        setInTrash(false);
      } else {
        const newTodo = todo.map((item) => {
          if (item.id === id) {
            item.deleted = "yes";
            setNewTrash([...newTrash, item]);
            setInTrash(true);
          }
          return item;
        });
        setFiltered(newTodo.filter((item) => item.deleted === "no" && (!ActiveDone || item.status === true)));
        setTodo(newTodo);
      }
      setNewModalShown(false);
    }



  function restoreTodo(id) {
    let itemToRestore = newTrash.find((item) => item.id === id);
    itemToRestore.deleted = "no";
    let newToDo = [...todo.filter((item) => item.id !== id), itemToRestore];
    setTodo(newToDo);
    setNewTrash(newTrash.filter((item) => item.id !== id));
    setFiltered(newTrash.filter((item) => item.deleted === "yes"));
    setNewModalShown(false);
    setInTrash(false);
  }


  function deleteFromTrash(id) {
    let newToDo = newTrash.filter((item) => item.id !== id);
    setFiltered(newToDo);
    setNewTrash(newToDo);
    setTodo(todo.filter((item) => item.id !== id));
    setInTrash(false);
    setNewModalShown(false);
  }

    function statusTodo(id) {
      const newTodo = todo.map((item) => {
        if (item.id === id) {
          item.status = !item.status;
        }
        return item;
      }
      );

      const sortedTodo = newTodo.sort((a, b) => {if (a.status === b.status) {return 0;}
        if (a.status) {return 1;}
        else {return -1;}
      });

      setTodo(sortedTodo);
      setFiltered(
        inTrash
          ? newTrash
          : sortedTodo.filter((item) => item.deleted === "no" && (ActiveDone ? item.status === true : true))
      );
      setNewModalShown(false);
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
  // opening modal for new task
  const openModal = () => {
    setModalShown(!ModalShown);
  };

  // for saving new task
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

  // for closing modal for new task
  const closeModal = () => {
    setModalShown(false);
  };

  // for buttonsModal open and close
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

  // for trashModal open&close
  const [TrashItemId, setTrashItemId] = useState(null);
  function openTrashModal(id) {
    setTrashItemId(id);
    setNewModalShown(!newModalShown);
  }

  function closeTrashModal() {
    setTrashItemId(null);
    setNewModalShown(false);
  }

  console.log(todo);

  // for colour change of main buttons & filters
  const [ActiveToDo, setActiveToDo] = useState(true);
  const [ActiveDone, setActiveDone] = useState(false);
  const [ActiveTrash, setActiveTrash] = useState(false);
  const selectToDo = () => {
    setActiveToDo(true);
    setActiveDone(false);
    setActiveTrash(false);
    setFiltered(todo.filter((item) => item.deleted === "no"));
    setInTrash(false)
  };

  const selectDone = () => {
    setActiveToDo(false);
    setActiveDone(true);
    setActiveTrash(false);
    setFiltered(todo.filter((item) => item.status === true && item.deleted === "no"));
    // setInTrash(false)
  };

  const selectTrash = () => {
    setActiveToDo(false);
    setActiveDone(false);
    setActiveTrash(true);
    setFiltered(todo.filter((item) => item.deleted === "yes"));
    setInTrash(true)
  };

  return (
    <div className="bigDiv">
      <div className="div-allButtons">

        <div className="buttonsRight">
        <button className="menu-buttons" onClick={selectToDo}
          style={{
            backgroundColor: ActiveToDo ? "rgba(8, 30, 52, 0.42)" : "rgba(8, 30, 52, 0.05)",
            color: ActiveToDo ? "white" : "",}}>
            <p className="menu-buttonsText"
              >To Do</p>
          </button>
          <button className="menu-buttons" onClick={selectDone}
          style={{
            backgroundColor: ActiveDone ? "rgba(8, 30, 52, 0.42)" : "rgba(8, 30, 52, 0.05)",
            color: ActiveDone ? "white" : "",}}>
            <p className="menu-buttonsText" >Done</p>
          </button>
          <button className="menu-buttons" onClick={selectTrash}
          style={{
            backgroundColor: ActiveTrash ? "rgba(8, 30, 52, 0.42)" : "rgba(8, 30, 52, 0.05)",
            color: ActiveTrash ? "white" : "",}}>
            <p className="menu-buttonsText" >Trash</p>
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
      <div>
        { ActiveToDo && <p className="textOnTaskTop">To Do</p>}
        { ActiveDone && <p className="textOnTaskTop">Done</p>}
        { ActiveTrash && <p className="textOnTaskTop">Trash</p>}
      <hr/>
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

                  {newModalShown && selectedItemId === item.id && item.deleted === "no" && (
                    <ButtonsModal
                      item={item}
                      deleteTodo={deleteTodo}
                      editTodo={editTodo}
                      closeNewModal={closeButtonsModal}
                    />
                  )}
                  {item.deleted === "yes" && (
                    <button onClick={() => openTrashModal(item.id)}>
                      <img src={threeDots} alt="buttons" />
                    </button>
                  )}
                  {newModalShown && TrashItemId === item.id && item.deleted === "yes" && (
                    <TrashModal
                      item={item}
                      restoreTodo={restoreTodo}
                      deleteFromTrash={deleteFromTrash}
                      closeTrashModal={closeTrashModal}
                    />
                  )}
                </>
                <div className="TaskButtonsToModals">
                  {
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
                  }
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
              className="textCorrection"
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
