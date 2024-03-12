import { FaBars } from 'react-icons/fa';
import '../index.css';
import { useGlobalContext } from './AppContextProvider';

const Navbar = () => {
  const { showSidebar, setShowSidebar, setIsLoginSuccess, isLoginSuccess, username } = useGlobalContext();



  return <nav>

    <div className="flex py-4 justify-evenly">
      <h1 className='text-m-purple font-bold text-xl'>we-do</h1>
      <div className="nav-center">
        <button className='text-m-purple text-xl' onClick={() => setShowSidebar(!showSidebar)} style={{ display: isLoginSuccess ? 'inline' : 'none' }} >  <FaBars /> </button>
      </div>
    </div>
  </nav>
}

export default Navbar