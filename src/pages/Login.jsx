import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import GuestButton from '../components/GuestButton';

const Login = () => {
  const emailRef = useRef(); //state not needed here--no need to update state on every character entry, only the final submitted value matters
  const passwordRef = useRef();
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { user, logIn, guestLogIn, setUser } = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await logIn(emailRef.current.value, passwordRef.current.value);
      navigate('/');
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  const handleGuestLogin = async (e) => {
    e.preventDefault();
    guestLogIn()
      .then((userCredential) => {
      })
      .catch((error) => {
        // Handle any errors
        console.error('Error signing in anonymously:', error);
      });
    navigate('/');
  }

  return (
    <>
      <div className='w-full h-screen'>
        <img className='hidden sm:block absolute w-full h-full object-cover'
          src='https://assets.nflxext.com/ffe/siteui/vlv3/79fe83d4-7ef6-4181-9439-46db72599559/be1d82ef-72c1-4a2a-8c16-5170169f9ef8/US-en-20221017-popsignuptwoweeks-perspective_alpha_website_medium.jpg'
          alt='/'
        />
        <div className='bg-black/60 fixed top-0 left-0 w-full h-screen'></div>
        <div className='fixed w-full px-4 py-24 z-50'>
          <div className='max-w-[450px] h-[600px] mx-auto bg-black/75 text-white'>
            <div className='max-w-[320px] mx-auto py-16'>
              <h1 className='text-3xl font-bold'>Sign In</h1>
              {error ? <p className='bg-orange-500 p-3 my-2 rounded'>{error}</p> : null}
              <form onSubmit={handleSubmit} className='w-full flex flex-col py-4'>
                <input ref={emailRef} className='p-3 my-2 bg-gray-700 rounded' type='email' placeholder='Email' autoComplete='email' />
                <input ref={passwordRef} className='p-3 my-2 bg-gray-700 rounded' type='password' placeholder='Password' autoComplete='current-password' />
                <button className='bg-red-600 py-3 my-6 rounded font-bold'>Sign In</button>
                <div className='flex justify-between items-center text-sm text-gray-500'>
                  <p><input className='mr-1' type='checkbox' />Remember Me</p>
                  <p>Need Help?</p>
                </div>
                <p className='py-8'><span className='text-gray-500'>New to Notflicks? &nbsp;</span>
                  <Link to='/signup'>
                    Sign up now
                  </Link>
                  <span className='text-gray-500'>.</span>
                </p>
              </form>
              {/* <GuestButton/> */}
              <form onSubmit={handleGuestLogin}>
                <button className='bg-orange-500 w-full py-3 my-6 rounded font-bold' >Guest Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login