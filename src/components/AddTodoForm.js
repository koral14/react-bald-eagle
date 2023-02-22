import React, { useState, useRef, useEffect, Children } from "react";
import InputWithLabel from "./InputWithLabel";
import style from './AddTodoForm.module.css';
import PropTypes from 'prop-types';

function AddTodoForm({ onAddTodo, todoList, setTodoList }) {
  const [todoTitle, setTodoTitle] = useState(''); 
  const [todoNote, setTodoNote] = useState('');
  const [toggleAscDescSorting, setToggleAscDescSorting] = useState(false);

  const handleDescending = () => {
    console.log('this is descending', toggleAscDescSorting)
    const listToBeSorted = ([...todoList]);
    listToBeSorted.sort((a, b) => {
      return b.createdTime.localeCompare(a.createdTime); 
    });
    setTodoList(listToBeSorted);
    setToggleAscDescSorting(true);
    console.log('this is descending2', toggleAscDescSorting)
  }

  const handleAscending = () => {
    
    console.log("this is ascending", toggleAscDescSorting)
    const listToBeSorted = ([...todoList]);
    console.log('list to be sorted: ', listToBeSorted)
    listToBeSorted.sort((a, b) => {
      return a.createdTime.localeCompare(b.createdTime);  
    });
    setTodoList(listToBeSorted);
    setToggleAscDescSorting(false);
  }

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
            <button className={style.form_button}>Add</button>
        </form>
        {/* still working on this button to set it to reverse sorting */}
        <div>
          <label>Sorted by created time:</label> 
          {toggleAscDescSorting ? (
            <button onClick={handleDescending}>Descending</button>
          ) : (
            <button onClick={handleAscending}>Ascending</button>
          )
          }
        </div>
        {Children === 'Ascending' ? (
          <button onClick={handleDescending}>Descending</button>
        ) : (
          <button onClick={handleAscending}>Ascending</button>
        )
        }
        
        
      </>
    );
};

AddTodoForm.propTypes = {
  onAddTodo: PropTypes.func
}

export default AddTodoForm;