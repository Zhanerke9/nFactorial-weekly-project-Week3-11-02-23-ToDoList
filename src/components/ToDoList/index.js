import React, { useState } from "react";
import Modal from "../Modals";
import { v4 as uuidv4 } from "uuid";
import "../Menu/menu.css";
import ButtonsModal from "../Modals/buttons";
import TrashModal from "../Modals/trash";
import threeDots from "../../images/Vector.png";
import { faSave, } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'// <-- import styles to be used
import { FaCheckSquare, FaRegSquare } from "react-icons/fa";


export default function ToDoList({ todo, setTodo }) {
  const [edit, setEdit] = useState(null);
  const [value, setValue] = useState("");
  const [newTrash, setNewTrash] = useState([]);
  const [inTrash, setInTrash] = useState(false);
  const [showTrashModal, setShowTrashModal] = useState(false);

  // permanent delete
  // function deleteTodo(id) {
  //   //console.log("delete");
  //   let newToDo = [...todo].filter((item) => item.id !== id);
  //   setTodo(newToDo);
  // }

  // // to remove item from the To Do and DONE
  // function deleteTodo(id) {
  //   let newToDo = [...todo].filter((item) => {
  //     if (item.id === id) {
  //       item.deleted = true;
  //       setNewTrash([...newTrash, item]);
  //     }
  //     return !item.deleted;
  //   });
  //   setFiltered(newToDo);
  // }

  // function deleteTodo(id) {
  //   let itemToDelete = todo.find((item) => item.id === id);
  //   if (itemToDelete.deleted === true) {
  //     setInTrash(true);
  //   } else {
  //     let newToDo = [...todo].filter((item) => {
  //       if (item.id === id) {
  //         item.deleted = true;
  //         setNewTrash([...newTrash, item]);
  //       }
  //       return !item.deleted;
  //     }); // set the state of the "todo" array with the filtered array
  //     setFiltered(newToDo);
  //   }
  // }

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
        return !item.deleted;
      });
      setFiltered(newToDo);
    }
  }


  // function restoreTodo(id) {
  //   let itemToRestore = newTrash.find((item) => item.id === id);
  //   let newToDo = [...todo];
  //   newToDo.splice(itemToRestore.status ? todo.length : 0, 0, itemToRestore);
  //   setTodo(newToDo);
  //   setNewTrash(newTrash.filter((item) => item.id !== id));
  //   setInTrash(false);
  // }

  // function deleteFromTrash(id) {
  //   setNewTrash(newTrash.filter((item) => item.id !== id));
  // }

//   function restoreTodo (id) {
// let itemToRestore = newTrash.find((item) => item.id === id);
// let newToDo = [...todo];
// newToDo.push(itemToRestore);
// setTodo (newToDo);
// setNewTrash(newTrash.filter((item) => item.id !== id));
// setInTrash(false);
// }

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
        { task: todo, id: uuidv4(), status: false, deleted: false },
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

  // const showButtonsModal = () => {
  //   setNewModalShown(!newModalShown);
  // };

  // const closeNewModal = () => {
  //   setNewModalShown(false);
  // };

  const [selectedItemId, setSelectedItemId] = useState(null);
  // function showButtonsModal(id) {
  //   setSelectedItemId(id);
  //   const item = todo.find((item) => item.id === id);
  //   if (item.deleted === true) {
  //     setInTrash(true);
  //   } else {
  //     setInTrash(false);
  //     setNewModalShown(!newModalShown);
  //   }
  // }

  // function closeButtonsModal() {
  //   setShowTrashModal(false);
  //   setNewModalShown(false);
  // }

  function showButtonsModal(id) {
    setSelectedItemId(id);
    setNewModalShown(!newModalShown);
  }

  function closeButtonsModal() {
    setSelectedItemId(null);
    setNewModalShown(false);
  }



  function todoFilter(status, deleted) {
    if (status === "all") {
      setFiltered(todo.filter((item) => !item.deleted));
    } else if (status === true) {
      setFiltered(todo.filter((item) => item.status && !item.deleted));
    } else if (deleted === true) {
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
          {/* </form> */}
        </div>
      </div>

      {filtered.map((item) => (
        <div key={item.id} className="ListOfTasks">
          <div className="tasksWithButtonsModals">
          {edit === item.id ? (
              <div>
                <button onClick={() => saveTodo(item.id)} className="taskButtonsStyle"><FontAwesomeIcon icon={faSave} /></button>
              </div>
            ) : (
              <div className="TaskButtonsToModals">
                <>
                {!inTrash && <button onClick={()=>showButtonsModal(item.id)}>
                    <img src={threeDots} alt="buttons" />
                  </button> }

                  {
                    selectedItemId === item.id && (
                      < ButtonsModal  item={item}
                      deleteTodo={deleteTodo}
                      editTodo={editTodo}
                      statusTodo={statusTodo}
                      closeNewModal={closeButtonsModal}
                      inTrash = {inTrash}/>
                      // restoreTodo={restoreTodo}
                      // deleteFromTrash={deleteFromTrash}/>
                      // <div className="newModal">
                      //   <button onClick={() => deleteTodo(item.id)}>
                      //     <FontAwesomeIcon icon={faTrash} />
                      //   </button>
                      //   <button onClick={() => editTodo(item.id, item.task)}>
                      //     <FontAwesomeIcon icon={faEdit} />
                      //   </button>
                      //   <button onClick={closeNewModal}>Close</button>
                      // </div>
                    )
                  }
                </>
                <div className="TaskButtonsToModals">
                  {/* <button onClick={() => deleteTodo(item.id)}><FontAwesomeIcon icon={faTrash} /></button>
                  <button onClick={() => editTodo(item.id, item.task)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button> */}
                  { (item.deleted === false) && (
                  <button onClick={() => statusTodo(item.id)} className="taskButtonsStyle">

                  {item.status === false ? (<FaRegSquare />) :  <FaCheckSquare />}
                  </button>)
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
              <div>{item.task}</div>
            )}

          </div>
        </div>
      ))}
    </div>
  );
}
