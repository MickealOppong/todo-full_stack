import { useGlobalContext } from './components/AppContextProvider';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import SignUp from './components/SignUp';
const Todo = () => {
  const { showLoginForm, isLoginSuccess, setToken, token } = useGlobalContext();


  return <main>
    <Navbar isLoginSuccess={isLoginSuccess} />

    {
      isLoginSuccess ? <Profile /> : showLoginForm ? <Login /> : <SignUp />
    }

  </main>
}

export default Todo;