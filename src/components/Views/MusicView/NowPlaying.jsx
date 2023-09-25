import { useMusicContext } from "../../../contexts/MusicContext"

export default function NowPlaying() {
    const { playerSettings } = useMusicContext()

    return (
        <div className="w-[90%] mb-auto mt-6 text-center font-inter max-w-full whitespace-nowrap overflow-hidden text-ellipsis" style={{textShadow: "-1px -1px 0 #000, 0   -1px 0 #000, 1px -1px 0 #000, 1px  0   0 #000, 1px  1px 0 #000, 0    1px 0 #000, -1px  1px 0 #000, -1px  0   0 #000"}}>
            <h1 className='text-xl font-bold mb-1'>Now Playing</h1>
            <span className='text-[1.07rem] font-bold'>{playerSettings.currentRadio}</span>
        </div>
    )
}