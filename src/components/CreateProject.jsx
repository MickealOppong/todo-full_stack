import { useMutation, useQueryClient } from "react-query";
import styled from "styled-components";
import { useGlobalContext } from "./AppContextProvider";
import { api } from "./util";

const CreateProject = () => {
  const queryClient = useQueryClient();

  const { setAddProject } = useGlobalContext();
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData);
    createProject(data)
    setAddProject(false)
  }

  const { mutate: createProject } = useMutation({
    mutationKey: ['project'],
    mutationFn: ({ name }) => api.post('/api/projects/add', {
      name
    }),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      console.log(response);
    },
    onError: (error) => {
      console.log(error);
    }
  })

  return <Wrapper>
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" id="name" placeholder="name" />
      <div className="btns">
        <button className="create-btn">add</button>
        <button className="cancel-btn" onClick={() => setAddProject(false)}>cancel</button>
      </div>
    </form>
  </Wrapper>
}

const Wrapper = styled.div`
  
  position: absolute;
  top: 70%;
  left: 90%;
  box-shadow:0 5px 15px rgba(0,0,0,0.2);
  border-radius:10px;
  background-color: white;
  padding: 1rem;
  

  form{
    display: flex;
    flex-direction: column;
    row-gap:0.5rem;
  }

  input[type=text]{
    text-indent:10px;
    border:none;
    font-size:0.8rem;
  }

   input[type=text]::placeholder{
   text-transform:capitalize;
  }
 input[type=text]:focus{
    outline:none;
    caret-color: #433a87;
  }

  .btns{
    display: flex;
    justify-content: right;
    column-gap:1rem;
  }
  .create-btn,
  .cancel-btn{
    width:4rem;
    background-color:  #433a87;
    border-color:transparent;
    color: yellow;
    text-transform:capitalize;
    margin-top:1rem;
  }
  `



export default CreateProject;