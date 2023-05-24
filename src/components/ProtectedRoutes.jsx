import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebase-config"
import { Outlet } from "react-router-dom"
import { useState } from "react"
import Login from "../pages/Login"

export default function ProtectedRoutes() {
    const [isAuth, setIsAuth] = useState(false)
    onAuthStateChanged(auth, (user) => user ? setIsAuth(true) : setIsAuth(false))

    return isAuth ? <Outlet /> : <Login />
}