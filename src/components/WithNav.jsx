import { Outlet } from "react-router-dom";
import NavBar from "./Navbar";
import { useMusicContext } from "../contexts/MusicContext";
import LofiPlayer from "../pages/Music/LofiPlayer";

export default function WithNav() {
    const { playerSettings } = useMusicContext()
    return (
        <>
            {playerSettings.isVideoPlaying ? <LofiPlayer /> : null}
            <NavBar />
            <Outlet />
        </>
    )
}