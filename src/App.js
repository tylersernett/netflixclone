import { Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Account from "./pages/Account";
import ProtectedRoute from "./components/ProtectedRoute";
import Footer from "./components/Footer";
import { createContext, useState } from "react";

export const HeroContext = createContext(null);

function App() {
  const [heroMovie, setHeroMovie] = useState(null);

  return (
    <>
      <AuthContextProvider>
      <HeroContext.Provider value={{heroMovie, setHeroMovie}}>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/account' element={<ProtectedRoute><Account /></ProtectedRoute>} />
        </Routes>
        <Footer />
        </HeroContext.Provider>
      </AuthContextProvider>
    </>
  );
}

export default App;