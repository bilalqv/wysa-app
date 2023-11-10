import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ArrowButton from "./ArrowButton";


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
      <div className="p-6 rounded-md shadow-md">
        <p className="question-title">
          Ok. How many hours sleep do you get in a typical night?
        </p>
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
          
          <ArrowButton cssClass={`${selectedHours > 0 ? '' : ' invisible'}`} handleSubmit={handleSubmit} />
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}