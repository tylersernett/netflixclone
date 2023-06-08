import { UserAuth } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom'

function GuestButton() {
    const { guestLogIn } = UserAuth();
    const navigate = useNavigate();

    const handleGuestLogIn = async () => {
        try {
            await guestLogIn();
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <button onClick={handleGuestLogIn} className='bg-purple-700 hover:bg-purple-800 w-full py-3 my-6 rounded font-bold' >Guest Login</button>
        </>
    );
}

export default GuestButton;
