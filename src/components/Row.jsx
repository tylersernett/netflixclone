import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import Movie from './Movie';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { slideScroll } from '../utils/helpers';

const Row = ({ setHeroMovie, title, movieArrayData }) => {
    const [movies, setMovies] = useState([]);
    const slider = useRef();

    //initialize movies. passed in var will either be a string URL to fetch from, or an array
    useEffect(() => {
        if (typeof movieArrayData === 'string') {
            const controller = new AbortController();
            axios.get(movieArrayData, {signal: controller.signal})
            .then((response) => {
                setMovies(response.data.results)
            })
            return () => {
                controller.abort()
            }
        } else {
            setMovies(movieArrayData);
        }
    }, [movieArrayData])

    return (
        <>
            <h2 className='text-white font-bold md:text-xl p-4'>{title}</h2>
            <div className='relative flex items-center group'>
                <MdChevronLeft onClick={() => slideScroll(slider, -500)} className='bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' size={40} />
                <div ref={slider} className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative'>
                    {movies.map((item, id) => (
                        <Movie setHeroMovie={setHeroMovie} item={item} key={id} />
                    ))}

                </div>
                <MdChevronRight onClick={() => slideScroll(slider, 500)} className='bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' size={40} />
            </div>
        </>
    )
}

export default Row