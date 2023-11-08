import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Thirdpage() {
    const [selectedOption, setSelectedOption] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

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

            await fetch("http://localhost:4100/addsleepstruggle", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    struggle: selectedOption,
                    id,
                }),
            });
            navigate(`/q4/${id}`);
        } catch (err: any) {
            toast.error(err.message);
        }

    };

    return (
        <div className="animate-fade-in flex justify-center items-center h-screen bg-gray-800">
            <div className="p-8 bg-gray-900 rounded-lg shadow-xl">
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
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full mt-4"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Thirdpage;