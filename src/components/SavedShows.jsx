import React, { useEffect, useState } from 'react'
import { UserAuth } from '../context/AuthContext'
import { db } from '../firebase'
import { doc, onSnapshot } from 'firebase/firestore'
import Row from './Row'

const SavedShows = ({setHeroMovie}) => {
    const [userMovies, setUserMovies] = useState([]);
    const { user } = UserAuth();

    useEffect(() => {
        onSnapshot(doc(db, 'users', `${user?.email}`), (doc)=>{
            setUserMovies(doc.data()?.savedShows)
        })
    }, [user?.email])  

    return (
        <>
            <Row setHeroMovie={setHeroMovie} title='Saved' movieArrayData={userMovies} />
        </>
    )
}

export default SavedShows