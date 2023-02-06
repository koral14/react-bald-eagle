import React, { useState, useEffect } from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';

function App() {
  const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Default`

  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  console.log(todoList);

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
      },
    };
    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        const todos = data.records.map((item) => ({
          id: item.id,
          title: item.fields.Title,
          note: item.fields.Note,
        }));
        setTodoList(...todoList, todos);
        setIsLoading(false);
      });
  }, []);

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
        setTodoList([...todoList, todo]);
      });
  }
    
  const deleteTableData = async (id) => {
    const res = await fetch(
      `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Default/${id}`,
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
    
  const updateTodo = (todo, callback = function () {console.log('updated')}) => {
      const body = {
        records: [
          {
            id: todo.id,
            fields: {
              Title: todo.title,
              Note: todo.note,
            },
          },
        ],
      };
      const options = {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      };
      fetch(url, options)
        .then((response) => response.json())
        .then((data) => {
          const updatedTodo = {
            // id: data.records.id,
            fields: {
              title: data.records.fields.Title,
              Note: data.fields.Note,
            }
          };
          setIsLoading(updatedTodo);
        })
    }

  const appsSubComponent = () => {
    return (
      <div className='app__wrapper'>
            <img src="https://cdn.pixabay.com/photo/2020/01/21/18/39/todo-4783676_960_720.png" alt='list'/>
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
              />
            )
            }
          </div>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' exact element={appsSubComponent()} />
        <Route path='/new' exact element={<h1>New Todo List</h1>} />
      </Routes>  
    </BrowserRouter>
  );
}

export default App;
