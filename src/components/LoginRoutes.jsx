import { onAuthStateChanged } from "firebase/auth"
import { useState } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { auth } from "../firebase-config"

export default function LoginRoutes() {
    const [isAuth, setIsAuth] = useState(false)
    onAuthStateChanged(auth, (user) => user ? setIsAuth(true) : setIsAuth(false))

    return isAuth ? <Navigate to={"/home"} /> : <Outlet />
}