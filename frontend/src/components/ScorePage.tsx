import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { AiOutlineArrowDown } from 'react-icons/ai';
import { useAuth } from "../util/auth";

export default function ScorePage() {
    const navigate = useNavigate();
    const [user, setUser] = useState({} as any);
    const [score, setScore] = useState(0);

    useEffect(() => {
        async function getSleepScore() {
            const data = localStorage.getItem("wysaUser");
            if (data) {
                const userData = JSON.parse(data);
                setUser(userData);
                const res = await fetch("https://wysa-app-backend.vercel.app/user/getsleepscore", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${userData.token}`,
                    },
                    body: JSON.stringify({
                        id: userData.id,
                    }),
                });
                const resData = await res.json();
                if (!resData.success) {
                    navigate("/login");
                } else {
                    setScore(resData.sleepScore);
                }
            } else {
                navigate("/login");
            }
        }
        getSleepScore();
    }, []);

    const auth = useAuth() as any;
    async function resetData() {
        await auth.logout();
        navigate('/login');
    }
    function reEnterData() {
        navigate('/');
    }

    const loginClick = () => {
        navigate('/login');
    }

    return (
        <div className="section-style flex-col">
            {user && user.nickname ?
                <>
                    <p className="text-xl text-white mb-8">
                        You seem to have a sleep efficiency of {score} %. That's great!
                    </p>
                    <p className="text-xl text-white mb-8"  >
                        A higher sleep efficiency means a more refreshing and energizing sleep, which can help you move into your day with a sence of lightness and ease.
                    </p>
                    <div className="flex space-x-4">

                        <button
                            className="btn-down transition duration-200"
                            onClick={resetData}
                        >
                            Logout
                        </button>
                        <button
                            className="btn-down transition duration-200"
                            onClick={reEnterData}
                        >
                            Re-Enter Data
                        </button>
                    </div>
                </>
                :
                <>
                    <p className=" text-white">Welcome to Wysa</p>
                    <p className=" text-white">There is no data found! Pease Login</p>
                    <button className="btn-down transition duration-200" onClick={loginClick}>
                        Login
                    </button>
                </>
            }
        </div>
    )
}