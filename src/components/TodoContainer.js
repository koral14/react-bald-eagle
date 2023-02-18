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

    useEffect(() => {
        fetchTableData();   
    }, [tableName]);

    useEffect(() => {
        if(!isLoading) {
        localStorage.setItem('savedTodoList', JSON.stringify(todoList));
        }
    }, [todoList, isLoading]);

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
    
    const ContainersSubComponent = () => {
        return (
            <FieldData.Provider value={{todoList, setTodoList}}>
                <h1 className='item1'>{tableName}</h1>
                <div className='add__form__container'>
                    <AddTodoForm onAddTodo={addTableData}/> 
                </div>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <div className='todoList__wrapper'>
                        <TodoList 
                            todoList={todoList} 
                            onRemoveTodo={removeTodo} 
                            onUpdateTodo={updateTodo}
                            setTodoList={setTodoList}
                        />
                    </div>  
                )}
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