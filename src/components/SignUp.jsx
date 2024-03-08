import axios from 'axios';
import { useRef, useState } from 'react';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { useMutation } from 'react-query';
import styled from 'styled-components';
import { useGlobalContext } from './AppContextProvider';


const SignUp = () => {
  const [toggle, setToggle] = useState(false)
  const { showLoginForm, setShowLoginForm } = useGlobalContext();
  const myRef = useRef(null);

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
    const data = Object.fromEntries(formData);
    //if (!username || !name || !password) return;
    createUser(data)
    e.target.reset();
  }



  const { mutate: createUser } = useMutation({
    mutationFn: ({ username, name, password }) => axios.post('http://localhost:3000/api/sign-up/add', {
      username, name, password
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    , onSuccess: (response) => {
      setShowLoginForm(true)
    },
    onError: (error) => {
      console.log(error);
    }
  })

  return <Wrapper>
    <h2>sign up</h2>
    <form className='parent' onSubmit={handleSubmit}>
      <div className='div'>
        <span>email</span>
        <input type="text" name="username" id="username" className='input' defaultValue="test@testmail.com" placeholder='Your email' />
      </div>
      <div className='div'>
        <span>name</span>
        <input type="text" name="name" id="name" className='input' defaultValue="john doe" placeholder='Your name...' />
      </div>
      <div className='div'>
        <span>password</span>
        <div className='pwd-div'>
          <input type="password" name="password" id="password" placeholder="Your password..." ref={myRef} className='input' defaultValue="123456" />
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
      <button type="submit" className="submit-btn">sign up</button>
    </form>
    <div className='info'>
      <p>Already have an account?
        <span className='login' onClick={() => setShowLoginForm(!showLoginForm)}>login</span>
      </p>
    </div>
  </Wrapper>
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
  text-transform:capitalize;
  font-size:2rem;
}
.parent{
  display: flex;
  flex-direction: column;
  row-gap:1rem;
}
.div{
    width: 24rem;
  display: flex;
  flex-direction: column;
    border:2px solid  gray;
    border-radius:10px;
    padding: 0.5rem;
  }

  .pwd-div{
      display: flex;
      justify-content: space-between;
      align-items: center;
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

 .div span{
      color: rgb(73, 81, 81);
        margin-left:0.25rem;
  }

.terms{
  color:  #433a87;
  font-weight:700;
  font-size:0.85rem;
  margin-left:0.5rem;
  text-decoration:underline;
}

.info span{
  text-transform:capitalize;
  margin-left:0.25rem;
}


.login{
   background-color: transparent;
  border-color:transparent;
  color:  #433a87;
  font-size:1rem;
  font-weight:700;
  text-transform:capitalize;
  cursor: pointer;
}


@media screen and (min-width:800px) {
 
  margin-left:30vw;
}

`

export default SignUp;