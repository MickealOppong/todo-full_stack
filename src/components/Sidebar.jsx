import axios from 'axios';
import { useMutation } from 'react-query';
import styled from "styled-components";
import defaultImg from '../assets/profile.webp';
import '../index.css';
import { useGlobalContext } from "./AppContextProvider";
import { todoView } from "./data";
import { retrieveToken } from './util';

const Sidebar = () => {
  const { showSidebar, username, authority, isLoginSuccess, setIsLoginSuccess } = useGlobalContext();

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


  return <section className={showSidebar ? "sidebar-container show-sidebar" : "sidebar-container"}>
    <Wrapper>
      <section className="list">
        <div className="profile">
          <img src={defaultImg} alt="profile" />
          <span>{username}</span>
        </div>
        <article className="menus">
          {
            todoView.map((item) => {
              const { id, icon, title } = item;
              return <button className="menu-container" key={id} >
                <div className="menu-item">
                  <span>{icon}</span>
                  <span>{title}  </span>
                </div>
                <span className="item">   1      </span>
              </button>
            })
          }
        </article>
        <article className='projects'>
          <h4>my projects</h4>
          <p>#home</p>
        </article>
      </section>
      <div className="footer">

        <p>You are logged in as:<span>{authority}</span></p>
        <button className='logout-btn' style={{ display: isLoginSuccess ? 'inline' : 'none' }} onClick={handleLogout}>logout</button>
      </div>
    </Wrapper>

  </section>
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
align-items:start;
margin-top:4rem;
margin-left:1rem;

.profile{
  display: flex;
align-items: center;
}
.menus{
  width: 15rem;
  margin-top:2rem;
  display: flex;
  flex-direction: column;
}

  .menu-container{
    display: flex;
     justify-content: space-between;
    align-items: center;
    margin-top:0.5rem;
    background-color: transparent;
    border-color:transparent;
    text-transform:capitalize;
       padding: 0.25rem;
    cursor: pointer;
  }
 
  .menu-item{
    width: 100%;
    display: flex;
    align-items: center;
    column-gap:0.5rem;
   
  }
  button:hover{
    background-color:#433a87;
  }

  .menus span{
     color: rgb(73, 81, 81);
  }

  .menu-container:hover{
   color: white;
  }


  img{
    width: 60px;
    height: 60px;
    border-radius:50%;
  }

  .footer{
    position: absolute;
    bottom: 10%;
  }
  
  p{
     color: rgb(73, 81, 81);
  }

  p span{
    text-transform:capitalize;
    margin-left:0.5rem;
  }

  .logout-btn{
    width: 5rem;
    height: 1.5rem;
    margin-left:4rem;
    background-color: #433a87;
    border-color:transparent;
    color: yellow;
    font-size:0.7rem;
    text-transform:capitalize;
    cursor: pointer;
  }

`
export default Sidebar;