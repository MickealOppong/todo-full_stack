import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useRef, useState } from 'react';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
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


  return <section className="max-w-md mx-auto mt-32 p-6 border rounded-md shadow-md" >
    <h2 className="text-2xl font-semibold mb-6 text-slate-700 tracking-wide">Login to continue</h2>

    <form onSubmit={handleSubmit}>

      <div className='mb-4'>
        <label className='capitalize block text-gray-700  text-xs font-semibold mb-2 tracking-wide' htmlFor='username'>email</label>
        <input type="text" name="username" id="username" className='w-96 border-2 rounded-3xl h-12 outline-none indent-4 text-xs' defaultValue="epps@mail.com" placeholder='Your username' />
      </div>

      <div className=''>
        <label className='capitalize block text-gray-700 text-xs font-semibold mb-2 tracking-wide' htmlFor='password'>password</label>
        <div className='flex items-center w-96 border-2 rounded-3xl h-12 mb-4'>
          <input type="password" name="password" id="password" placeholder="Your password..." ref={myRef} defaultValue="password" className='ml-2 focus:outline-none text-xs w-80 indent-2' />
          <button onClick={handleToggle} className='ml-4'>
            {
              toggle ? <IoEyeOutline /> :
                <IoEyeOffOutline />
            }
          </button>
        </div>
      </div>
      <div className='w-96 mb-4'>
        <p className='w-96 text-xs'>By clicking below, you agree to we-do
          <span className='text-sky-700 font-medium ml-1 underline text-xs'>Terms of Service and Privacy Policy.</span>
        </p>
      </div>
      <button type="submit" className="w-96 rounded-3xl bg-sky-700 h-8 text-white capitalize mb-4" >login</button>
    </form>

    <div>
      <p className='text-xs'>Don't have account?
        <span className='capitalize text-sky-900 font-bold ml-1 underline' onClick={() => setShowLoginForm(!showLoginForm)}>sign up</span>
      </p>
    </div>
  </section>
}

export default Login;