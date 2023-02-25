import React, { useState, useRef, useEffect } from "react";
import InputWithLabel from "./InputWithLabel";
import style from './AddTodoForm.module.css';
import SortingToggle from "./sortingToggle";
import PropTypes from 'prop-types';

const addButton = '➕'

function AddTodoForm({ onAddTodo, todoList, setTodoList, toggleAscDescSorting, setToggleAscDescSorting }) {
  const [todoTitle, setTodoTitle] = useState(''); 
  const [todoNote, setTodoNote] = useState('');
  
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const newTodo = await onAddTodo({Title: todoTitle, Note: todoNote});
    const newTodoList = ([...newTodo.records, ...todoList]);
    newTodoList.sort((objectA, objectB) => {
      if (objectA.fields.Title < objectB.fields.Title) return -1;
      else if (objectA.fields.Title > objectB.fields.Title) return 1;
      else return 0;  
    });
    setTodoList(newTodoList)
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
            isThisrequired={true}
            givenValue={todoTitle} 
            handleChange={(e) => setTodoTitle(e.target.value)} 
            givenId="todoTitle"
            givenName="title"
            focusOnChange='title'
            forPlaceholder="type here..."
            className={style.formStyle}
          >
              Title: 
          </InputWithLabel>
          <button className={style.form_button}>{addButton}</button>
          <InputWithLabel 
            givenValue={todoNote} 
            isThisrequired={false}
            handleChange={(e) => setTodoNote(e.target.value)} 
            givenId="todoNote"
            givenName="noteDescription"
            forPlaceholder="optional notes here..."
            className={style.formStyle}
          >
              Note: 
          </InputWithLabel >
        </form>   

        <SortingToggle 
          todoList={todoList} 
          setTodoList={setTodoList} 
          toggleAscDescSorting={toggleAscDescSorting}
          setToggleAscDescSorting={setToggleAscDescSorting}
        /> 
      </>
    );
};

AddTodoForm.propTypes = {
  onAddTodo: PropTypes.func
}

export default AddTodoForm;