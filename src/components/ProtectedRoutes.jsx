import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebase-config"
import { Outlet } from "react-router-dom"
import { useEffect, useState } from "react"
import Login from "../pages/Login"
import LoadingPage from "./LoadingPage"

export default function ProtectedRoutes() {
    const [isAuth, setIsAuth] = useState(undefined)
    onAuthStateChanged(auth, (user) => user ? setIsAuth(true) : setIsAuth(false))

    return isAuth == true ? <Outlet /> : isAuth == undefined ? <LoadingPage /> : <Login />
}