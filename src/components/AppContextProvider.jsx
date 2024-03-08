import { createContext, useContext, useState } from "react";

const AppContext = createContext();
const AppProvider = ({ children }) => {
  const [token, setToken] = useState('')
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [username, setUsername] = useState('');
  const [authority, setAuthority] = useState('');

  return <AppContext.Provider value={{ token, setToken, isLoginSuccess, setIsLoginSuccess, showSidebar, setShowSidebar, username, setUsername, showLoginForm, setShowLoginForm, setAuthority, authority }}>
    {
      children
    }
  </AppContext.Provider>

}
export const useGlobalContext = () => useContext(AppContext);
export default AppProvider;