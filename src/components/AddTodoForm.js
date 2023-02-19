import React, { useState, useRef, useEffect } from "react";
import InputWithLabel from "./InputWithLabel";
import style from './AddTodoForm.module.css';
import PropTypes from 'prop-types';

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

  // Roy: no reason for this to be async
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    await onAddTodo({ title: todoTitle, note: todoNote, id: Date.now() });
    setTodoTitle('');
    setTodoNote('');
  }

  const inputRefTitle = useRef(null);

    useEffect(() => {
        if (inputRefTitle.current) {
            inputRefTitle.current.focus();
        }
    }, [todoTitle]);

    return (
        <form onSubmit={handleFormSubmit} className={style.formStyle}>
            <InputWithLabel 
              refTitleBox={inputRefTitle}
              givenValue={todoTitle} 
              handleChange={handleTitleChange} 
              givenId="todoTitle"
              givenName="title"
              focusOnChange='title'
              className={style.formStyle1}
            >
                Title: 
            </InputWithLabel>
            <InputWithLabel 
              givenValue={todoNote} 
              handleChange={handleNoteChange} 
              givenId="todoNote"
              givenName="noteDescription"
              className={style.formStyle2}
            >
                Note: 
            </InputWithLabel >
            <input type="checkbox" />
            <button className={style.form_button}>Add</button>
        </form>
    );
};

AddTodoForm.propTypes = {
  onAddTodo: PropTypes.func
}

export default AddTodoForm;