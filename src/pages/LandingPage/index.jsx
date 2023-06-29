import { FcGoogle } from "react-icons/fc"
import { Link } from "react-router-dom"

export default function LandingPage() {
    return (
        <main className="flex flex-col w-full h-screen bg-gradient-to-tr from-[#323232] to-[#131313]">
            <h1 className="text-white mt-32 font-ubuntu text-7xl mx-auto text-center">
                <div className="flex"><p className="text-[#FF7373]">Placeholder</p>, the platform to </div>study and focus
            </h1>
            <div className="flex mx-auto mt-14">
                <Link to={"/signup"} className="flex items-center justify-center w-[17rem] h-11 text-white bg-[#404040] rounded-full text-lg mr-6">Start with email</Link>
                <Link to={"/signup"} className="flex items-center justify-center w-[17rem] h-11 bg-white rounded-full text-lg"><FcGoogle className="w-9 h-9 m-2" /> Start with Google</Link>
            </div>
        </main>
    )
}