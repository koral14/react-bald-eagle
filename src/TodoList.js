import * as React from 'react';
import TodoListItem from './TodoListItem';
import './TodoList.css';
  
var checkmark = '\u2714';
var remove = '\u2718';
var edit = '\u2607'

const TodoList = ({ todoList, onRemoveTodo, onUpdateTodo }) => {  
  return (
    <>
      <table>
        <tbody>
          <tr className='column_headers'>
            <th>{checkmark}</th>
            <th>Title</th>
            <th>Notes</th>
            <th>{edit}</th>
            <th>{remove}</th>
          </tr>
          {todoList.map(function(todo) {
            return (
              <tr key={todo.id}>
                <TodoListItem 
                  todo={todo} 
                  onRemoveTodo={onRemoveTodo}
                  onUpdateTodo={onUpdateTodo}
                />
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  );
};
export default TodoList;