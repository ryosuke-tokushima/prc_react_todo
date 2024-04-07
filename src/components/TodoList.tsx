import React, { useState } from 'react'
import "./TodoList.style.css";
import { ITodo } from './Todo.type';
import "./TodoList.style.css";
import TodoModal from './TodoModal';

type Props = {
  list: ITodo[];
  onDeleteClickHnd: (data: ITodo) => void
  onEditClickHnd: (data: ITodo) => void
};

const TodoList = (props: Props) => {
  const { list, onDeleteClickHnd, onEditClickHnd} = props;
  const [showModal, setShowModal] = useState(false);
  const [dataToShow, setdataToShow] = useState(null as ITodo | null );


  const viewTodo = (data: ITodo) => {
    setdataToShow(data)
    setShowModal(true)
  }

  const onCloseModal = () => {
    setShowModal(false)
  };

  return (
    <div>
      <article>
        <h3 className='list-header'>TodoList</h3>
      </article>
      
        <table>
        <tr>
            <th>Todo Title</th>
            <th>Todo Description</th>
            <th>Country</th>
        </tr>
        {list.map(todo => {
            console.log(todo)
            return (
              <tr key={todo.id}>
                <td>{ `${todo.title}`}</td>
                <td>{`${todo.description}`}</td>
                <td>
                    <div>
                        <input type='button' value='View' onClick={() => viewTodo(todo)}></input>
                        <input type='button' value='Edit' onClick={() => onEditClickHnd(todo)}></input>
                        <input type='button' value='Delete' onClick={() => onDeleteClickHnd(todo)}></input>
                    </div>
                </td>
              </tr>
            );
        })}
       </table>
       {showModal && dataToShow !== null &&  (
         <TodoModal onClose={onCloseModal} data={dataToShow} />
         )}
    </div>
  );
};

export default TodoList