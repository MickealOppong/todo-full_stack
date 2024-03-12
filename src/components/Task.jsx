import { CiEdit } from 'react-icons/ci';
import { useMutation, useQueryClient } from 'react-query';

import { useGlobalContext } from './AppContextProvider';
import { api } from './util';
const Task = () => {
  const { id, projects, setEditMode, editMode, setData, setId } = useGlobalContext();

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


  return <div>
    {
      <div className='mx-auto max-w-md md:max-w-xl flex flex-col gap-2'>
        {
          item?.todoActivityList.map((list) => {
            const { title, description, dueDate, priority, id } = list;
            return <article key={id} className='flex items-center border-2 rounded-xl shadow-md px-2 py-2' >
              <div className='flex items-center w-full '>
                <input type="checkbox" name="complete" id="complete" onChange={() => deleteTask(id)} className='accent-m-purple' />
                <div className='flex flex-col mx-2 '>
                  <h4 className='capitalize text-gray-700 font-semibold'>{title}</h4>
                  <p className='text-gray-500 text-xs py-1'>{description}</p>
                  <div className='flex items-center  gap-8 lg:gap-24 '>
                    <span className='capitalize text-xs'>priority: {priority}</span>
                    <span className='text-xs capitalize'>due on: {new Date(dueDate).toUTCString()}</span>
                  </div>
                </div>

              </div>
              <div className='w-4'>
                <button className='edit-btn' onClick={() => {
                  setEditMode(true)
                  getData(id)
                }}>
                  <CiEdit />
                </button>
              </div>
            </article>
          })
        }
      </div >
    }
  </div >
}


export default Task;