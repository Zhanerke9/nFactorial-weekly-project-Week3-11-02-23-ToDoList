import React, { useState, useRef, useEffect } from "react";
import "./style.css";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'//
import TrashModal from "./trash";
import threeDots from "../../images/Vector.png";

const ButtonsModal = ( {item, deleteTodo, editTodo, statusTodo, closeNewModal, inTrash }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeNewModal();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef, closeNewModal]);

//   return (
//     <div className="newModal">
//                         <button onClick={() => deleteTodo(item.id)}>
//                           <FontAwesomeIcon icon={faTrash} />
//                         </button>
//                         <button onClick={() => editTodo(item.id, item.task)}>
//                           <FontAwesomeIcon icon={faEdit} />
//                         </button>
//                         <button onClick={closeNewModal}>Close</button>
//                       </div>)
// };

// const [trashModal, setTrashModal] = useState(false);

  // const showButtonsModal = () => {
  //   setNewModalShown(!newModalShown);
  // };

  // const closeNewModal = () => {
  //   setNewModalShown(false);
  // };
  const [newTrash, setNewTrash] = useState([])

    function restoreTodo(id) {
    let itemToRestore = newTrash.find((item) => item.id === id);
    let newToDo = [...item];
    newToDo.splice(itemToRestore.status ? item.length : 0, 0, itemToRestore);
    setNewTrash(newTrash.filter((item) => item.id !== id));
  }

  // function deleteFromTrash(id) {
  //   setNewTrash(newTrash.filter((item) => item.id !== id));
  // }

  const [newModalShown, setNewModalShown] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  function showTrashModal(id) {
    setSelectedItemId(id);
    setNewModalShown(!newModalShown);
  }

  function closeTrashModal() {
    setSelectedItemId(null);
    setNewModalShown(false);
  }


return (
  <div className="buttonsModal" ref={modalRef}>
    { item.deleted ==="yes"?
    (<>
    <button onClick={() => showTrashModal(item.id)} className="threedotsStyle">
    <img src={threeDots} alt="buttons"/>
    </button>
    <>
      {selectedItemId === item.id && (
            <TrashModal
              restoreTodo={() => restoreTodo(item.id)}
              closeTrashModal={closeTrashModal}
              item={item.id}
            />
          )}
          </>
    </>) :
    (<>
    <button onClick={() => editTodo(item.id, item.task)} className="buttonsModalStyle">
    <FontAwesomeIcon icon={faEdit} />
    <p>Edit</p>
  </button>
  <button onClick={() => deleteTodo(item.id)} className="buttonsModalStyle">
    <FontAwesomeIcon icon={faTrash} />
    <p>Move to Trash</p>
  </button>
  </>)

  }
  </div>
);
    }

export default ButtonsModal;
