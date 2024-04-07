import React from 'react'
import './TodoModal.style.css';
import { ITodo } from './Todo.type';

type Props = {
  onClose: () => void
  data: ITodo
};

const TodoModal = (props: Props) => {
  const {onClose, data} = props;
  return (
    <div id='myModal' className='Modal'>
      <div className='modal-content'>
        <span className="close" onClick={onClose}>&times;</span>
        <div>
          <h3>Todo Data</h3>
          <div>
            <label>Todo Title: {data.title}</label>
          </div>
          <div>
            <label>Todo Description: {data.description}</label>
          </div>
        </div>
      </div>
    </div>
  );
};
export default  TodoModal;
