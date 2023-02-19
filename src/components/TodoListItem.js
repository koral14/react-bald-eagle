import React, { useState, useContext } from "react";
import style from './TodoListItem.module.css';
import FieldData from "./fieldData";
import PropTypes from 'prop-types';

var remove = '\u2718';

/*
Roy: `todo` should already contain the information used to render the todo. Use context is not needed.
*/

const TodoListItem = ({ todo, onRemoveTodo, onUpdateTodo, defaultTitle="" }) => {
    const fieldData = useContext(FieldData);
    const { todoList, setTodoList } = fieldData;
    const rowInfo = todoList.find((todoRow) => todoRow.id === todo.id); 
    const [isEditing, setIsEditing] = useState(false); 
    
    const [title, setTitle] = useState(defaultTitle);  // why it doesn't work to keep the previous value while edited??
    const [note, setNote] = useState('');
    const [completed, setCompleted] = useState(false);


/*
    Roy: Make sure that you are taking full advantage of React props and callbacks to minimize the amount of logic that you are introducing to the list item. Each list item should only be concerned about its own role in the application. I am seeing logic here that works with the full list. Any work on the full list should be done at TodoList or better, its parent component, TodoContainer. Remember that the changes there are passed back down to its descendent components.
*/
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
        setTodoList([...updatedRowData.records, ...todoList]) //Roy: list items should not work with the list
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

    /*
    Roy: same as in TodoList, convert this into a list item.
    */

   /*
    Roy:
    Also, I see `isEditing` 3 times, and in each you are using similar inputs. You also seem to be repeating a lot of code which should set off alarms that there is a need to refactor. It may be easier to reason with your JSX if you break it into discrete components and use only a single ternary; one component shows of `isEditing` is true and the other when `isEditing` is false
    */
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