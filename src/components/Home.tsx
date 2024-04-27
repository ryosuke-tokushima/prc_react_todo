import React, { useEffect, useState } from 'react'
import './Home.style.css'
import { v4 as uuidv4 } from 'uuid'
import { ITodo, PageEnum } from './Todo.type'
import TodoList from './TodoList'
import AddTodo from './AddTodo'
import EditTodo from './EditTodo'

export default function Home() {
  const [todoList, setTodoList] = useState<ITodo[]>(() => {
    const ListInString = window.localStorage.getItem('TodoList')
    return ListInString ? JSON.parse(ListInString) : []
  })

  const [shownpage, setShownPage] = useState(PageEnum.list)
  const [todoEdit, setTodoEdit] = useState<ITodo>({
    id: '',
    title: '',
    description: '',
  }) // 初期値として、空の値を持つITodoオブジェクトを設定

  useEffect(() => {
    const listInString = window.localStorage.getItem('TodoList')
    if (listInString) {
      setTodoList(JSON.parse(listInString))
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem('TodoList', JSON.stringify(todoList))
  }, [todoList])

  const setAddPage = () => {
    // addTodoへのページ遷移の状態を保存しているのでsetAddPageに名称変更
    setShownPage(PageEnum.add)
  }

  const showListPage = () => {
    setShownPage(PageEnum.list)
  }

  const addTodo = (data: ITodo) => {
    const newTodo = {
      ...data,
      id: uuidv4(), // 一意のIDを生成
    }
    setTodoList([...todoList, newTodo])
  }

  const deleteTodo = (data: ITodo) => {
    const filteredTodoList = todoList.filter((todo) => todo.id !== data.id) //spliceメソッドからfilterメソッドに変更
    setTodoList(filteredTodoList)
  }

  const editTodo = (data: ITodo) => {
    setShownPage(PageEnum.edit)
    setTodoEdit(data)
  }

  const updateData = (updatedTodo: ITodo) => {
    const updatedTodoList = todoList.map((todo) =>
      todo.id === updatedTodo.id ? updatedTodo : todo
    )

    setTodoList(updatedTodoList)
  }

  return (
    <>
      <article className="article-header">
        <header>
          <h1>This is Simple CRUD todo using React</h1>
        </header>
      </article>

      <section className="section-content">
        {shownpage === PageEnum.list && (
          <>
            <input
              type="button"
              value="Add Todo"
              className="add-todo-button"
              onClick={setAddPage}
            />
            <TodoList
              list={todoList}
              onDeleteClick={deleteTodo}
              onEditClick={editTodo}
            />
          </>
        )}
        {shownpage === PageEnum.add && (
          <AddTodo
            onBackButton={showListPage}
            onSubmitClick={addTodo}
          />
        )}
        {shownpage === PageEnum.edit && (
          <EditTodo
            data={todoEdit}
            onBackButton={showListPage}
            onUpdateClick={updateData}
          />
        )}
      </section>
    </>
  )
}
