import { BrowserRouter, Route, Routes } from "react-router-dom"
import Pomodoro from "./pages/Pomodoro/index"
import LandingPage from "./pages/LandingPage/index"
import Login from "./pages/Login/index"
import SignUp from "./pages/SignUp/index"
import Home from "./pages/Home"
import WithNav from "./components/WithNav"
import WithoutNav from "./components/WithoutNav"
import LoginRoutes from "./components/LoginRoutes"
import ProtectedRoutes from "./components/ProtectedRoutes"
import Todo from "./pages/Todo"
import Goals from "./pages/Goals"
import Profile from "./pages/Profile"

function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route element={<LoginRoutes />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>

          <Route element={<ProtectedRoutes />}>
            <Route element={<WithNav />}>
              <Route path="/home" element={<Home />} />
              <Route path="/pomodoro" element={<Pomodoro />} />
              <Route path="/todo" element={<Todo />} />
              <Route path="/goals" element={<Goals />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
