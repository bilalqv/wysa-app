import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineArrowDown } from 'react-icons/ai';


export default function SecondQuestion() {
    const [selectedOption, setSelectedOption] = useState("");
    const [user, setUser] = useState({} as any);
    const navigate = useNavigate();

    const options = [
        {
            id: 1,
            title: "Less than 2 weeks",
            value: "Less than 2 weeks",
        },
        {
            id: 2,
            title: "2 to 8 weeks",
            value: "2 to 8 weeks",
        },
        {
            id: 3,
            title: "More than 8 weeks",
            value: "More than 8 weeks",
        }
    ];

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
        <div className="section-style">
            <div className="p-6 rounded-md shadow-md">
                <p className="question-title">
                    That's a great goal. How long have you been struggling with your
                    sleep?
                </p>
                <form onSubmit={handleSubmit}>
                    {
                        options.map((option, index) => {
                            return (
                                <label className="block text-white my-3 rounded-xl p-4 bg-[#386fa6]" key={index}>
                                    <input
                                        type="radio"
                                        name="struggle"
                                        value={option.value}
                                        checked={selectedOption === option.value}
                                        onChange={handleOptionChange}
                                    />
                                    <span className="ml-2">{option.title}</span>
                                </label>
                            )
                        })
                    }
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