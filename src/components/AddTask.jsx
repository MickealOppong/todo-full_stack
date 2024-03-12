
import { useState } from "react";
import 'react-calendar/dist/Calendar.css';
import 'react-date-picker/dist/DatePicker.css';
import { FaPlus } from "react-icons/fa";
import { useMutation, useQueryClient } from "react-query";
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


  return <section className="max-w-md md:max-w-xl lg:max-w-xl mx-auto">

    <div className="flex items-center mt-4 text-gray-500">
      <button className="text-m-purple mr-1 text-sm" onClick={() => setShowInput(!showInput)}>
        <FaPlus />
      </button>
      <span className="text">add task</span>
    </div>
    {
      showInput &&

      <article className='max-w-md border-2 px-1 py-1 -mt-8 md:max-w-xl lg:max-w-xl rounded-md shadow-md' >
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <input type="text" name="title" id="title" placeholder="task name" className="text-gray-500 capitalize text-x focus:outline-none" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input type="text" name="description" id="description" placeholder="description" className="text-gray-500 capitalize text-x focus:outline-none" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="flex items-center gap-x-4">
            <div className="capitalize text-xs">
              <label htmlFor="date">due date:</label>
              <input type="date" name="dueDate" id="dueDate" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            </div>

            <div className="priority">
              <label htmlFor="priority" className="text-gray-500 capitalize text-xs">priority:</label>
              <select name="priority" id="priority" value={priority} onChange={(e) => setPriority(e.target.value)} className="text-xs">
                <option value="high">high</option>
                <option value="medium">medium</option>
                <option value="low">low</option>
              </select>
            </div>
            <div className="project">

              <label htmlFor="project" className="text-gray-500 capitalize text-xs">project:</label>
              <select name="project" id="project" value={project} onChange={(e) => setProject(e.target.value)} className="text-xs">
                {
                  projects.map((item) => {
                    const { id, name } = item;
                    return <option value={name} key={id}>{name}</option>
                  })
                }
              </select>
            </div>

          </div>
          <div className="flex justify-start gap-x-2 my-2">
            <button className="bg-m-purple text-white w-16 capitalize text-xs rounded" >add</button>
            <button className="bg-m-purple text-white w-16 capitalize text-xs rounded" onClick={() => setShowInput(false)}>cancel</button>
          </div>
        </form>
      </article>
    }
  </section>
}



export default AddTask;