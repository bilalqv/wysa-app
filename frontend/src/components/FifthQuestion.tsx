import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineArrowDown } from 'react-icons/ai';


export default function FifthQuestion() {
  const [selectedHours, setSelectedHours] = useState(0);
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


  const handleHoursChange = (event: any) => {
    setSelectedHours(parseInt(event.target.value));
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      if (selectedHours === 0) {
        toast.error("Please choose any one option");
        return;
      }

      const res = await fetch("https://wysa-app-backend.vercel.app/user/addsleephours", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          sleepHours: selectedHours,
          id: user.id,
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message)

      navigate(`/score`);
    } catch (err: any) {
      toast.error(err.message, { autoClose: 1500 });
    }

  };

  const options = [];
  for (let i = 1; i <= 12; i++) {
    options.push(
      <option key={i} value={i}>
        {i} hrs
      </option>
    );
  }

  return (
    <div className="section-style">
      <div className="p-8  rounded-lg shadow-xl">
        <h2 className="text-white font-semibold mb-4">
          Ok. How many hours of sleep do you get in a typical night?
        </h2>
        <div className="items-center justify-center ">
          <div className="">
            <select
              value={selectedHours}
              onChange={handleHoursChange}
              className="border border-gray-500 rounded-md p-2 text-white bg-gray-800 text-center"
            >
              {options}
            </select>
          </div>
          <button
            type="submit"
            className={`btn-down ${selectedHours > 0 ? '' : ' invisible'} `}
            onClick={handleSubmit}
          >
            <AiOutlineArrowDown />
          </button>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}