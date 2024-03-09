import { useState } from "react";
import styled from "styled-components";
import { useGlobalContext } from "./AppContextProvider";
const Edit = () => {

  const [showInput, setShowInput] = useState(false);
  const [priority, setPriority] = useState('');
  const [project, setProject] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [title, setTitle] = useState('');
  const { id, data, setEditMode, projects } = useGlobalContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log(data);
  }
  //console.log(data);

  return <Wrapper>

    <form onSubmit={handleSubmit}>
      <input type="text" name="title" id="title" value={data?.title} className="title" onChange={() => setTitle(e.target.value)} />
      <input type="text" name="description" id="description" value={data?.description} className="description" onChange={() => setDescription(e.target.value)} />
      <label htmlFor="date">due date</label>
      <input type="date" name="dueDate" id="dueDate" value={data?.dueDate} onChange={() => setDueDate(e.target.value)} />
      <label htmlFor="priority">priority</label>
      <select name="priority" id="priority" onChange={() => setPriority(e.target.value)} value={data?.priority}>
        <option value="high">high</option>
        <option value="medium">medium</option>
        <option value="low">low</option>
      </select>
      <label htmlFor="project">project</label>
      <select name="project" id="project" onChange={() => setProject(e.target.value)} >
        {
          projects.map((item, index) => {
            return <option key={index}>{item.name}</option>
          })
        }
      </select>
      <div className="btns">
        <button className="addBtn btn" onClick={() => setEditMode(false)}>submit</button>
        <button className="
          cancelBtn btn" onClick={() => setEditMode(false)}>cancel</button>
      </div>
    </form>
  </Wrapper>
}

const Wrapper = styled.div`

position: absolute;
top: 20%;
left: 40%;
z-index: 103;

background-color: white;
  form{
    width: 20rem;
    display: flex;
    flex-direction: column;
    border: 2px solid gray;
    padding: 1rem;
    row-gap:0.5rem;
  }

.btns{
  display: flex;
  justify-content: right;
  column-gap:1rem;
}
  .btn{
    width: 5rem;
    background-color:  #433a87;
    border-color:transparent;
    color: yellow;
    margin-top:1rem;
  }

  input[type=text]{
    border: none;
    text-transform:capitalize;
    height: 2rem;
  }

   input[type=text]:focus{
   outline:none;
  }

label{
  text-transform:capitalize;
  font-size:0.75rem;
}
  input[type=date]{
    border:none;
  }

  input[type=text]::placeholder{
  color: rgb(73, 81, 81);
  }

`
export default Edit;