import { BrowserRouter, Route, Routes } from "react-router-dom"
import Pomodoro from "./pages/Pomodoro/index"
import LandingPage from "./pages/LandingPage/index"
import WithoutNav from "./components/WithoutNav"
import WithNav from "./components/WithNav"
import Login from "./pages/Login/index"
import SignUp from "./pages/SignUp/index"

function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route element={<WithNav />}>
            <Route path="/pomodoro" element={<Pomodoro />} />
          </Route>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
