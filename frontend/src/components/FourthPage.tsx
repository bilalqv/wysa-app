import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FourthPage() {
    const [selectedTime, setSelectedTime] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

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

            await fetch("http://localhost:4100/addbedtime", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    sleepTime: selectedTime,
                    id,
                }),
            });
            navigate(`/q5/${id}`);
        } catch (err: any) {
            toast.error(err.message);
        }


    };

    return (
        <div className="animate-fade-in flex justify-center items-center h-screen ">
            <div className="p-8 bg-gray-900 rounded-lg shadow-xl">
                <h2 className="text-white font-semibold mb-4">
                    What time do you usually go to bed for sleep?
                </h2>
                <div className="flex items-center justify-center ">
                    <div className="relative mr-4 ">
                        <input
                            type="time"
                            value={selectedTime}
                            onChange={handleTimeChange}
                            className="pl-2 border border-gray-500 rounded-md py-2 px-2 text-white bg-gray-800 w-32 text-center"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}