import AddTask from "./AddTask";
import { useGlobalContext } from "./AppContextProvider";
import Task from "./Task";
const Content = () => {
  const { projects, id, editMode, setEditMode } = useGlobalContext();

  const item = projects.find((project) => {
    return project.id === id
  })
  return <section className="max-w-md mx-auto">
    {
      /*
          <Dashboard />
      */
    }

    <div className="mt-5 mb-10 ">
      <h1 className="text-gray-700 text-xl capitalize">my projects / {item?.name}</h1>
    </div>

    <div className="todo-content">
      <h4 className="text-gray-500 capitalize mt-6 mb-6">{item?.name}</h4>
      <Task />
      <AddTask />
    </div>

  </section>
}


export default Content;