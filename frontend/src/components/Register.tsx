import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function Register() {

    const nickname = useRef('');
    const password = useRef('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e: any) {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await fetch("https://wysa-app-backend.vercel.app/user/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nickname: nickname.current,
                    password: password.current
                }),
            });
            const data = await res.json();
            if (!data.success) throw new Error(data.message);
            toast.success('Registered!');
            navigate('/login');
        } catch (err: any) {
            toast.error(err.message, { autoClose: 1500 });
        } finally {
            setLoading(false);
        }

    }

    return (
        <div className="section-style flex-col">
            <p className="text-white text-center py-4 font-bold text-2xl">
                Hey! I'm <span className="text-[#2866c9]">wysa</span>
            </p>
            <p className="text-white text-center py-4">
                Please Register to continue!
            </p>
            <div className="p-5 border border-gray-700 rounded-lg text-white" >
                <p className=" text-center font-bold mb-3 text-lg">Register</p>
                <form method="" onSubmit={handleSubmit} action="#" className=' space-y-3'>
                    <div>
                        <label className=' block'>Nickname: </label>
                        <input onChange={e => nickname.current = e.target.value} className='p-2 bg-gray-700 rounded-md focus:border-blue-100 focus:ring-blue-500' type="text" name="firstName" />
                    </div>

                    <div>
                        <label className=' block'>Password: </label>
                        <input onChange={e => password.current = e.target.value} className='p-2 bg-gray-700 rounded-md focus:border-blue-100 focus:ring-blue-500' type="password" name="password" />
                    </div>

                    <button className=' bg-green-600 p-2 rounded-md hover:bg-green-700 w-max mx-auto' type="submit"> {loading ? 'Registering' : 'Register'} </button>
                    <ToastContainer />
                </form>
                <p className="pt-6">Already Registed?  <span className=" text-blue-700"> <Link to="/login">Login</Link> </span> </p>
            </div>
            <div className="my-4">
                <p
                    className=" text-white text-sm text-center"
                >By continuing, I confirm I am 13 or older and accept the Terms of Service and Privacy Policy</p>
            </div>
        </div>
    )
}