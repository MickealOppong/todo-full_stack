import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import styled from "styled-components";
import { useGlobalContext } from "./AppContextProvider";
import { api } from "./util";
const Edit = () => {
  const queryClient = useQueryClient();
  const { data, setEditMode, projects } = useGlobalContext();

  const [priority, setPriority] = useState();
  const [project, setProject] = useState();
  const [description, setDescription] = useState();
  const [dueDate, setDueDate] = useState();
  const [title, setTitle] = useState();



  const { mutate: editTask } = useMutation({
    mutationFn: (id) => api.patch(`/api/activity/${id}`, { id, title, description, dueDate, priority, project }),
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ['projects']
      })
      setEditMode(false)
      console.log(res);
    },
    onError: (error) => {
      console.log(error);
      setEditMode(false)
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    /*
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData);
    */
    //console.log(data);
    editTask(data?.id);
    /*
    setTitle('')
    setDescription('')
    setDueDate(new Date())
    setPriority('low')
    setProject('')
    */
  }


  return <Wrapper>
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="task-header">
          <input type="text" name="title" id="title" placeholder="task name" className="title" onChange={(e) => setTitle(e.target.value)} defaultValue={data?.title} />
          <input type="text" name="description" id="description" placeholder="description" className="description" onChange={(e) => setDescription(e.target.value)} defaultValue={data?.description} />
        </div>
        <div className="task-mgt">
          <div className="date">
            <label htmlFor="date">due date</label>
            <input type="date" name="dueDate" id="dueDate" onChange={(e) => setDueDate(e.target.value)} defaultValue={data?.dueDate} />
          </div>

          <div className="priority">
            <label htmlFor="priority">priority</label>
            <select name="priority" id="priority" onChange={(e) => setPriority(e.target.value)} defaultValue={data?.priority}>
              <option value="high">high</option>
              <option value="medium">medium</option>
              <option value="low">low</option>
            </select>
          </div>
          <div className="project">
            <label htmlFor="project">project</label>
            <select name="project" id="project" onChange={(e) => setProject(e.target.value)} defaultValue={data?.project}>
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
          cancelBtn" onClick={() => setEditMode(false)}>cancel</button>
        </div>
      </form>
    </div>
  </Wrapper>
}

const Wrapper = styled.article`
position: absolute;
  top:43%;
  left: 30%;
  background-color: white;
  z-index: 103;
  background-color: white;

  form{
    width: 30rem;
    display: flex;
    flex-direction: column;
    border: 1px solid gray;
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
    caret-color: #433a87;
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
export default Edit;