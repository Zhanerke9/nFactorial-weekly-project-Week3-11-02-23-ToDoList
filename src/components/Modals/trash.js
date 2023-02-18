import React from "react";
import { useEffect, useRef } from "react";
import {faTrash, faWindowRestore} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './style.css'

export default function TrashModal({item, restoreTodo, deleteFromTrash, closeTrashModal }) {

    const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeTrashModal();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef, closeTrashModal]);

    return (
    <div ref={modalRef} className="TrashModalButtons">
      <button onClick={()=>deleteFromTrash(item.id)} className="trashButtonStyle"><FontAwesomeIcon icon={faTrash} /><p>Delete Forever</p></button>
      <button onClick={()=>restoreTodo(item.id)} className="trashButtonStyle" ><FontAwesomeIcon icon={faWindowRestore} /><p>Move Back to To Do</p></button>
    </div>
  );
}
