import React, { useRef, useEffect } from "react";
import "./style.css";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //

const ButtonsModal = ({
  item,
  deleteTodo,
  editTodo,
  closeNewModal
}) => {
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

  return (
    <div className="TrashModalButtons" ref={modalRef}>
      <button
        onClick={() => editTodo(item.id, item.task)}
        className="trashButtonStyle"
      >
        <FontAwesomeIcon icon={faEdit} />
        <p>Edit</p>
      </button>
      <button onClick={() => deleteTodo(item.id)} className="trashButtonStyle">
        <FontAwesomeIcon icon={faTrash} />
        <p>Move to Trash</p>
      </button>
    </div>
  );
};

export default ButtonsModal;
