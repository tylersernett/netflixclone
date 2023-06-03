import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import requests from '../Requests';
import { FaPlay } from 'react-icons/fa'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { UserAuth } from '../context/AuthContext';
import { HeroContext } from '../App';
import { db } from '../firebase';

const truncateString = (str, num) => {
    if (str?.length > num) {
        return str.slice(0, num) + '...';
    }
    return str;
}

const Main = () => {
    const [movies, setMovies] = useState([]);
    const [like, setLike] = useState(false);
    const { user } = UserAuth();
    const { heroMovie, setHeroMovie } = useContext(HeroContext);

    useEffect(() => {
        axios.get(requests.requestPopular).then((response) => {
            setMovies(response.data.results);
        })

    }, [])

    useEffect(() => {
        if (!heroMovie) {
            setHeroMovie(movies[Math.floor(Math.random() * movies.length)])
        }
    }, [heroMovie, movies, setHeroMovie])

    const saveShow = async () => {
        if (user?.email) { //if user logged in...
            if (!like) {
                setLike(true);
                const userData = doc(db, 'users', `${user?.email}`)
                await updateDoc(userData, {
                    savedShows: arrayUnion({
                        id: heroMovie.id,
                        title: heroMovie.title,
                        backdrop_path: heroMovie.backdrop_path,
                        release_date: heroMovie.release_date,
                        overview: heroMovie.overview
                    })
                })
            } else {
                // setLike(false);
                // deleteShow(heroMovie.id)
            }
        } else {
            alert('Please log in to save shows/movies')
        }
    }
    // example image URL: https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg

    return (
        <div className='w-full h-[550px] text-white'>
            <div className='w-full h-full'>
                <div className='absolute w-full h-[550px] bg-gradient-to-r from-black'></div>
                <img className='w-full h-full object-cover' src={`https://image.tmdb.org/t/p/original/${heroMovie?.backdrop_path}`} alt={heroMovie?.title} />
                <div className='absolute w-full top-[20%] p-4 md:p-8'>
                    <h1 className='text-3xl md:text-5xl font-bold'>{heroMovie?.title}</h1>
                    <div className='my-4'>
                        <button className='border  bg-gray-300 hover:bg-gray-400 text-black border-gray-300 hover:border-gray-400 py-2 pr-5 pl-3 inline-flex items-center'><FaPlay className='absolute text-black' />   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Play</button>
                        <button onClick={saveShow} className='border  text-white border-gray-300 hover:bg-gray-300 hover:bg-opacity-10 py-2 px-5 ml-4'>Watch Later</button>
                    </div>
                    <p className='text-gray-400 text-sm'>Release: {heroMovie?.release_date}</p>
                    <p className='w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200'>
                        {truncateString(heroMovie?.overview, 180)}</p>
                </div>
            </div>
        </div>

    )
}

export default Main