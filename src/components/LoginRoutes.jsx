import { onAuthStateChanged } from "firebase/auth"
import { useState } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { auth } from "../firebase-config"
import LoadingPage from "./LoadingPage"
import Login from "../pages/Login"

export default function LoginRoutes() {
    const [isAuth, setIsAuth] = useState(undefined)
    onAuthStateChanged(auth, (user) => user ? setIsAuth(true) : setIsAuth(false))

    return isAuth ? <Navigate to={"/home"} /> :
    isAuth == false ? <Outlet /> :
    isAuth == undefined ? <LoadingPage /> :
    <Login />
}