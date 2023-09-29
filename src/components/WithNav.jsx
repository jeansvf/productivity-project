import {Outlet} from "react-router-dom"
import NavBar from "./Navbar"
import {useMusicContext} from "../contexts/MusicContext"
import LofiPlayer from "../pages/Music/LofiPlayer"
import Views from "./Views/Views"
import Hints from "./Hints/Hints"

export default function WithNav() {
    const {playerSettings} = useMusicContext()

    return (
        <>
            {playerSettings.isVideoPlaying ? <LofiPlayer /> : null}
            <Hints />
            <Views />
            <NavBar />
            <Outlet />
        </>
    )
}
