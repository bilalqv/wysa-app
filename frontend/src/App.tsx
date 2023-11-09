import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import Register from "./components/Register";
import Login from "./components/Login";
import ScorePage from "./components/ScorePage";
import { AuthProvider } from "./util/auth";
import RequireAuth from "./util/RequireAuth";
import FirstQuestion from "./components/FirstQuestion";
import SecondQuestion from "./components/SecondQuestion";
import ThirdQuestion from "./components/ThirdQuestion";
import FourthQuestion from "./components/FourthQuestion";
import FifthQuestion from "./components/FifthQuestion";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RequireAuth><HomePage /></RequireAuth>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/question1" element={<RequireAuth><FirstQuestion /> </RequireAuth>} />
          <Route path="/question2" element={<RequireAuth><SecondQuestion /> </RequireAuth>} />
          <Route path="/question3" element={<RequireAuth><ThirdQuestion /> </RequireAuth>} />
          <Route path="/question4" element={<RequireAuth><FourthQuestion /> </RequireAuth>} />
          <Route path="/question5" element={<RequireAuth><FifthQuestion /> </RequireAuth>} />
          <Route path="/score" element={<RequireAuth><ScorePage /> </RequireAuth>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}