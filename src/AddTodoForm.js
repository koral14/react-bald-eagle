import React, { useState, useEffect, useRef } from "react";
import InputWithLabel from "./InputWithLabel";
import style from './AddTodoForm.module.css';

function AddTodoForm({ onAddTodo, todoList, setTodoList }) {
    const [todoTitle, setTodoTitle] = useState('');
    const [todoNote, setTodoNote] = useState(''); 

    const [toggleAscendingDescending, setToggleAscendingDescending] = useState(false);

    const handleDescending = () => {
      console.log('yes', toggleAscendingDescending);
      setToggleAscendingDescending(true);
    }
    
    const handleAscending = () => {
      console.log('no', toggleAscendingDescending);
      setToggleAscendingDescending(false);
    }

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
      const newTodo = await onAddTodo({ Title: todoTitle, Note: todoNote });
      setTodoList([...newTodo.records, ...todoList]);
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
      <>
      <form onSubmit={handleFormSubmit} className={style.formStyle}>
        <InputWithLabel 
          refTitleBox={inputRefTitle}
          givenValue={todoTitle} 
          handleChange={handleTitleChange} 
          givenId="todoTitle"
          givenName="title"
          focusOnChange='title'
          required={true}
          className={style.formStyle1}
        >
            Title: 
        </InputWithLabel>
        <InputWithLabel 
          givenValue={todoNote} 
          handleChange={handleNoteChange} 
          givenId="todoNote"
          givenName="noteDescription"
          required={false}
          className={style.formStyle2}
        >
            Note: 
        </InputWithLabel >
        <button className={style.form_button}>Add</button>
      </form>

        <div>
            <label>Sorted by created time:</label> 
            {toggleAscendingDescending ? (
              <button onClick={handleAscending}>Descending</button>
            ) : (
              <button onClick={handleDescending}>Ascending</button>
            )
            }
        </div>
      </>
    );
};

export default AddTodoForm;