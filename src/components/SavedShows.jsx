import React, { useEffect, useRef, useState } from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { AiOutlineClose } from 'react-icons/ai'
import { UserAuth } from '../context/AuthContext'
import { db } from '../firebase'
import { doc, updateDoc, onSnapshot } from 'firebase/firestore'
import { slideScroll } from '../utils/helpers'
import Row from './Row'

const SavedShows = () => {
    const [userMovies, setUserMovies] = useState([]);
    const { user } = UserAuth();
    const slider = useRef();

    useEffect(() => {
        onSnapshot(doc(db, 'users', `${user?.email}`), (doc)=>{
            setUserMovies(doc.data()?.savedShows)
        })
    }, [user?.email])

    

    return (
        <>
            <Row title='Saved' fetchURL={userMovies} />
            {/* <h2 className='text-white font-bold md:text-xl p-4'>My Shows</h2>
            <div className='relative flex items-center group'>
                <MdChevronLeft onClick={() => slideScroll(slider, -500)} className='bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' size={40} />
                <div ref={slider} className='w-fill h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative'>
                    {userMovies.map((item, id) => (
                        <div key={id} className='w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor:pointer relative p-2'>
                            <img className='w-full h-auto block' src={`https://image.tmdb.org/t/p/w500/${item?.img}`} alt={item?.title} />
                            <div className='absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white'>
                                <p className='white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center'>
                                    {item?.title}
                                </p>
                                <p onClick={()=>deleteShow(item.id)} className='absolute text-gray-300 top-4 right-4'><AiOutlineClose/></p>
                            </div>
                        </div>
                    ))}
                </div>
                <MdChevronRight onClick={() => slideScroll(slider, 500)} className='bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' size={40} />
            </div> */}
        </>
    )
}

export default SavedShows
//todo: make more DRY. re-use 'like' mechanic on this page. 
//and have 'unlike' be equivalent to deleting from db.