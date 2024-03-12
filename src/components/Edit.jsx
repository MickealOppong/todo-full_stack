import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useGlobalContext } from "./AppContextProvider";
import { api } from "./util";
const Edit = ({ item }) => {
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


  return <div className="max-w-md mx-auto border-2 rounded-md shadow-md px-2 py-2">
    <form onSubmit={handleSubmit} className="flex flex-col gap-1">
      <div className="flex flex-col gap-y-2">
        <input type="text" name="title" id="title" placeholder="task name" className="text-gray-700 capitalize focus:outline-none caret-m-purple indent-2" onChange={(e) => setTitle(e.target.value)} defaultValue={data?.title} />
        <input type="text" name="description" id="description" placeholder="description" className="text-gray-500 capitalize focus:outline-none caret-m-purple indent-2" onChange={(e) => setDescription(e.target.value)} defaultValue={data?.description} />
      </div>
      <div className="flex items-center gap-x-8">
        <div className="date">
          <label htmlFor="date" className="text-xs capitalize">due date</label>
          <input type="date" name="dueDate" id="dueDate" onChange={(e) => setDueDate(e.target.value)} defaultValue={data?.dueDate} />
        </div>

        <div className="priority">
          <label htmlFor="priority" className="text-xs capitalize">priority</label>
          <select name="priority" id="priority" onChange={(e) => setPriority(e.target.value)} defaultValue={data?.priority} className="text-xs">
            <option value="high">high</option>
            <option value="medium">medium</option>
            <option value="low">low</option>
          </select>
        </div>
        <div className="project">
          <label htmlFor="project" className="text-xs capitalize">project</label>
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
      <div className="flex gap-2">
        <button className="w-16 bg-m-purple h-6 pitalize text-xs text-white rounded" >add</button>
        <button className="
          w-16 bg-m-purple rounded  text-xs capitalize text-white" onClick={() => setEditMode(false)}>cancel</button>
      </div>
    </form>
  </div>
}


export default Edit;