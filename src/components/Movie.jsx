import React, { useEffect, useState } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore'

const Movie = ({ item }) => {
    const [like, setLike] = useState(false);
    const [userMovies, setUserMovies] = useState([]);
    const { user } = UserAuth();
    const userData = doc(db, 'users', `${user?.email}`)

    //initialize "like"
    useEffect(() => {
        const getLike = async (passedID) => {
            const userData = doc(db, 'users', `${user?.email}`)
            const userSnap = await getDoc(userData); //all data -- use .savedShows later to just grab the array
            try {
                const result = userSnap.data().savedShows.filter((item) => item.id === passedID)
                console.log(result.length);
                if (result.length === 0) {
                    setLike(false);
                } else {
                    setLike(true);
                }
            } catch (error) {
                setLike(false);
                console.log(error)
            }
        }

        getLike(item.id);
    }, [user?.email, item.id])



    const deleteShow = async (passedID) => {
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
    }

    const saveShow = async () => {
        if (user?.email) { //if user logged in...
            if (!like) {
                setLike(true);
                await updateDoc(userData, {
                    savedShows: arrayUnion({
                        id: item.id,
                        title: item.title,
                        backdrop_path: item.backdrop_path
                    })
                })
            } else {
                setLike(false);
                deleteShow(item.id)
            }
        } else {
            alert('Please log in to save shows/movies')
        }
    }

    return (
        <div className='w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor:pointer relative p-2'>
            <img className='w-full h-auto block' src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`} alt={item?.title} />
            <div className='absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white'>
                <p className='white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center'>
                    {item?.title}
                </p>
                <p onClick={saveShow}>
                    {like ? (
                        <FaHeart className='absolute top-4 left-4 text-gray-300' />
                    ) : (
                        <FaRegHeart className='absolute top-4 left-4 text-gray-300' />
                    )}
                </p>
            </div>
        </div>
    )
}

export default Movie