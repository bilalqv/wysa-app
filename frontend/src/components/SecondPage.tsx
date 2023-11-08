import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function SecondPage() {
    const navigate = useNavigate();

    const [options, setOptions] = useState({
        fallAsleep: false,
        sleepThroughNight: false,
        wakeUpRefreshed: false,
    });

    const { id } = useParams();

    async function handleSubmit(e: any) {
        e.preventDefault();
        try {
            const selectedOptions = Object.keys(options).filter((key: any) => options[key]);

            if (selectedOptions.length === 0) {
                toast.error("Please select at least one option");
                return;
            }

            await fetch("http://localhost:4100/addsleepchanges", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    changes: selectedOptions,
                    id,
                }),
            });

            navigate(`/q3/${id}`);
        } catch (err: any) {
            toast.error(err.message);
        }
    }


    function handleOptionChange(e: any) {
        const { name, checked } = e.target;
        setOptions((prevState) => ({ ...prevState, [name]: checked }));
    }
    return (
        <div className="animate-fade-in flex justify-center items-center h-screen bg-[#111633]">
            <div className="p-8 bg-gray-900 rounded-lg shadow-xl">
                <h2 className="text-white font-semibold mb-4 text-2xl">
                    Let's say in a few weeks, you're sleeping well. What would change?
                </h2>
                <p className="text-white font-semibold mb-4">
                    Select all the changes you would like to see
                </p>

                <form onSubmit={handleSubmit}>
                    <label className="block text-white my-3 rounded-xl p-4 bg-[#386fa6]">
                        <input
                            type="checkbox"
                            name="fallAsleep"
                            checked={options.fallAsleep}
                            onChange={handleOptionChange}
                        />
                        <span className="ml-2">I would go to sleep easily</span>
                    </label>
                    <label className="block text-white my-3 rounded-xl p-4 bg-[#386fa6]">
                        <input
                            type="checkbox"
                            name="sleepThroughNight"
                            checked={options.sleepThroughNight}
                            onChange={handleOptionChange}
                        />
                        <span className="ml-2">I would sleep through the night</span>
                    </label>
                    <label className="block text-white my-3 rounded-xl p-4 bg-[#386fa6]">
                        <input
                            type="checkbox"
                            name="wakeUpRefreshed"
                            checked={options.wakeUpRefreshed}
                            onChange={handleOptionChange}
                        />
                        <span className="ml-2">I would wake up on time, refreshed</span>
                    </label>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full mt-4"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}