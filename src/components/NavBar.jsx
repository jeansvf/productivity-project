import { Link } from "react-router-dom";
import { HiHome } from "react-icons/hi2";
import { GiArcheryTarget, GiMusicalNotes, GiTomato } from "react-icons/gi";
import { IoMdCheckboxOutline } from "react-icons/io";
import profilePic from "../assets/profile-pic.jpg"

export default function NavBar() {
    return (
        <nav className="flex fixed items-center font-bold w-full h-[3.05rem] border-b-[1px] border-white text-lg pl-[.4rem]">
            <Link to={"/home"} className="flex items-center w-[9.3rem] h-10 pt-[.4rem] mr-1 p-1 bg-white hover:opacity-80">
                <HiHome className="ml-1 mr-2 mb-[.2rem] text-[2rem]" /> Home
            </Link>
            <Link to={"/pomodoro"} className="flex items-center w-[9.3rem] h-10 pt-[.4rem] mr-1 p-1 bg-[#FF7373] hover:opacity-80">
                <GiTomato className="ml-1 mr-[.4rem] mb-[.2rem] text-[2rem]" /> Pomodoro
            </Link>
            <Link to={"/music"} className="flex items-center w-[9.3rem] h-10 pt-[.4rem] mr-1 p-1 bg-[#FF71CE] hover:opacity-80">
                <GiMusicalNotes className="ml-1 mr-2 mb-[.2rem] text-[1.9rem]" /> Music
            </Link>
            <Link to={"/todo"} className="flex items-center w-[9.3rem] h-10 pt-[.4rem] mr-1 p-1 bg-[#71EEFF] hover:opacity-80">
                <IoMdCheckboxOutline className="ml-1 mr-1 mb-[.2rem] text-[2rem]" /> Todo
            </Link>
            <Link to={"/goals"} className="flex items-center w-[9.3rem] h-10 pt-[.4rem] mr-1 p-1 bg-[#73FFA3] hover:opacity-80">
                <GiArcheryTarget className="ml-1 mr-1 mb-[.2rem] text-[2rem]" /> Goals
            </Link>
            <Link to={"/profile"} className="absolute right-[.4rem] border-[1px] cursor-pointer rounded-full hover:opacity-80">
                <img className="w-10 h-10 rounded-full" src={profilePic} alt="" />
            </Link>
        </nav>
    )
}