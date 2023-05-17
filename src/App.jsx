import { BrowserRouter, Route, Routes } from "react-router-dom"
import Pomodoro from "./pages/Pomodoro/index"
import LandingPage from "./pages/LandingPage/index"
import WithoutNav from "./components/WithoutNav"
import WithNav from "./components/WithNav"

function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route element={<WithNav />}>
            <Route path="/pomodoro" element={<Pomodoro />} />
          </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
