import axios from 'axios';
import { useRef, useState } from 'react';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { useMutation } from 'react-query';
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
    mutationFn: ({ username, name, password }) => axios.post('http://localhost:3000/api/sign-up/user', {
      username, name, password
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    , onSuccess: () => {
      setShowLoginForm(true)
    },
    onError: (error) => {
      console.log(error);
    }
  })

  return <div className='max-w-md mx-auto border-2 py-6 px-6 mt-32 rounded-md shadow-md'>
    <h2 className='text-2xl text-gray-500 font-semibold capitalize tracking-wide mb-4'>sign up</h2>
    <form onSubmit={handleSubmit}>
      <div className='mb-4'>
        <label htmlFor="username" className='block text-gray-500 capitalize text-x'>email</label>
        <input type="text" name="username" id="username" className='w-96 h-12 border-2 rounded-3xl indent-4 focus:outline-none' defaultValue="test@mail.com" placeholder='Your email' />
      </div>
      <div className='mb-4'>
        <label htmlFor="name" className='block text-gray-500 capitalize text-x'>full name</label>
        <input type="text" name="name" id="name" className='w-96 h-12 border-2 rounded-3xl indent-4 focus:outline-none' defaultValue="john doe" placeholder='Your name...' />
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
      <button type="submit" className="w-96 rounded-3xl bg-sky-700 h-8 text-white capitalize mb-4" >sig up</button>
    </form>
    <div className='info'>
      <p className='text-xs'>Already have an account?
        <span className='login capitalize ml-1 text-sky-700 font-bold tracking-wide underline' onClick={() => setShowLoginForm(!showLoginForm)}>login</span>
      </p>
    </div>
  </div>
}

export default SignUp;