import React, { useState, useContext } from "react";
import style from './TodoListItem.module.css';
import FieldData from "./fieldData";
import PropTypes from 'prop-types';

var remove = '\u2718';

const TodoListItem = ({ todo, onRemoveTodo, onUpdateTodo }) => {
    const fieldData = useContext(FieldData);
    const { todoList, setTodoList } = fieldData;

    console.log("this is fieldData ", fieldData)
    const rowInfo = todoList.find((todoRow) => todoRow.id === todo.id); 
    const [isEditing, setIsEditing] = useState(false);
    console.log('this is in todoList: ', todo);

    const [title, setTitle] = useState('');
    const [note, setNote] = useState('');
    // const [completed, setCompleted] = useState(false);

    const handleUpdate = async (title, note, completed) => {
        console.log("todo is: ", todo)
        const updatedRowData = await onUpdateTodo({
            id: todo.id,
            fields: {
                title,
                note,
                completed,
            }
        });
        console.log("updatedRowData", updatedRowData)
        setTodoList([...updatedRowData.records, ...todoList])
    }

    if (!rowInfo) return <p>Loading...</p>

    const handleTextUpdate = (e) => {
        setTitle(e.target.value);
    }

    const handleNoteUpdate = (e) => {
        setNote(e.target.value);
    }

    console.log('title is: ', title)
    return (
        
        <>
        {/* {console.log('this is rowInfo', rowInfo.records.fields.Title)} */}
        
        {/* <th> {rowInfo.fields.title}</th> */}
    
        {/* <p>{rowInfo.fields.note}</p> */}
        
            {/* {isEditing ? ( */}
                <td><input 
                    className={style.checkBox} 
                    id="checkbox" 
                    type="checkbox" 
                    checked={todo.completed} 
                    // onChange={onUpdateTodo}
                /></td>
                {/* ) : ( */}
                    {/* todo.completed || todo.fields.Checked */}
                {/* )} */}
            <td className={style.todoListItem}>
                {isEditing ? (
                    <input 
                    id='todoTitle'
                    type="text" 
                    name='todoTitle' 
                    value={title} 
                    // defaultValue={todo.title}
                    onChange={handleTextUpdate} 
                /> 
                ) : (
                    todo.title || todo.fields.Title
                )}
            </td>
            <td className={style.todoListItem}>
                {isEditing ? (
                    <input 
                    id='todoNote'
                    type="text" 
                    name='todoNote' 
                    value={note} 
                    onChange={handleNoteUpdate} 
                /> 
                ) : (
                    todo.note || todo.fields.Note
                )}
            </td>
            <td>
                {isEditing ? (
                    <button 
                        className={style.editButton} 
                        type="button" 
                        onClick={() => handleUpdate()}
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
        </>
    );
};

TodoListItem.propTypes = {
    todo: PropTypes.object, 
    onRemoveTodo: PropTypes.func, 
    onUpdateTodo: PropTypes.func
}
    
export default TodoListItem;