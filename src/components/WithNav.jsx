import { Outlet } from "react-router-dom";
import NavBar from "./Navbar";
import { useMusicContext } from "../contexts/MusicContext";
import LofiPlayer from "../pages/Music/LofiPlayer";

export default function WithNav() {
    const { isVideoPlaying } = useMusicContext()
    return (
        <>
            {isVideoPlaying ? <LofiPlayer /> : null}
            <NavBar />
            <Outlet />
        </>
    )
}