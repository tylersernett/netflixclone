import React, { useCallback, useContext, useEffect, useState } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { UserAuth } from '../context/AuthContext'
import { db } from '../firebase'
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore'
import { HeroContext } from '../App'
import { LoginTooltip, handleTooltipHide, handleTooltipShow } from './LoginTooltip'; // Import the LoginTooltip component


const Movie = ({ item }) => {
    const [like, setLike] = useState(false);
    const { user } = UserAuth(); //?? maybe unneccessary for every Movie component?
    const userData = doc(db, 'users', `${user?.email}`); //?? maybe unneccessary for every Movie component?
    const { setHeroMovie } = useContext(HeroContext);
    const [showTooltip, setShowTooltip] = useState(false);

    //initialize "like"
    useEffect(() => {
        const getLike = async (passedID) => {
            const userData = doc(db, 'users', `${user?.email}`);
            const userSnap = await getDoc(userData); //all data -- use .savedShows later to just grab the array
            try {
                const result = userSnap.data()?.savedShows.filter((item) => item.id === passedID);
                if (result === undefined || result.length === 0) {
                    setLike(false);
                } else {
                    setLike(true);
                }
            } catch (error) {
                setLike(false);
                console.log(error);
            }
        }

        getLike(item.id);
    }, [user?.email, item.id])

    const deleteShow = useCallback(async (passedID) => {
        const userData = doc(db, 'users', `${user?.email}`)
        const userSnap = await getDoc(userData); //all data -- use .savedShows later to just grab the array
        try {
            const result = userSnap.data().savedShows.filter((item) => item.id !== passedID)
            await updateDoc(userData, {
                savedShows: result
            })
        } catch (error) {
            console.log(error)
        }
    }, [user?.email]);

    const toggleSave = useCallback(async () => {
        if (user?.email) {
            if (!like) {
                setLike(true);
                await updateDoc(userData, {
                    savedShows: arrayUnion({
                        id: item.id,
                        title: item.title,
                        backdrop_path: item.backdrop_path,
                        release_date: item.release_date,
                        overview: item.overview
                    })
                });
            } else {
                setLike(false);
                deleteShow(item.id);
            }
        }
    }, [user?.email, like, userData, item, deleteShow])

    const updateHeroMovie = () => {
        setHeroMovie(item);
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }

    const handleTooltipShowWrapper = () => handleTooltipShow(setShowTooltip);
    const handleTooltipHideWrapper = () => handleTooltipHide(setShowTooltip);

    return (
        <>
            <div className='w-[170px] sm:w-[200px] md:w-[205px] lg:w-[270px] inline-block relative p-2'>
                <LoginTooltip showTooltip={showTooltip} />
                <img className='w-full h-auto' src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`} alt={item?.title} />
                <div className='absolute top-0 left-0 w-full h-full hover:bg-black/80 transition-opacity ease-in duration-150 opacity-0 hover:opacity-100 text-white'>
                    <p onClick={updateHeroMovie} className='whitespace-normal  text-xs md:text-sm font-bold flex justify-center items-center h-full text-center'>
                        <span className='p-3 cursor-pointer'>{item?.title}</span>
                    </p>
                    <div
                        onClick={toggleSave}
                        onMouseEnter={handleTooltipShowWrapper}
                        onMouseLeave={handleTooltipHideWrapper}
                        className={user ? 'cursor-pointer' : ''}
                    >
                        {like ? (
                            <FaHeart className='absolute top-4 left-4 text-gray-300' />
                        ) : (
                            <FaRegHeart className='absolute top-4 left-4 text-gray-300' />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Movie