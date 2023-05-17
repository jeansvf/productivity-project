import { Link } from "react-router-dom";

export default function LandingPage() {
    return (
        <Link to={"/pomodoro"} className="px-2 bg-red-300 rounded-md">pomodoro</Link>
    )
}