import { createContext, useContext, useState } from "react";

const AppContext = createContext();
const AppProvider = ({ children }) => {
  const [token, setToken] = useState('')
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [username, setUsername] = useState('');
  const [authority, setAuthority] = useState('');
  const [addProject, setAddProject] = useState(false);
  const [projects, setProjects] = useState([])
  const [id, setId] = useState(1);
  const [editMode, setEditMode] = useState(false);
  const [data, setData] = useState();

  return <AppContext.Provider value={{ token, setToken, isLoginSuccess, setIsLoginSuccess, showSidebar, setShowSidebar, username, setUsername, showLoginForm, setShowLoginForm, setAuthority, authority, addProject, setAddProject, projects, setProjects, id, setId, editMode, setEditMode, data, setData }}>
    {
      children
    }
  </AppContext.Provider>

}
export const useGlobalContext = () => useContext(AppContext);
export default AppProvider;