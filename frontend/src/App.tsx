import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import Register from "./components/Register";
import Login from "./components/Login";
import SecondPage from "./components/SecondPage";
import Thirdpage from "./components/ThirdPage";
import FourthPage from "./components/FourthPage";
import FifthPage from "./components/FifthPage";
import SixthPage from "./components/SixthPage";
import ScorePage from "./components/ScorePage";
import { AuthProvider } from "./util/auth";
import RequireAuth from "./util/RequireAuth";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RequireAuth><HomePage /></RequireAuth>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/q2" element={<RequireAuth><SecondPage /> </RequireAuth>} />
          <Route path="/q3" element={<RequireAuth><Thirdpage /> </RequireAuth>} />
          <Route path="/q4" element={<RequireAuth><FourthPage /> </RequireAuth>} />
          <Route path="/q5" element={<RequireAuth><FifthPage /> </RequireAuth>} />
          <Route path="/q6" element={<RequireAuth><SixthPage /> </RequireAuth>} />
          <Route path="/score" element={<RequireAuth><ScorePage /> </RequireAuth>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}