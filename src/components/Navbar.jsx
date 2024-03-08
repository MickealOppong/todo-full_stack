import { FaBars } from 'react-icons/fa'
import styled from 'styled-components'
import '../index.css'
import { useGlobalContext } from './AppContextProvider'

const Navbar = () => {
  const { showSidebar, setShowSidebar, setIsLoginSuccess, isLoginSuccess, username } = useGlobalContext();



  return <nav>
    <Wrapper>
      <div className="nav-header">
        <h1 className='logo'>we-do</h1>
        <div className="nav-center">

          <button className='toggle-btn' onClick={() => setShowSidebar(!showSidebar)} style={{ display: isLoginSuccess ? 'inline' : 'none' }} >  <FaBars /> </button>
        </div>
      </div>

    </Wrapper>
  </nav>
}

const Wrapper = styled.div`
width: 100%;
  display: flex;
  justify-content: right;
  align-items:center;

  a{
    text-decoration:none;
    color:  #433a87;
  }
.logo{
font-size:2rem;
 color:  #433a87;
}

  .nav-header{
    width: 100%;
    display: flex;
   justify-content: space-around;
   align-items: center;
   padding-left:1rem;
   padding-right:1rem;
  }
 .nav-center{
  display: flex;
  justify-content: space-between;

 }

 .toggle-btn{
  background-color: transparent;
  border-color:transparent;
  color: #433a87;
  cursor: pointer;
 }

 .login-btn{
  width: 5rem;
  height: 2rem;
  background-color: transparent;
  border-color:transparent;
  text-transform:capitalize;
  font-size:0.85rem;
  cursor: pointer;
 }
`
export default Navbar