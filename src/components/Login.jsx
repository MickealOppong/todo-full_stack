import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useRef, useState } from 'react';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import styled from 'styled-components';
import { useGlobalContext } from './AppContextProvider';
import { retrieveToken, saveTk } from './util';
const Login = () => {
  const [toggle, setToggle] = useState(false)
  const myRef = useRef(null);
  const { setIsLoginSuccess, setToken, showLoginForm, setShowLoginForm, token, setUsername } = useGlobalContext();


  //console.log(token);
  const handleToggle = () => {
    const form = myRef.current;
    if (form.type === 'password') {
      form.type = 'text'
      setToggle(!toggle)
    } else {
      form.type = 'password'
      setToggle(!toggle)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { username, password } = Object.fromEntries(formData);
    //console.log(username, password);
    authUser({ username, password })
  }

  const authUser = async ({ username, password }) => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', JSON.stringify({ username, password }), {
        headers: {
          'Content-type': "application/json"
        }
      })
      // console.log(response);
      if (response.status === 200) {
        setIsLoginSuccess(true);
        setToken(response.data?.accessToken);
        const token = response.data?.token;
        Cookies.set('refreshToken', token, { expires: 1, path: '', sameSite: true })
        saveTk("rtk", response.data?.token)
        saveTk('tk', response.data?.accessToken)
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const refreshToken = async () => {
      const token = retrieveToken('rtk');
      if (token) {
        try {
          const response = await axios.post('http://localhost:3000/api/auth/refreshToken', JSON.stringify({ token }), {
            headers: {
              'Content-type': "application/json"
            }
          })
          const data = await response.data;
          setIsLoginSuccess(true);
          saveTk('tk', data.accessToken);
          saveTk('rtk', data.token)
        } catch (error) {
          console.log(error);
        }

      }
    }
    refreshToken();
  }, [])
  return (<Wrapper>
    <h2>Login to continue</h2>
    <form className='parent' onSubmit={handleSubmit}>
      <div className='email-div div'>
        <span>email</span>
        <input type="text" name="username" id="username" className='input' defaultValue="epps@mail.com" placeholder='Your username' />
      </div>
      <div className='password-div div'>
        <span>password</span>
        <div className='pwd-div'>
          <input type="password" name="password" id="password" placeholder="Your password..." ref={myRef} defaultValue="password" />
          <button onClick={handleToggle} className='eye-btn'>
            {
              toggle ? <IoEyeOutline /> :
                <IoEyeOffOutline />
            }
          </button>
        </div>

      </div>
      <div className='policy'>
        <p>By clicking below, you agree to we-do
          <span className='terms'>Terms of Service and Privacy Policy.</span>
        </p>
      </div>
      <button type="submit" className="submit-btn" >login</button>
    </form>

    <div className='info'>
      <p>Don't have account?
        <span className='sign-up' onClick={() => setShowLoginForm(!showLoginForm)}>sign up</span>
      </p>
    </div>
  </Wrapper>
  )

}
const Wrapper = styled.section`

display: flex;
flex-direction: column;
align-items: left;
margin-left:10vw;
margin-top:10vh;
box-shadow:0 5px 15px rgba(0,0,0,0.2);
width: 25rem;
padding:1rem 2rem 1rem 2rem;
border-radius:10px;
p{
  width: 25rem;
}
h2{
  font-size:2rem;
}
.parent{
  display: flex;
  flex-direction: column;
  row-gap:1rem;
}
  .div{
    width: 24rem;
  display: grid;
 grid-template-rows:1fr auto;
    border:2px solid gray;
    border-radius:10px;
    padding: 0.5rem;
  }
  input[type="password"]{
    width: 20rem;
    height: 2rem;
    border-color:transparent;
    font-size:1rem;
      color: rgb(73, 81, 81);
  }

   input[type="text"]{
    width: 22rem;
    height: 2rem;
     border-color:transparent;
     font-size:1rem;
      color: rgb(73, 81, 81);
  }
  input:focus{
   outline:none;
  }

  input::-webkit-contacts-auto-fill-button {
  visibility: hidden;
  display: none !important;

}
input::-webkit-credentials-auto-fill-button{
  visibility: hidden;
}
  .pwd-div{
      display: flex;
      justify-content: space-between;
      align-items: center;
  }

  .eye-btn{
    display: inline-flex;
    background-color: transparent;
    border-color:transparent;
    font-size:1.2rem;
  }
  .submit-btn{
    width: 8rem;
    height: 3rem;
    font-size:1rem;
    text-transform:capitalize;
    letter-spacing: 1px;
    background-color: #433a87;
    border-color:transparent;
    border-radius:5px;
    color:yellow;
  }


.terms{
  color:  #433a87;
  font-weight:700;
  font-size:0.85rem;
  margin-left:0.5rem;
  text-decoration:underline;
}



.div span{
  text-transform:capitalize;
      color: rgb(73, 81, 81);
        margin-left:0.25rem;
}



.sign-up{
  background-color: transparent;
  border-color:transparent;
  color:  #433a87;
  font-size:1rem;
  font-weight:700;
  text-transform:capitalize;
  cursor: pointer;
}


.info span{
  text-transform:capitalize;
  margin-left:0.25rem;
}
@media screen and (min-width:800px) {
 
  margin-left:30vw;

}
`

export default Login;