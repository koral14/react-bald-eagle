import React, { useState, useRef, useEffect } from "react";
import InputWithLabel from "./InputWithLabel";
import style from './AddTodoForm.module.css';

function AddTodoForm({ onAddTodo }) {
  const [todoTitle, setTodoTitle] = useState(''); 
  const [todoNote, setTodoNote] = useState(''); 

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTodoTitle(newTitle);
  }

  const handleNoteChange = (e) => {
    const newNote = e.target.value;
    setTodoNote(newNote);
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    onAddTodo({ title: todoTitle, note: todoNote, id: Date.now() });
    setTodoTitle('');
    setTodoNote('');
  }

  const inputRefTitle = useRef(null);

    useEffect(() => {
        if (inputRefTitle.current) {
            inputRefTitle.current.focus();
        }
    }, []);

    return (
        <form onSubmit={handleFormSubmit} className={style.formStyle}>
            <InputWithLabel 
              ref={inputRefTitle}
              givenValue={todoTitle} 
              handleChange={handleTitleChange} 
              givenId="todoTitle"
              givenName="title"
              // focusOnChange='title'
            >
                Title: 
            </InputWithLabel>
            <InputWithLabel 
              givenValue={todoNote} 
              handleChange={handleNoteChange} 
              givenId="todoNote"
              givenName="noteDescription"
              // focusOnChange='title'
            >
                Note: 
            </InputWithLabel>
            <button>Add</button>
        </form>
    );
};

export default AddTodoForm;