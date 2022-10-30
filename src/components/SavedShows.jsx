import React, { useEffect, useState } from 'react'
import { UserAuth } from '../context/AuthContext'
import { db } from '../firebase'
import { doc, getDoc, onSnapshot } from 'firebase/firestore'
import Row from './Row'

const SavedShows = ({ setHeroMovie }) => {
    const [userMovies, setUserMovies] = useState([]);
    const { user } = UserAuth();

    //userMovies are only refreshed on first page load, so user can like/unlike from account page:
    useEffect(() => {
        const getUserMovies = async () => {
            const userData = doc(db, 'users', `${user?.email}`)
            const userSnap = await getDoc(userData); //all data -- use .savedShows later to just grab the array
            try {
                setUserMovies( userSnap.data().savedShows );
            } catch (error) {
                console.log(error)
            }
        }
        getUserMovies();
    
    }, [user?.email])
    
    //use the following if you want instant refresh of deleted items: (use can't re-like an unliked item)
    // useEffect(() => {
    //     onSnapshot(doc(db, 'users', `${user?.email}`), (doc)=>{
    //         setUserMovies(doc.data()?.savedShows)
    //     })
    // }, [user?.email])  

    return (
        <>
            <Row setHeroMovie={setHeroMovie} title='Saved' movieArrayData={userMovies} />
        </>
    )
}

export default SavedShows