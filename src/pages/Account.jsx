import React, { useEffect, useState } from 'react'
import Main from '../components/Main';
import SavedShows from '../components/SavedShows'

const Account = () => {
  //make new heroMovie var here? I don't think it needs to be passed in...
  //useEffect -- init hero to null
  const [heroMovie, setHeroMovie] = useState(null);
  // useEffect(() => {
  //   setHeroMovie(null);
  // }, [setHeroMovie])
  

  return (
    <>
    {heroMovie===null ?(
      <div className='w-full text-white'>
        <img className='w-full h-[400px] object-cover'
          src='https://assets.nflxext.com/ffe/siteui/vlv3/79fe83d4-7ef6-4181-9439-46db72599559/be1d82ef-72c1-4a2a-8c16-5170169f9ef8/US-en-20221017-popsignuptwoweeks-perspective_alpha_website_medium.jpg'
          alt='/'
        />
        <div className='bg-black/60 fixed top-0 left-0 w-full h-[550px]'></div>
        <div className='absolute top-[20%] p-4 md:p-8'>
          <h1 className='text-3xl md:text-5xl font-bold'>My Shows</h1>
        </div>
      </div>
      ) : (
        <Main heroMovie={heroMovie}/>
      ) }
      <SavedShows setHeroMovie={setHeroMovie}/>
    </>
  )
}

export default Account