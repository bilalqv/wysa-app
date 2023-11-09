import { useEffect, useState } from "react";
// import axios from "../axios";
import { useNavigate } from "react-router-dom";
// import { AiOutlineArrowDown } from 'react-icons/ai';


export default function ResultPage() {
  const [score, setScore] = useState<number | null>(null);
  const [nickname, setNickName] = useState("");
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchScore = async () => {
      try {
        // const response = await axios.get(`/api/results/get?id=${id}`);
        setNickName("Saurabh");
        setScore(80);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchScore();
  }, []);

  const handleContinueClick = () => {
    localStorage.setItem("wysaUser", JSON.stringify({ nickname }));

    navigate('/');
  };

  let quote;
  if (score === null) {
    quote = "Unable to fetch sleep health score";
  } else if (score < 60) {
    quote = "We'll get this up to 80%. You can do it!";
  } else if (score < 80) {
    quote = "You're doing well, but there's room for improvement.";
  } else {
    quote = "Congratulations, you're a sleep champion!";
  }

  return (
    <div className="animate-fade-in flex flex-col justify-center items-center h-screen bg-gray-900">
      {loading ? (
        <p className="text-lg text-white font-bold">Loading...</p>
      ) : score !== null ? (
        <div className="text-center">
          <p className="text-lg text-white font-bold mb-4">
            You seem to have a sleep efficiency of{" "}
            <span className="text-xl">{score}%</span>
          </p>
          <button
            onClick={handleContinueClick}
            className="bg-white text-blue-600 py-2 px-4 rounded-full font-bold shadow-lg hover:bg-blue-600 hover:text-white transition duration-200"
          >
            Continue
          </button>
          <p className="text-white mt-4">{quote} Join Wysa! 😎</p>
        </div>
      ) : (
        <p className="text-lg text-white font-bold">{quote}</p>
      )}
    </div>
  );
};