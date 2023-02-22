import React, { useState, useRef, useEffect } from "react";
import "./style.css";

const Modal = (props) => {
  const [input, setInput] = useState("");
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        props.onModalClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef, props]);

  const onInputChange = (e) => {
    setInput(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    props.onFormSubmit(input);
    setInput("");
  };

  return (
    <div ref={modalRef} className="modalStyle">
      <p style={{ margin: 0, fontFamily: 'Inter', fontWeight: 'bold', fontSize: 16 }}>Add New To Do</p>
      <form className="formInput" onSubmit={onSubmit}>
        <textarea
          className="ModalInputStyle"
          type="text"
          placeholder="Your text"
          value={input}
          onChange={onInputChange}
        />
        <button className="toAddButton"
          type="submit"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default Modal;
