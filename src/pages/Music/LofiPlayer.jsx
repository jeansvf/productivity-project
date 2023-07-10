import ReactPlayer from "react-player";
import { useMusicContext } from "../../contexts/MusicContext";

export default function LofiPlayer() {
    const { isVideoPlaying, volume } = useMusicContext()

    return (
        // add div to hide player
        <div className='absolute -z-50'>
            <div className="absolute bg-[#393939] w-full h-full"></div>
            <ReactPlayer
            playing={isVideoPlaying}
            volume={volume}
            url='https://www.youtube.com/watch?v=jfKfPfyJRdk&ab' />
        </div>
    )
}