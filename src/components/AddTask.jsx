
import { useState } from "react";
import 'react-calendar/dist/Calendar.css';
import 'react-date-picker/dist/DatePicker.css';
import { FaPlus } from "react-icons/fa";
import { useMutation, useQueryClient } from "react-query";
import styled from 'styled-components';
import { useGlobalContext } from "./AppContextProvider";
import { api } from "./util";
const AddTask = () => {
  const [showInput, setShowInput] = useState(false);
  const [priority, setPriority] = useState('');
  const [project, setProject] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [title, setTitle] = useState('');
  const { projects } = useGlobalContext();

  const queryClient = useQueryClient();
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData);
    //console.log(data);
    setShowInput(false)
    addTask(data);
    setTitle('')
    setDescription('')
    setDueDate(new Date())
    setPriority('low')
    setProject('')
  }


  const { mutate: addTask } = useMutation({
    mutationKey: ['task'],
    mutationFn: ({ title, description, dueDate, priority, project }) => api.post('/api/activity/add', { title, description, dueDate, priority, project }, {
      withCredentials: true
    }),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ['projects']
      })
      console.log(response);
    },
    onError: (error) => {
      console.log(error);
    }
  })


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
            <input type="text" name="title" id="title" placeholder="task name" className="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input type="text" name="description" id="description" placeholder="description" className="description" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="task-mgt">

            <div className="date">
              <label htmlFor="date">due date</label>
              <input type="date" name="dueDate" id="dueDate" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            </div>

            <div className="priority">

              <label htmlFor="priority">priority</label>
              <select name="priority" id="priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="high">high</option>
                <option value="medium">medium</option>
                <option value="low">low</option>
              </select>
            </div>
            <div className="project">

              <label htmlFor="project">project</label>
              <select name="project" id="project" value={project} onChange={(e) => setProject(e.target.value)}>
                {
                  projects.map((item) => {
                    const { id, name } = item;
                    return <option value={name} key={id}>{name}</option>
                  })
                }
              </select>
            </div>

          </div>
          <div className="btns">
            <button className="addBtn" >add</button>
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
        width: 30rem;
        display: flex;
        align-items: center;
        border-top:0.5px solid gray;
      }
    .add-btn{
       background-color: transparent;
      border-color:transparent;
      color: #433a87;
      font-size:1rem;
      margin-top:0.5rem;
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
    width: 30rem;
    display: none;
    padding: 1rem;
    border: 0.5px solid gray;
    border-radius:10px;
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
      text-indent:1px;
      font-size:0.9rem;
       border:none;
       caret-color:#433a87;
  }



  input[type="text"]::placeholder{
      text-transform:capitalize;
  }

   input[type="text"]:focus{
     outline:none;
  }

  input::-webkit-datetime-edit{
 
  }

  select{
    line-height: 1.5rem;
    accent-color:#433a87;
  }

select[option]{
  position: absolute;
  top: 10%;
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
     text-transform:capitalize;
  }
 
 `
export default AddTask;