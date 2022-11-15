import React, { useEffect, useState } from 'react'
import { UserAuth } from '../context/AuthContext'
import { db } from '../firebase'
import { doc, getDoc, onSnapshot } from 'firebase/firestore'
import Row from './Row'
import Movie from './Movie'

const SavedShows = ({ setHeroMovie }) => {
    const [userMovies, setUserMovies] = useState([]);
    const { user } = UserAuth();

    //userMovies are only refreshed on first page load, so user can like/unlike from account page:
    useEffect(() => {
        const getUserMovies = async () => {
            const userData = doc(db, 'users', `${user?.email}`)
            const userSnap = await getDoc(userData); //all data -- use .savedShows later to just grab the array
            try {
                setUserMovies(userSnap.data().savedShows.reverse());
            } catch (error) {
                console.log(error)
            }
        }
        getUserMovies();

    }, [user?.email])

    //delayed refresh of deleted items: (use can't re-like an unliked item after X seconds)
    //but: re-liked item moves to end of queue
    // useEffect(() => {
    //     onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
    //         const timeout = setTimeout(() => {
    //             setUserMovies(doc.data()?.savedShows)
    //         }, 3000)

    //         return () => clearTimeout(timeout)
    //     })
    // }, [user?.email])

    //instant refresh of deleted items: (use can't re-like an unliked item)
    // useEffect(() => {
    //     onSnapshot(doc(db, 'users', `${user?.email}`), (doc)=>{
    //         setUserMovies(doc.data()?.savedShows)
    //     })
    // }, [user?.email])  

    return (
        <>
            <div className='flex justify-center '>
                <div className='grid grid-cols-3 gap-2 overflow-x-scroll scrollbar-overflow-x scrollbar-hide  md:grid-cols-4 xl:grid-cols-5'>
                    {userMovies.map((item, id) => (
                        <Movie setHeroMovie={setHeroMovie} item={item} key={id} />
                    ))}

                </div>
            </div>
        </>
    )
}

export default SavedShows