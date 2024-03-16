import { useState } from "react";
import "./AddTodoForm.style.css"
import { ITodo } from "./Todo.type";

type Props = {
   onBackButtonHnd : () => void 
   onSubmitClickHnd: (data: ITodo) => void
};

const AddTodo = (props: Props) =>{

  const [title, setTitle ] = useState("");
  const [description, setDescription] = useState("");

  const {onBackButtonHnd, onSubmitClickHnd} = props

  const onTodoTitleChangeHnd = (e: any) => {
    setTitle(e.target.value)
  };

  const onDescriptionChangeHnd = (e: any) => {
    setDescription(e.target.value)
  };

  const onSumitBtnClickedHnd = (e: any) => {
    e.preventDefault();
    const data: ITodo = {
      id: new Date().toJSON.toString(),
      title: title,
      description: description,
    };
    onSubmitClickHnd(data);
    onBackButtonHnd();
  };

  return(
        <div className="form-container">
        <div>
          <h3>Add Employ Form</h3>
        </div>
          <form onSubmit={onSumitBtnClickedHnd}>
                <div>
                  <label>Todo Title</label>
                  <input type='text' value={title} onChange={onTodoTitleChangeHnd} />
                </div>
                <div>
                  <label>Description</label>
                  <input type='text' value={description} onChange={onDescriptionChangeHnd}/>
                </div>
                <div> 
                    <input type='button' value='Back' onClick={onBackButtonHnd}/>
                    <input type='submit' value='Add Todo'/>
                </div>
          </form>
      </div>
        );
};

export default AddTodo;