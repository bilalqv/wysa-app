// import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "../util/auth";
import { AiOutlineArrowDown } from 'react-icons/ai';
// import { BsArrowDown } from 'react-icons/bs';


export default function HomePage() {
    const navigate = useNavigate();
    const auth = useAuth() as any;



    function handleClick(e: any) {
        e.preventDefault();
        navigate('/question1');
    }

    function handleLogout(e: any) {
        e.preventDefault();
        auth.logout();
        navigate('/login');
    }

    return (
        <div className="section-style flex-col">
            <p className="text-white text-center py-4 text-2xl">
                Let's start by calculating your sleep efficiency and examining your concerns.
            </p>
            <p className="text-white text-center py-4 text-2xl">
                Over time, we will work together to improve these.
            </p>

            <button className="btn-down" onClick={handleClick}>
                <AiOutlineArrowDown />
            </button>
            <button className="btn-down" onClick={handleLogout}>
                Logout
            </button>

        </div>
    )
}