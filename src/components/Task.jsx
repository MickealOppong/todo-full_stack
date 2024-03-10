import { CiEdit } from 'react-icons/ci';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import { useGlobalContext } from './AppContextProvider';
import { api } from './util';
const Task = () => {
  const { id, projects, setEditMode, setData, setId } = useGlobalContext();
  const queryClient = useQueryClient();


  const item = projects.find((project) => {
    return project.id === id
  })


  const { mutate: deleteTask } = useMutation({
    mutationFn: (id) => api.delete(`/api/activity/${id}`, { id }),
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ['projects']
      })
      console.log(res);
    },
    onError: (error) => {
      console.log(error);
    }
  })


  const getData = async (id) => {
    try {
      const response = await api.get(`/api/activity/${id}`)
      const data = await response.data;
      setData(data)
      console.log(data);
      setEditMode(true)
    } catch (error) {
      console.log(error);
    }


  }

  const fetchData = (id) => {
    return {
      queryKey: ['projects'],
      queryFn: () => api.get(`/api/activity/${id}`),
      onSuccess: (res) => {
        setData(res.data);
        setEditMode(false)
      },
      onError: (error) => {
        console.log(error);

      }
    }
  }


  return <Wrapper>
    <div className='task-div'>
      {
        item?.todoActivityList.map((list) => {
          const { title, description, dueDate, priority, id } = list;
          return <article key={id} className='todo-item'>
            <div className='todo-center'>
              <input type="checkbox" name="complete" id="complete" onChange={() => deleteTask(id)} />
              <div className='info'>
                <h4 className='title'>{title}</h4>
                <div className='desc-div'>
                  <span className='desc'>{description}</span>
                  <div className='mgt'>
                    <span className='priority'>priority: {priority}</span>
                    <span className='due'>due on: {new Date(dueDate).toUTCString()}</span>
                  </div>
                </div>
              </div>

            </div>
            <div className='todo-edit'>
              <button className='edit-btn' onClick={() => {
                getData(id)
                setEditMode(true)
              }}>
                <CiEdit />
              </button>
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


.todo-item{
  width: 30rem;
   display: flex;
   align-items: center;
border-top:0.5px solid gray;
}
.todo-center{
  display: flex;
  align-items: center;
}
.info{
  width: 25rem;
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

.desc-div{
  display: flex;
  flex-direction: column;
}

.desc{
  text-align:left;
}
.mgt{
  display: flex;
  column-gap:2rem;
  justify-content: center;
}

.title{
  text-transform:capitalize;
}
.priority,
.due{
   text-transform:capitalize;
   font-size:0.7rem;

}

`

export default Task;