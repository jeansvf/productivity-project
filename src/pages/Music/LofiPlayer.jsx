import ReactPlayer from "react-player";
import { useMusicContext } from "../../contexts/MusicContext";

export default function LofiPlayer() {
    const { playerSettings, skipRadio } = useMusicContext()

    return (
        <div className='absolute -z-50'>
            <div className="absolute bg-[#393939] w-full h-full"></div>
            <ReactPlayer
                playing={playerSettings.isVideoPlaying}
                volume={playerSettings.volume}
                url={playerSettings.url}
                onError={skipRadio}
            />
        </div>
    )
}