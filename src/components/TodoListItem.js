import React, { useState, useContext } from "react";
import style from './TodoListItem.module.css';
import FieldData from "./fieldData";
import PropTypes from 'prop-types';

var remove = '\u2718';

const TodoListItem = ({ todo, onRemoveTodo, onUpdateTodo, defaultTitle="" }) => {
    const fieldData = useContext(FieldData);
    const { todoList, setTodoList } = fieldData;
    const rowInfo = todoList.find((todoRow) => todoRow.id === todo.id); 
    const [isEditing, setIsEditing] = useState(false); 
    
    const [title, setTitle] = useState(defaultTitle);  // why it doesn't work to keep the previous value while edited??
    const [note, setNote] = useState('');
    const [completed, setCompleted] = useState(false);

    const handleUpdate = async (e) => {
        e.preventDefault();
        const updatedRowData = await onUpdateTodo({
            id: todo.id,
            fields: {
                Title: title,
                Note: note,
                Completed: completed,
            }
        });
        setTodoList([...updatedRowData.records, ...todoList])
        setIsEditing(false);
        // setTitle('');
        // setNote('');
    }

    const handleCheckbox = () => {
        if (completed) {
            setCompleted(!completed)
        } else {
            setCompleted(false);
        }
        
    }

    // const ifCheckedInAirtable = todo.fields.Completed;
    
    const handleCheckAirtable = () => {
        if(todo.fields.Completed) {
            setCompleted(true);
        } else {
            setCompleted(false);
        }
    }

    if (!rowInfo) return <p>Loading...</p>

    return (
        
        <>      
                                                                    {/* HERE IS THE checkbox:  */}
                <td>
                    {isEditing ? (
                        <input 
                            className={style.checkBox} 
                            id="checkbox" 
                            type="checkbox" 
                            checked={completed} 
                            // onChange={() => onUpdateTodo()}
                            onChange={handleCheckbox}
                        />
                        ) : ( 
                            <input 
                                type="checkbox" 
                                checked={todo.fields.Completed} 
                                onChange={handleCheckAirtable} 
                            /> || <input 
                                type="checkbox" 
                                checked={completed} 
                                onChange={(e) => setCompleted(!completed)} 
                            /> 
                        )} 
                </td>
                                                                        {/* HERE IS THE TITLE:  */}
                <td className={style.todoListItem}>
                    {isEditing ? (
                        <input 
                            id='todoTitle'
                            type="text" 
                            name='todoTitle' 
                            // placeholder={rowInfo.fields.Title}
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                        /> 
                    ) : (
                        rowInfo.title || todo.fields.Title
                    )}
                </td>
                                                                        {/* HERE IS THE NOTE:  */}
                <td className={style.todoListItem}>
                    {isEditing ? (
                        <input 
                            id='todoNote'
                            type="text" 
                            name='todoNote' 
                            // placeholder={rowInfo.fields.Note}
                            value={note} 
                            onChange={(e) => setNote(e.target.value)} 
                        /> 
                    ) : (
                        rowInfo.note || todo.fields.Note
                    )}
                </td>
                                                                        {/* HERE are 3 buttons:  */}
                <td>
                    {isEditing ? (
                        <button 
                            className={style.editButton} 
                            type="button" 
                            onClick={(e) => handleUpdate(e)}
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