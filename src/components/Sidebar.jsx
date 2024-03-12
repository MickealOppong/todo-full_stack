import axios from 'axios';
import { FaHashtag, FaPlus } from 'react-icons/fa';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import '../index.css';
import { useGlobalContext } from "./AppContextProvider";
import CreateProject from './CreateProject';
import Logo from './Logo';
import { todoView } from "./data";
import { api, retrieveToken } from './util';

const Sidebar = () => {
  const { showSidebar, username, authority, isLoginSuccess, setIsLoginSuccess, addProject, setAddProject, projects, setProjects, setId } = useGlobalContext();

  const handleLogout = () => {
    const token = retrieveToken('rtk')
    logout(token)
  }

  const { mutate: logout } = useMutation({
    mutationFn: (token) => axios.delete(`http://localhost:3000/api/auth/logout`, {
      params: {
        token
      }
    }),
    onSuccess: () => {
      setIsLoginSuccess(false);
      localStorage.removeItem('tk')
      localStorage.removeItem('rtk')
    },
    onError: (error) => {
      console.log(error);
    }
  })

  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ['projects'],
    queryFn: () => api.get('/api/projects/all', {
      withCredentials: true
    }),
    onSuccess: (response) => {
      setProjects(response.data);
    },
    onError: (error) => {
      console.log(error);
    }
  })


  return <section className='absolute top-0 left-0 w-18 h-full bg-gray-100 flex flex-col gap-y-4 -translate-x-full' style={{ transform: showSidebar ? 'translateX(0)' : 'translateX(-100%) ', transitionBehavior: 'smooth', transformOrigin: "left", transitionDuration: '0.5s' }}>
    <div className="mt-16 flex items-center ml-4">
      <Logo name={username} />
      <span className='capitalize text-gray-500 ml-2'>{username}</span>
    </div>
    <article className="flex flex-col gap-2 mt-16 ml-4">
      {
        todoView.map((item) => {
          const { id, icon, title } = item;
          return <button className="flex justify-between" key={id} >
            <div className="flex items-center gap-x-2">
              <span className='text-gray-500'>{icon}</span>
              <span className='capitalize text-gray-500'>{title}  </span>
            </div>
            <span className="mr-10 text-gray-500">   1      </span>
          </button>
        })
      }
    </article>
    <article className='ml-4 mt-8'>
      <div className='flex gap-x-40'>
        <h4 className='capitalize text-gray-500'>my projects</h4>
        <button className='text-gray-500 ml-2' onClick={() => setAddProject(true)}><FaPlus /></button>
        {
          addProject ? <CreateProject /> : <></>
        }

      </div>
      <div className='mt-4'>
        {
          projects.map((item) => {
            const { id, name } = item;
            return <div className='flex flex-col' key={id}>
              <button key={id} onClick={() => setId(id)} className='flex items-center gap-x-1 text-gray-500'>{<FaHashtag />}{name}</button>
            </div>

          })
        }
      </div>
    </article>

    <div className="flex flex-col mx-16 mt-16">

      <p>You are logged in as:<span>{authority}</span></p>
      <button className='bg-darkcyan mt-8 text-white tracking-wide capitalize' style={{ display: isLoginSuccess ? 'inline' : 'none' }} onClick={handleLogout}>logout</button>
    </div>
  </section>
}


export default Sidebar;