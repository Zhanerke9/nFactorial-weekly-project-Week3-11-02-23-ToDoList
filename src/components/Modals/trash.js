// import React from "react";
// import "./style.css";

// const TrashModal = ({ selectedTodo, restoreTodo, deleteTodo }) => {
//     return (
//     <div>
//     <p>Are you sure you want to delete this task?</p>
//     <button onClick={() => restoreTodo(selectedTodo)}>Restore</button>
//     <button onClick={() => deleteTodo(selectedTodo)}>Delete Permanently</button>
//     </div>
//     );
//     };

//     export default TrashModal;


import React from "react";
import { useEffect, useRef } from "react";

// export default function TrashModal({ item, restoreTodo, deleteFromTrash }) {

//     return (
//         <div className="trashModal">
//           <button onClick={() => restoreTodo(item.id)} className="taskButtonsStyle">
//             Restore
//           </button>
//           <button onClick={() => deleteFromTrash(item.id)} className="taskButtonsStyle">
//             Delete permanently
//           </button>
//         </div>
//       );
// }

export default function TrashModal({item, restoreTodo, deleteFromTrash, closeTrashModal, inTrash, deleteTodo }) {

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
    <div ref={modalRef}>
      <button onClick={()=>restoreTodo(item.id)}>Restore</button>
      <button onClick={()=>deleteTodo(item.id)}>Delete Permanently</button>
      {/* <button onClick={closeTrashModal}>Cancel</button> */}
    </div>
  );
}
