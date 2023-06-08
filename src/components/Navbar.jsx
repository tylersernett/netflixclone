import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext';


const Navbar = () => {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();

  // console.log(user);

  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='flex items-center justify-between p-4 z-[100] w-full absolute'>
      <Link to='/'>
        <h1 className='text-red-600 hover:text-red-700 text-4xl font-bold cursor-pointer'>NOTFLICKS</h1>
      </Link>
      {user?.email ? (
        <div>
          <Link to='/account'>
            <button className='bg-slate-800 bg-opacity-30 hover:bg-opacity-50 px-6 py-2 rounded cursor-pointer text-white'>Account</button>
          </Link>
          <button onClick={handleLogout} className='bg-red-600 hover:bg-red-700 px-6 py-2 rounded cursor-pointer text-white'>Logout</button>
        </div>
      ) : (
        <div>
          <Link to='/login'>
            <button className='bg-slate-800 bg-opacity-30 hover:bg-opacity-50 px-6 py-2 rounded cursor-pointer text-white '>Sign In</button></Link>
          <Link to='/signup'>
            <button className='bg-red-600 hover:bg-red-700 px-6 py-2 rounded cursor-pointer text-white'>Sign Up</button>
          </Link>
        </div>
      )

      }
    </div>
  )
}

export default Navbar