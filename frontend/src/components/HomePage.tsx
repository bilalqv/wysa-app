import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function HomePage() {
    const navigate = useNavigate();



    function handleClick(e: any) {
        e.preventDefault();
        navigate('/q2/1');
    }

    return (
        <div className="animate-fade-in flex flex-col justify-center items-center h-screen bg-[#111633]">
            <p className="text-white text-center py-4 text-2xl">
                Let's start by calculating your sleep efficiency and examining your concerns.
            </p>
            <p className="text-white text-center py-4 text-2xl">
                Over time, we will work together to improve these.
            </p>

            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full mt-4" onClick={handleClick}>Start </button>

        </div>
    )
}