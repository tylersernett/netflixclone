import axios from 'axios';
import React, { useEffect, useState } from 'react'
import requests from '../Requests';

const Main = () => {
    const [movies, setMovies] = useState([]);

    //pick a random movie
    const movie = movies[Math.floor(Math.random() * movies.length)]

    useEffect(() => {
        axios.get(requests.requestPopular).then((response) => {
            setMovies(response.data.results);
        })
    }, [])
    console.log(movie);

// example image URL: https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg

    return (
        <div className='w-full h-[550px] text-white'>
            <div className='w-full h-full'>
                <img src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`} alt={movie?.title} />
            </div>
        </div>

    )
}

export default Main