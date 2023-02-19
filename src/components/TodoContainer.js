import React, { useState, useEffect }  from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';
import './TodoContainer.css';
import FieldData from './fieldData';
import PropTypes from 'prop-types';

const TodoContainer = ({ tableName }) => {
    const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${tableName}`

    const [todoList, setTodoList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchTableData = async () => {
        const response = await fetch(`https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${tableName}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
        },
        });
        const data = await response.json();
        setTodoList(data.records);
        setIsLoading(false);

        data.records.sort((a, b) => {
            return b.createdTime.localeCompare(a.createdTime);
        })
    }

    //Roy: are you expecting the tableName to change? If not and you are only running useEffect on mount, have an empty dependency array
    useEffect(() => {
        fetchTableData();   
    }, [tableName]);

    useEffect(() => {
        if(!isLoading) {
        localStorage.setItem('savedTodoList', JSON.stringify(todoList));
        }
    }, [todoList, isLoading]);

    /*
    Roy: should this be async as well? Also, the name suggests that you are loading a full table's worth of data and not a single todo.
    If it were named `addTodo` it would better match in with `removeTodo` and `updateTodo` as they are pretty similar in scope of their behavior.
    */
    const addTableData = (newRow) => {
        const body = {
        fields: {
            Title: newRow.title,
            Note: newRow.note,
            Completed: newRow.completed,
        },
        };
        const options = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        };
        const todo = {};
        fetch(url, options)
        .then((response) => response.json())
        .then((data) => {
            todo.id = data.id;
            todo.title = data.fields.Title;
            todo.note = data.fields.Note;
            todo.completed = data.fields.Completed;
            setTodoList([...todoList, todo]);
        });
    }
    
    //Roy: you could probably combine this with removeTodo unless you are going to be using this function elsewhere. More explanation in fieldData.js
    const deleteTableData = async (id) => {
        const res = await fetch(
        `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${tableName}/${id}`,
        {
            method: 'DELETE',
            headers: {
            Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
            "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        return data;
    };

    const removeTodo = async (id) => {
        await deleteTableData(id);
        const newTodoList = todoList.filter(
        (todo) => todo.id !== id
        );
        setTodoList(newTodoList);
    };
        
    const updateTodo = async (editedRow) => {
        console.log("editedRow is: ", editedRow)
        const res = await fetch(
            `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${tableName}`,
            {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    records: [
                        editedRow,
                    ],
                }),
            }
        );
        const data = await res.json();
        return data;
      };

    /*
    Roy: all of this should be in the TodoContainer's jsx. You've inadvertently created a new component within a component. 
    The `<div className='app__wrapper'>` and its contents can go into the return statement for TodoContainer. This will save 
    approx 6 lines of code and make your application easier to read about.
    */
    /*
    Roy: You should not be using createContext. More info in fieldData.js.
    */
    const ContainersSubComponent = () => {
        
        return (
            <FieldData.Provider value={{todoList, setTodoList}}>
                <div className='app__wrapper'>
                    {/* <img src="https://cdn.pixabay.com/photo/2020/01/21/18/39/todo-4783676_960_720.png" alt='list'/> */}
                    <h1 className='item1'>{tableName}</h1>
                    <div className='add__form__container'>
                        <AddTodoForm onAddTodo={addTableData}/> 
                    </div>
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        <TodoList 
                            todoList={todoList} 
                            onRemoveTodo={removeTodo} 
                            onUpdateTodo={updateTodo}
                            setTodoList={setTodoList}
                        />
                    )}
                </div>
            </FieldData.Provider>
        )
    }
    return (
        <>
            <ContainersSubComponent tableName={tableName} />
        </>
    )
}

TodoContainer.propTypes = {
    tableName: PropTypes.string,
}

export default TodoContainer;