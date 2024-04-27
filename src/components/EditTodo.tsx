import { useEffect, useState } from 'react'
import { ITodo } from './Todo.type'
import './AddTodoForm.style.css'
import React from 'react'

type Props = {
  data: ITodo
  onBackButton: () => void
  onUpdateClick: (data: ITodo) => void
}

const EditTodo = (props: Props) => {
  const { data, onBackButton, onUpdateClick } = props

  const [title, setTitle] = useState(data.title)
  const [description, setDescription] = useState(data.description)

  const onTodoTitleChange = (e: any) => {
    setTitle(e.target.value)
  }

  const onDescriptionChange = (e: any) => {
    setDescription(e.target.value)
  }

  const onSumitBtnClicked = (e: any) => {
    e.preventDefault()
    const updateData: ITodo = {
      id: data.id,
      title: title,
      description: description,
    }
    onUpdateClick(updateData)
    onBackButton()
  }

  useEffect(() => {
    setTitle(data.title)
    setDescription(data.description)
  }, [data])

  return (
    <div className="form-container">
      <div>
        <h3>Edit Todo Form</h3>
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
          <input type="submit" value="Update Todo" />
        </div>
      </form>
    </div>
  )
}

export default EditTodo
