import ReactPlayer from "react-player";
import { useMusicContext } from "../../contexts/MusicContext";

export default function LofiPlayer() {
    const { isVideoPlaying, volume } = useMusicContext()

    return (
        // add div to hide player
        <div className='absolute -z-50'>
            <ReactPlayer
            playing={isVideoPlaying}
            volume={volume}
            url='https://www.youtube.com/watch?v=jfKfPfyJRdk&ab' />
        </div>
    )
}