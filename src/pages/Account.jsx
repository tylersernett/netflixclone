import React, { useContext, useEffect, useState } from 'react'
import { HeroContext } from '../App';
import Main from '../components/Main';
import SavedShows from '../components/SavedShows'

const Account = () => {
  const { heroMovie, setHeroMovie } = useContext(HeroContext);

  //reset heroMovie to null on initial load
  useEffect(() => {
    setHeroMovie(null);
  }, [])
  

  return (
    <>
      {heroMovie === null ?
        (
          <div className='w-full text-white'>
            <img className='w-full h-[550px] object-cover'
              src='https://assets.nflxext.com/ffe/siteui/vlv3/79fe83d4-7ef6-4181-9439-46db72599559/be1d82ef-72c1-4a2a-8c16-5170169f9ef8/US-en-20221017-popsignuptwoweeks-perspective_alpha_website_medium.jpg'
              alt='/'
            />
            <div className='bg-black/60 absolute top-0 left-0 w-full h-[550px]'></div>
            <div className='absolute top-[20%] p-4 md:p-8'>
              <h1 className='text-3xl md:text-5xl font-bold'>My Account</h1>
            </div>
          </div>
        ) : (
          <Main />
        )}
      <SavedShows />
    </>
  )
}

export default Account