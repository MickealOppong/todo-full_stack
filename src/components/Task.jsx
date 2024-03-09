import { CiEdit } from 'react-icons/ci';
import { FaTrash } from "react-icons/fa";
import styled from 'styled-components';
import { useGlobalContext } from './AppContextProvider';
const Task = () => {
  const { id, projects } = useGlobalContext();

  console.log(typeof id);
  const item = projects.find((project) => {
    return project.id === id
  })


  return <Wrapper>
    <div>
      {
        item?.todoActivityList.map((list) => {
          const { title, description, dueDate, priority, id } = list;
          return <article key={id} className='todo-item'>
            <div className='todo-center'>
              <input type="checkbox" name="complete" id="complete" />
              <div className='info'>

                <h4>{title}</h4>
                <span>{description}</span>
              </div>
            </div>
            <div className='todo-edit'>
              <button className='edit-btn'>
                <CiEdit />
              </button>
              <button className='delete-btn'><FaTrash /></button>
            </div>
          </article>
        })
      }

    </div>
  </Wrapper>
}
const Wrapper = styled.section`
width: 30rem;
display: flex;
margin-bottom:1rem;
border-top:0.5px solid gray;

.todo-item{
   display: flex;
   align-items: center;
}
.todo-center{
  display: flex;
  align-items: center;
}
.info{
  display: flex;
  flex-direction: column;
  padding:0 0.5rem 0 0.5rem;
}

.info span{
   color: rgb(73, 81, 81);
}
.info h4{
   color: rgb(73, 81, 81);
}

.todo-edit{
  display:flex ;
  flex-direction: column;
}

.edit-btn,
.delete-btn{
  background-color: transparent;
  border-color:transparent;
  color: #433a87;
 
}

.edit-btn{
    font-size:0.9rem;
}

input[type="checkbox"]{
  accent-color:#433a87;
}
`
export default Task;