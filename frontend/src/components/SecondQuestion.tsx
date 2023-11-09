import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineArrowDown } from 'react-icons/ai';


export default function SecondQuestion() {
    const [selectedOption, setSelectedOption] = useState("");
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


    const handleOptionChange = (event: any) => {
        setSelectedOption(event.target.value);
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        try {
            if (!selectedOption) {
                toast.error("Please select an option");
                return;
            }

            const res = await fetch("https://wysa-app-backend.vercel.app/user/addsleepstruggle", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({
                    struggle: selectedOption,
                    id: user.id,
                }),
            });
            const data = await res.json();
            if (!data.success) throw new Error(data.message);

            navigate('/question3');
        } catch (err: any) {
            toast.error(err.message, { autoClose: 1500 });
        }

    };

    return (
        <div className="animate-fade-in flex justify-center items-center h-screen max-[800px]:px-2">
            <div className="p-8 rounded-lg shadow-xl">
                <h2 className="text-white font-semibold mb-4">
                    That's a great goal. How long have you been struggling with your
                    sleep?
                </h2>
                <form onSubmit={handleSubmit}>
                    <label className="block text-white my-3 rounded-xl p-4 bg-[#386fa6]">
                        <input
                            type="radio"
                            name="struggle"
                            value="Less than 2 weeks"
                            checked={selectedOption === "Less than 2 weeks"}
                            onChange={handleOptionChange}
                        />
                        <span className="ml-2">Less than 2 weeks</span>
                    </label>
                    <label className="block text-white my-3 rounded-xl p-4 bg-[#386fa6]">
                        <input
                            type="radio"
                            name="struggle"
                            value="2 to 8 weeks"
                            checked={selectedOption === "2 to 8 weeks"}
                            onChange={handleOptionChange}
                        />
                        <span className="ml-2">2 to 8 weeks</span>
                    </label>
                    <label className="block text-white my-3 rounded-xl p-4 bg-[#386fa6]">
                        <input
                            type="radio"
                            name="struggle"
                            value="More than 8 weeks"
                            checked={selectedOption === "More than 8 weeks"}
                            onChange={handleOptionChange}
                        />
                        <span className="ml-2">More than 8 weeks</span>
                    </label>
                    <button
                        type="submit"
                        className={`btn-down ${selectedOption != "" ? '' : ' invisible'} `}
                    >
                        <AiOutlineArrowDown />
                    </button>
                </form>
            </div>
        </div>
    );
}