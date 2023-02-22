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
  const [ToDos, setToDos] = useState(todo); // for including new task in a list?
  const [filtered, setFiltered] = useState(ToDos); // for tracking all changes!!! - the last one to use in filters :)
  // for colour change of main buttons & tracking at which section we are for filtering:
  const [ActiveToDo, setActiveToDo] = useState(true);
  const [ActiveDone, setActiveDone] = useState(false);
  const [ActiveTrash, setActiveTrash] = useState(false);

  function deleteTodo(id) {
    let itemToDelete = ToDos.find((item) => item.id === id);
    itemToDelete.deleted = "yes";
    setActiveTrash(false);
    setNewTrash([...newTrash, itemToDelete]);
    ActiveToDo
      ? setFiltered([...ToDos].filter((item) => item.deleted === "no"))
      : ActiveDone
      ? setFiltered(
          [...ToDos].filter(
            (item) => item.status === true && item.deleted === "no"
          )
        )
      : setFiltered([...ToDos].filter((item) => item.deleted === "yes"));
    setModalShown(false);
    setNewModalShown(false);
  }

  function restoreTodo(id) {
    let itemToRestore = newTrash.find((item) => item.id === id);
    itemToRestore.deleted = "no";
    let newToDo = [...ToDos.filter((item) => item.id !== id), itemToRestore];
    setTodo(newToDo);
    setToDos(newToDo);
    setNewTrash(newTrash.filter((item) => item.id !== id));
    if (ActiveToDo) {
      setFiltered(newToDo.filter((item) => item.deleted === "no"));
    } else if (ActiveDone) {
      setFiltered(
        newToDo.filter((item) => item.status && item.deleted === "no")
      );
    } else {
      setFiltered(newToDo.filter((item) => item.deleted === "yes"));
    }
    setModalShown(false);
    setNewModalShown(false);
  }

  function deleteFromTrash(id) {
    let newToDo = newTrash.filter((item) => item.id !== id);
    setFiltered(newToDo);
    setNewTrash(newToDo);
    setTodo(ToDos.filter((item) => item.id !== id));
    setToDos(ToDos.filter((item) => item.id !== id));
    setModalShown(false);
    setNewModalShown(false);
  }

  function statusTodo(id) {
    let itemToUpdate = ToDos.find((item) => item.id === id);
    itemToUpdate.status = !itemToUpdate.status;

        // This will sort the items so that items with status === true will be moved down:
    let sortedItems = ToDos.sort((a, b) => (a.status === b.status) ? 0 : a.status ? 1 : -1);

    setTodo(sortedItems);
    setToDos(sortedItems);

    if (ActiveToDo && !ActiveTrash && !ActiveDone) {
    setFiltered(sortedItems.filter((item) => item.deleted === "no"));
    } else if (ActiveDone && !ActiveToDo && !ActiveTrash) {
    setFiltered(sortedItems.filter((item) => item.status === true && item.deleted === "no"));
    } else {
    setFiltered(sortedItems.filter((item) => item.deleted === "yes"));
    }

    setModalShown(false);
    setNewModalShown(false);
    }

  function editTodo(id, task) {
    setEdit(id);
    setValue(task);
    setModalShown(false);
    setNewModalShown(false);
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
    setModalShown(false);
    setNewModalShown(false);
  }

  const [ModalShown, setModalShown] = useState(false);

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
      ActiveToDo
      ? setFiltered([...newTodo].filter((item) => item.deleted === "no"))
      : ActiveDone
      ? setFiltered(
          [...newTodo].filter(
            (item) => item.status === true && item.deleted === "no"
          )
        )
      : setFiltered([...newTodo].filter((item) => item.deleted === "yes"));
    }
    closeModal();
    setModalShown(false);
    setNewModalShown(false);
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

  function todoFilter(filterType) {
    if (filterType === "all") {
      setFiltered([...ToDos].filter((item) => item.deleted === "no"));
      setActiveDone(false);
      setActiveTrash(false);
      setActiveToDo(true);
    } else if (filterType === true) {
      setFiltered(
        [...ToDos].filter(
          (item) => item.status === true && item.deleted === "no"
        )
      );
      setActiveDone(true);
      setActiveTrash(false);
      setActiveToDo(false);
    } else if (filterType === "yes") {
      setFiltered([...ToDos].filter((item) => item.deleted === "yes"));
      setActiveDone(false);
      setActiveTrash(true);
      setActiveToDo(false);
    }
  }

  console.log(todo);

  const selectToDo = () => {
    setActiveToDo(true);
    setActiveDone(false);
    setActiveTrash(false);
  };

  const selectDone = () => {
    setActiveToDo(false);
    setActiveDone(true);
    setActiveTrash(false);
  };

  const selectTrash = () => {
    setActiveToDo(false);
    setActiveDone(false);
    setActiveTrash(true);
  };

  return (
    <div className="bigDiv">
      <div className="div-allButtons">
        <div className="buttonsRight">
          <button
            className="menu-buttons"
            onClick={() => {
              selectToDo();
              todoFilter("all");
            }}
            style={{
              backgroundColor: ActiveToDo
                ? "rgba(8, 30, 52, 0.42)"
                : "rgba(8, 30, 52, 0.05)",
              color: ActiveToDo ? "white" : "",
            }}
          >
            <p className="menu-buttonsText">To Do</p>
          </button>
          <button
            className="menu-buttons"
            onClick={() => {
              selectDone();
              todoFilter(true);
            }}
            style={{
              backgroundColor: ActiveDone
                ? "rgba(8, 30, 52, 0.42)"
                : "rgba(8, 30, 52, 0.05)",
              color: ActiveDone ? "white" : "",
            }}
          >
            <p className="menu-buttonsText">Done</p>
          </button>
          <button
            className="menu-buttons"
            onClick={() => {
              selectTrash();
              todoFilter("yes");
            }}
            style={{
              backgroundColor: ActiveTrash
                ? "rgba(8, 30, 52, 0.42)"
                : "rgba(8, 30, 52, 0.05)",
              color: ActiveTrash ? "white" : "",
            }}
          >
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
      <div>
        {ActiveToDo && <p className="textOnTaskTop">To Do</p>}
        {ActiveDone && <p className="textOnTaskTop">Done</p>}
        {ActiveTrash && <p className="textOnTaskTop">Trash</p>}
        <hr />
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

                  {newModalShown &&
                    selectedItemId === item.id &&
                    item.deleted === "no" && (
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
                  {newModalShown &&
                    TrashItemId === item.id &&
                    item.deleted === "yes" && (
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
