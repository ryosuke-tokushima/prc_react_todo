import { useState } from 'react'
import './AddTodoForm.style.css'
import { ITodo } from './Todo.type'
import React from 'react'

type Props = {
  onBackButton: () => void
  onSubmitClick: (data: ITodo) => void
}

const AddTodo = ({ onBackButton, onSubmitClick}: Props) => {
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')


  const onTodoTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const onDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value)
  }

  const onSumitBtnClicked = (e: React.FormEvent<HTMLFormElement>)  => {
    e.preventDefault()
    const data: ITodo = {
      id: new Date().toJSON.toString(),
      title: title,
      description: description,
    }
    onSubmitClick(data)
    onBackButton()
  }

  return (
    <div className="form-container">
      <div>
        <h3>Add Employ Form</h3>
      </div>
      <form onSubmit={onSumitBtnClicked}>
        <div>
          <label>Todo Title</label>
          <input type="text" value={title} onChange={onTodoTitleChange} />
        </div>
        <div>
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={onDescriptionChange}
          />
        </div>
        <div>
          <input type="button" value="Back" onClick={onBackButton} />
          <input type="submit" value="Add Todo" />
        </div>
      </form>
    </div>
  )
}

export default AddTodo
