import { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../util/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {

    const nickname = useRef('');
    const password = useRef('');
    const [loading, setLoading] = useState(false);
    const auth = useAuth() as any;
    const navigate = useNavigate();
    const location = useLocation();

    const redirect = location.state?.path || '/';

    async function handleSubmit(e: any) {
        e.preventDefault();
        try {
            setLoading(true);
            await auth.login({ nickname: nickname.current, password: password.current });
            navigate(redirect, { replace: true });

        } catch (err: any) {
            toast.error(err.message, { autoClose: 1500 });
        } finally {
            setLoading(false);
        }

    }

    return (
        <div className="animate-fade-in flex flex-col justify-center items-center h-screen max-[800px]:px-2">
            <p className="text-white text-center py-4 font-bold text-2xl">
                Hey! I'm <span className="text-[#2866c9]">wysa</span>
            </p>
            <p className="text-white text-center py-4">
                Please Login to continue!
            </p>
            <div className="p-5 border border-gray-700 rounded-lg text-white" >
                <p className=" text-center font-bold mb-3 text-lg">Login</p>
                <form method="" onSubmit={handleSubmit} action="#" className=' space-y-3'>
                    <div>
                        <label className=' block'>Nickname: </label>
                        <input onChange={e => nickname.current = e.target.value} className='p-2 bg-gray-700 rounded-md focus:border-blue-100 focus:ring-blue-500' type="text" name="firstName" />
                    </div>

                    <div>
                        <label className=' block'>Password: </label>
                        <input onChange={e => password.current = e.target.value} className='p-2 bg-gray-700 rounded-md focus:border-blue-100 focus:ring-blue-500' type="password" name="password" />
                    </div>

                    <button className=' bg-green-600 p-2 rounded-md hover:bg-green-700 w-max mx-auto' type="submit"> {loading ? 'Wait..' : 'Login'} </button>
                    <ToastContainer />
                </form>
                <p className="pt-6">Not Registed?  <span className=" text-blue-700"> <Link to="/register">Register</Link> </span> </p>
            </div>
        </div>
    )
}