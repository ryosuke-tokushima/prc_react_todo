import { useEffect, useState } from 'react'
import { ITodo } from './Todo.type'
import './AddTodoForm.style.css'

type Props = {
  data: ITodo
  onBackButtonHnd: () => void
  onUpdateClickHnd: (data: ITodo) => void
}

const EditTodo = (props: Props) => {
  const { data, onBackButtonHnd, onUpdateClickHnd } = props

  const [title, setTitle] = useState(data.title)
  const [description, setDescription] = useState(data.description)

  const onTodoTitleChangeHnd = (e: any) => {
    setTitle(e.target.value)
  }

  const onDescriptionChangeHnd = (e: any) => {
    setDescription(e.target.value)
  }

  const onSumitBtnClickedHnd = (e: any) => {
    e.preventDefault()
    const updateData: ITodo = {
      id: data.id,
      title: title,
      description: description,
    }
    onUpdateClickHnd(updateData)
    onBackButtonHnd()
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
      <form onSubmit={onSumitBtnClickedHnd}>
        <div>
          <label>Todo Title</label>
          <input type="text" value={title} onChange={onTodoTitleChangeHnd} />
        </div>
        <div>
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={onDescriptionChangeHnd}
          />
        </div>
        <div>
          <input type="button" value="Back" onClick={onBackButtonHnd} />
          <input type="submit" value="Update Todo" />
        </div>
      </form>
    </div>
  )
}

export default EditTodo
