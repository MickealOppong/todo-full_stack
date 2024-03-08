
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import styled from 'styled-components';

const AddTask = () => {
  const [showInput, setShowInput] = useState(false);

  const handleClick = () => {

  }
  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return <section className="task-form">
    <Wrapper>
      <div className="add-task-container">
        <button className="add-btn" onClick={() => setShowInput(!showInput)}>
          <FaPlus />
        </button>
        <span className="text">add task</span>
      </div>
      <article className={showInput ? 'task-input show' : "task-input"} >
        <form onSubmit={handleSubmit}>
          <div className="task-header">
            <input type="text" name="title" id="title" placeholder="task name" className="title" />
            <input type="text" name="description" id="description" placeholder="description" className="description" />
          </div>
          <div className="task-mgt">

            <div className="date">
              <label htmlFor="date">due date</label>
              <input type="date" name="dueDate" id="dueDate" />
            </div>

            <div className="priority">

              <label htmlFor="cars">priority</label>
              <select name="cars" id="cars">
                <option value="high">high</option>
                <option value="medium">medium</option>
                <option value="low">low</option>
              </select>
            </div>
            <div className="project">

              <label htmlFor="cars">project</label>
              <select name="cars" id="cars">
                <option value="home">home</option>
                <option value="work">work</option>
                <option value="club">club</option>
              </select>
            </div>
          </div>
          <div className="btns">
            <button className="addBtn" onClick={handleClick}>add</button>
            <button className="
          cancelBtn" onClick={() => setShowInput(false)}>cancel</button>
          </div>
        </form>
      </article>
    </Wrapper>
  </section>
}


const Wrapper = styled.div`
    position: relative;
      display: flex;
      flex-direction: column;
      column-gap:0.25rem;

      .add-task-container{
        display: flex;
        align-items: center;
      }
    .add-btn{
       background-color: transparent;
      border-color:transparent;
      color: #433a87;
      font-size:1rem;
      }
      
      .text{
        text-transform:capitalize;
      color: rgb(73, 81, 81);
        }


        form{
          display: flex;
          flex-direction: column;
          row-gap:0.5rem;
        }
  .task-input{
    position: absolute;
    top: 5%;
    width: 26rem;
    display: none;
    padding: 1rem;
    border: 1px solid gray;
  }

  .show{
    display: flex;
   background-color: white;
  }

  .task-header{
    display: flex;
    flex-direction: column;
  }

  .task-mgt{
    display:grid;
    grid-template-columns:repeat(3,1fr);
    align-items: start;
    column-gap:2rem;
  }

  .date,
  .priority,
  .project{
    display: flex;
    flex-direction: column;
  }

  .title{
    width: 15rem;
    height: 2rem;
  }


  .description{
     width: 25rem;
    height: 2rem;
  }

  label{
    font-size:0.75rem;
    text-transform:capitalize;
  }
 input[type="text"]{
      text-indent:5px;
  }


  input[type="text"]::placeholder{
      text-transform:capitalize;
  }

   input[type="text"]:focus{
     outline:none;
  }
  select{
    accent-color:#433a87;
  }

  select:focus{
    outline:none;
  }

  .btns{
    display: flex;
    column-gap:1rem;
  }

  .addBtn,
  .cancelBtn{
      width: 4rem;
    background-color: #433a87;
    border-color:transparent;
    color: yellow;
  }
 
 `
export default AddTask;