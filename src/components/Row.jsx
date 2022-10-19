import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import Movie from './Movie';
import {MdChevronLeft, MdChevronRight} from 'react-icons/md';

const Row = ({ title, fetchURL }) => {
    const [movies, setMovies] = useState([]);
    const slider = useRef();

    useEffect(() => {
        axios.get(fetchURL).then((response) => {
            setMovies(response.data.results)
        })
    }, [fetchURL])

    const slideScroll= (amount) => {
        //var slider = document.getElementById('slider');
        slider.current.scrollLeft = slider.current.scrollLeft + amount;
    }

    return (
        <>
            <h2 className='text-white font-bold md:text-xl p-4'>{title}</h2>
            <div className='relative flex items-center group'>
                <MdChevronLeft onClick={() => slideScroll(-500)} className='bg-white left-0 rounded-full absolute opacity-50 hover:opactity-100 cursor-pointer z-10 hidden group-hover:block' size={40}/>
                <div ref={slider} className='w-fill h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative'>
                    {movies.map((item, id) => (
                        <Movie item={item} key={id} />
                    ))}

                </div>
                <MdChevronRight onClick={() => slideScroll(500)} className='bg-white right-0 rounded-full absolute opacity-50 hover:opactity-100 cursor-pointer z-10 hidden group-hover:block' size={40} />
            </div>
        </>
    )
}

export default Row