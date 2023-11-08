import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ScorePage() {
    const [nickname, setNickname] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        const user = localStorage.getItem("wysaUser");
        if (user) {
            const { nickname } = JSON.parse(user);
            setNickname(nickname);

        }
    }, []);


    function resetData() {
        localStorage.removeItem("wysaUser");
        setNickname("");
        navigate("/");
    }

    return (
        <div className="animate-fade-in flex flex-col justify-center items-center h-screen">
            {nickname && nickname.length ?
                <>
                    <p className="text-4xl text-white font-bold mb-8">
                        Welcome to Wysa, {nickname}!
                    </p>
                    <button
                        className="bg-white text-blue-600 py-2 px-4 rounded-full font-bold shadow-lg hover:bg-blue-600 hover:text-white transition duration-200"
                        onClick={resetData}
                    >
                        Reset Data
                    </button>
                </>
                :
                <>
                    <p className=" text-white">Welcome to Wysa</p>
                    <p className=" text-white">There is no data found! Pease Enter the Data</p>
                    <button className="bg-white text-blue-600 py-2 px-4 rounded-full font-bold shadow-lg hover:bg-blue-600 hover:text-white transition duration-200" onClick={e => navigate('/')}>
                        Enter Data
                    </button>
                </>
            }
        </div>
    )
}