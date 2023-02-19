import * as React from 'react';
import TodoListItem from './TodoListItem';
import './TodoList.css';
import PropTypes from 'prop-types';
  
//Roy: remove unused variables
var checkmark = '\u2714';
var remove = '\u2718';
var edit = '\u2607'

/*
Roy:
Tables are only used to show tabular data (think MS Excel). Using a table for layout purposes was popular in the late 1990's and early 2000's but is now a discouraged practice. In the case of your todo list, it would be better to stick to an unordered list. If you're desire is to have all the elements across each todo entry be aligned, look into CSS Grid.
*/

const TodoList = ({ todoList, onRemoveTodo, onUpdateTodo }) => {
  console.log(todoList)  
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
                  defaultTitle={todo.title}
                />
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  );
};

TodoList.propTypes = {
  todoList: PropTypes.array, 
  onRemoveTodo: PropTypes.func, 
  onUpdateTodo: PropTypes.func
}

export default TodoList;