import React, { useEffect, useState } from 'react'
import "./Home.style.css";
import { ITodo, PageEnum } from './Todo.type';
import TodoList from './TodoList';
import AddTodo from './AddTodo';
import EditTodo from './EditTodo';

export default function Home() {
  const[todoList, setTodoList] = useState([] as ITodo[]);

  const [shownpage, setShownPage ] = useState(PageEnum.list);
  const [todoEdit, setTodoEdit ] = useState({} as ITodo);

  useEffect(() => {
    const listInString = window.localStorage.getItem("TodoList");
    if(listInString){
    setTodoList(JSON.parse(listInString));
    }
  }, []);


  const onAddTodoClickedHnd = () => {
    setShownPage(PageEnum.add);
  };

  const showListPage = () => {
    setShownPage(PageEnum.list)
  };

  const _setTodoList = (list: ITodo[]) => {
    setTodoList(list);
    window.localStorage.setItem("TodoList", JSON.stringify(list));
  };

  const addTodoHnd = (data: ITodo) => {
    _setTodoList([...todoList, data]);
  };



  const deleteTodo = (data: ITodo) => {
    const indexToDelete = todoList.indexOf(data);
    const tempList = [...todoList];

    tempList.splice(indexToDelete, 1);
    _setTodoList(tempList)
  };

  const editTodo = (data: ITodo) => {
    setShownPage(PageEnum.edit)
    setTodoEdit(data);
  }

  const updateData = (data: ITodo) => {
    const filerData = todoList.filter(x => x.id === data.id)[0];
    const indexOfRecord = todoList.indexOf(filerData);
    const tempData = [...todoList];
    tempData[indexOfRecord] = data;
    _setTodoList(tempData);
  }

  return (
    <><article className='article-header'>
          <header>
              <h1>This is Simple CRUD todo using React</h1>
          </header>
      </article>
      
      <section className='section-content'>
        {shownpage === PageEnum.list &&
        <>  
          <input type='button' value='Add Todo' className='add-todo-button' onClick={onAddTodoClickedHnd}/>
          <TodoList list={todoList} onDeleteClickHnd={deleteTodo} onEditClickHnd={editTodo}/>
        </>
        }
        {shownpage === PageEnum.add && (
       <AddTodo onBackButtonHnd={showListPage} onSubmitClickHnd={addTodoHnd}/>)
        }
        {shownpage === PageEnum.edit && <EditTodo data={todoEdit} onBackButtonHnd={showListPage} onUptadeClickHnd={updateData} />}
      </section>
      
    </>
  )
}
