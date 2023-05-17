import { Outlet } from "react-router-dom";
import NavBar from "./Navbar";

export default function WithNav() {
    return (
        <>
        <NavBar />
        <Outlet />
        </>
    )
}