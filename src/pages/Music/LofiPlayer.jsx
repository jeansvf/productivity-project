import ReactPlayer from "react-player"
import { useMusicContext } from "../../contexts/MusicContext"

export default function LofiPlayer() {
    const { playerSettings, skipRadio } = useMusicContext()

    return (
        <div className="absolute left-0 top-0 -z-50">
            <div className="absolute left-0 top-0 w-full h-full bg-[#393939]"></div>
            <ReactPlayer
                playing={playerSettings.isVideoPlaying}
                volume={playerSettings.volume}
                url={playerSettings.url}
                onError={skipRadio}
                width={"100%"}
                height={"100%"}
            />
        </div>
    )
}
