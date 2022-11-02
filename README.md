# netflixclone

Optional chaining: ?. -- used to return undefined instead of throwing error when response is undefined or null.
`<img src='' alt={movie?.title} />`


object-cover: maintain aspect ratio (tailwind)
                `<img className='w-full h-full object-cover' src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`} alt={movie?.title} />`

Firebase:
1. register web app
2. copy/paste firebase sdk to firebase.js (move keys to .env)
3. restart server
4. go to authentication settings in firebase.google.com & enable email/password
5. from docs: import { getAuth } from "firebase/auth"; to firebase.js
6. also add: export const auth = getAuth(app); to bottom (and export app as well)
7. create AuthContext.js:
```Javascript
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
    const [user, setUser] = useState({});

    function signUp(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }
    
    function logIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }
    
    function logOut() {
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => {
            unsubscribe();
        }
    });

    return (
        <AuthContext.Provider value={{ signUp, logIn, logOut, user }}>
            {children}
        </AuthContext.Provider>
    )
}

export function UserAuth() {
    return useContext(AuthContext);
}
```
8. wrap relevant parts of App.js in `<AuthContextProvider>` tags

Problem: How to update the 'hero movie' at the top?
Initial Solution: pass the setHeroMovie function two components deep:
init [heroMovie, setHeroMovie] in Home. Then pass setHeroMovie to each Row. Then have each Row pass the function to each Movie.
New Problem: Sloppy to pass to child, then from child to grandchild.
New solution: Incorporate useContext to the 'deep' children can more easily access state


Ref Vs State
Re-render during every key press:

```javascript
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await logIn(email, password);
      navigate('/');
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  ...
  ...
    <input onChange={(e) => setEmail(e.target.value)} className='p-3 my-2 bg-gray-700 rounded' type='email' placeholder='Email' autoComplete='email' />
    <input onChange={(e) => setPassword(e.target.value)} className='p-3 my-2 bg-gray-700 rounded' type='password' placeholder='Password' autoComplete='current-password' />
  ```

  Only render the new submitted value:
  ```javascript
    const emailRef = useRef();
  const passwordRef = useRef();

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await logIn(emailRef.current.value, passwordRef.current.value);
      navigate('/');
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };
...
    <input ref={emailRef} className='p-3 my-2 bg-gray-700 rounded' type='email' placeholder='Email' autoComplete='email' />
    <input ref={passwordRef} className='p-3 my-2 bg-gray-700 rounded' type='password' placeholder='Password' autoComplete='current-password' />
```