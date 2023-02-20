import React, { useState, useContext, Fragment } from "react";
import style from './TodoListItem.module.css';
import FieldData from "./fieldData";
import PropTypes from 'prop-types';

var remove = '\u2718';

const TodoListItem = ({ todo, onRemoveTodo, onUpdateTodo }) => {
    const fieldData = useContext(FieldData);
    const { todoList, setTodoList } = fieldData;
    // const rowInfo = todoList.find((todoRow) => todoRow.id === todo.id); 
    const [isEditing, setIsEditing] = useState(false); 
    
    const [title, setTitle] = useState('' || todo.fields.Title);  
    const [note, setNote] = useState('' || todo.fields.Note);
    const [completed, setCompleted] = useState(todo.fields.Completed || false);

    const handleUpdate = async (id) => {
        const updatedRowData = await onUpdateTodo({
            id: todo.id,
            fields: {
                Title: title,
                Note: note,
                Completed: completed,
            }
        });
        console.log("what is in updtedRowData: ", todoList)
        // removeUpdatedTodo(todo.id);
        // setTodoList([...updatedRowData.records, ...todoList]); 
        
        // const arr = [];
        // Object.keys(todoList).forEach(key => arr.push({key: key, value: todoList[key]}))
        // console.log("this is listJson", arr)
        setTodoList([...todoList].concat(updatedRowData.records)) //  setTodoList([...todoList].filter(rowInfo).concat(updatedRowData.records)) 
        //how to remove the rowInfo row before updating the page
        setIsEditing(false);
        // console.log("this is newTodoList", updatedRowData);
    }

    // const updatedId = (id) => {
    //     if (todo.id === id) {
    //         handleUpdate(id)
    //     }
    // }
    
    // const handleCheckAirtable = async (e, id) => {
    //     if(!todo.fields.Completed) {
    //         setCompleted(e.target.checked);
    //     }
    //     handleUpdate(id);
    // }

    // if (!rowInfo) return <p>Loading...</p>

    //new key:    key={new Date().getTime()}

    return (
        
        <Fragment>      
                                                            {/* HERE IS THE checkbox:  */}
            <td>
                {isEditing ? (
                    <input 
                        className={style.checkBox} 
                        id="checkbox" 
                        type="checkbox" 
                        checked={completed} 
                        onChange={() => setCompleted(!completed)}
                    />
                    ) 
                    : ( 
                        <p>{todo.fields.Completed ? '\u2705' : '\u3192'}</p>
                    )
                    } 
            </td>
                                                                    {/* HERE IS THE TITLE:  */}
            <td className={style.todoListItem}>
                {isEditing ? (
                    <input 
                        id='todoTitle'
                        type="text" 
                        name='todoTitle' 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                    /> 
                ) : (
                    todo.fields.Title
                )}
            </td>
                                                                    {/* HERE IS THE NOTE:  */}
            <td className={style.todoListItem}>
                {isEditing ? (
                    <input 
                        id='todoNote'
                        type="text" 
                        name='todoNote' 
                        value={note} 
                        onChange={(e) => setNote(e.target.value)} 
                    /> 
                ) : (
                    todo.fields.Note
                )}
            </td>
                                                                    {/* HERE are 3 buttons:  */}
            <td>
                {isEditing ? (
                    <button 
                        className={style.editButton} 
                        type="button" 
                        onClick={() => handleUpdate(todo.id)}
                    >
                        Done
                    </button>
                ) : (
                    <button 
                        className={style.editButton} 
                        type="button"
                        onClick={() => setIsEditing(true)} 
                    >
                        Edit
                    </button>
                )}
            </td>
            <td>
                <button 
                    className={style.buttons} 
                    type="button" 
                    onClick={() => onRemoveTodo(todo.id)}
                >
                    {remove}
                </button>
            </td>
        </Fragment>
    );
};

TodoListItem.propTypes = {
    todo: PropTypes.object, 
    onRemoveTodo: PropTypes.func, 
    onUpdateTodo: PropTypes.func
}
    
export default TodoListItem;