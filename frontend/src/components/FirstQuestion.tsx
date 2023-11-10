import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineArrowDown } from 'react-icons/ai';


export default function FirstQuestion() {
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

    const [answers, setAnswers] = useState({
        sleepEasily: false,
        sleepThroughNight: false,
        wakeUpRefreshed: false,
    });

    const options = [
        {
            id: 1,
            title: "I would go to sleep easily",
            name: "sleepEasily",
        },
        {
            id: 2,
            title: "I would sleep through the night",
            name: "sleepThroughNight",
        },
        {
            id: 3,
            title: "I'd wake up on time, refreshed",
            name: "wakeUpRefreshed",
        }
    ];


    const selectedAnswers = Object.keys(answers).filter((key: string) => answers[key as keyof typeof answers]);

    async function handleSubmit(e: any) {
        e.preventDefault();
        try {
            if (selectedAnswers.length === 0) {
                toast.error("Please select at least one option");
                return;
            }

            const res = await fetch("https://wysa-app-backend.vercel.app/user/addsleepchanges", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({
                    changes: selectedAnswers,
                    id: user.id,
                }),
            });
            const data = await res.json();
            if (!data.success) throw new Error(data.message);

            navigate('/question2');
        } catch (err: any) {
            toast.error(err.message, { autoClose: 1500 });
        }
    }


    function handleOptionChange(e: any) {
        const { name, checked } = e.target;
        setAnswers((prevState) => ({ ...prevState, [name]: checked }));
    }
    return (
        <div className="section-style">
            <div className="p-6 rounded-md shadow-md">
                <p className="question-title">
                    Let's say in a few weeks, you're sleeping well. What would change?
                </p>
                <p className="text-white mb-4">
                    Select all the changes you would like to see
                </p>

                <form onSubmit={handleSubmit}>
                    {
                        options.map((option, index) => {
                            return (
                                <label className="block text-white my-3 rounded-xl p-4 bg-[#386fa6]" key={index}>
                                    <input
                                        type="checkbox"
                                        name={option.name}
                                        checked={answers[option.name as keyof typeof answers]}
                                        onChange={handleOptionChange}
                                    />
                                    <span className="ml-2">{option.title}</span>
                                </label>
                            )
                        })
                    }
                    <button
                        type="submit"
                        className={`btn-down ${selectedAnswers.length > 0 ? '' : ' invisible'} `}
                    >
                        <AiOutlineArrowDown />
                    </button>

                </form>
                <ToastContainer />
            </div>
        </div>
    )
}