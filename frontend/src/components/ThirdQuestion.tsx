import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ArrowButton from "./ArrowButton";


export default function ThirdQuestion() {
    const [selectedTime, setSelectedTime] = useState("");
    const navigate = useNavigate();
    const [user, setUser] = useState({} as any);

    useEffect(() => {
        const data = localStorage.getItem("wysaUser");
        if (data) {
            setUser(JSON.parse(data));
        } else {
            navigate("/login");
        }
    }, []);

    const handleTimeChange = (event: any) => {
        setSelectedTime(event.target.value);
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        try {
            if (selectedTime === "") {
                toast.error("Please select a sleep time");
                return;
            }

            const res = await fetch("https://wysa-app-backend.vercel.app/user/addbedtime", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({
                    sleepTime: selectedTime,
                    id: user.id,
                }),
            });
            const data = await res.json();
            if (!data.success) throw new Error(data.message);

            navigate('/question4');
        } catch (err: any) {
            toast.error(err.message, { autoClose: 1500 });
        }
    };

    return (
        <div className="section-style ">
            <div className="p-6 rounded-md shadow-md">
                <p className="question-title">
                    What time do you usually go to bed for sleep?
                </p>
                <div className="">
                    <div className=" ">
                        <input
                            type="time"
                            value={selectedTime}
                            onChange={handleTimeChange}
                            className="pl-2 border border-gray-500 rounded-md py-2 px-2 text-white bg-gray-800 w-32 text-center"
                        />
                    </div>
                    <ArrowButton cssClass={`${selectedTime != "" ? '' : ' invisible'}`} handleSubmit={handleSubmit}  />

                    <ToastContainer />
                </div>
            </div>
        </div>
    );
}