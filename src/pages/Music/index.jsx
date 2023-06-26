import { useState } from 'react'
import ReactPlayer from 'react-player'
import PlayerControls from './PlayerControls'
import { backgrounds } from './backgrounds'
import { useMusicContext } from '../../contexts/MusicContext'

export default function Music() {
    const [background, setBackground] = useState('https://i.giphy.com/media/798oH0WDEQnicM4857/giphy.webp')

    const { isVideoPlaying, setIsVideoPlaying, volume, setVolume } = useMusicContext()

    const changeBackground = () => {
        let newBackground = backgrounds[Math.floor(Math.random()*7)]
        if (newBackground == background) {
            changeBackground()
            return
        }
        setBackground(newBackground)
    }

    return (
        <main
        style={{backgroundImage: `url(${background})`}}
        className={`flex flex-col items-center justify-center w-full overflow-hidden h-screen bg-no-repeat bg-cover bg-center z-10 text-white`}>
            <div className='absolute flex flex-col items-center top-[25%]'>
                <h1 style={{textShadow: "-1px -1px 0 #000, 0   -1px 0 #000, 1px -1px 0 #000, 1px  0   0 #000, 1px  1px 0 #000, 0    1px 0 #000, -1px  1px 0 #000, -1px  0   0 #000"}} className='text-4xl font-bold'>Now Playing</h1>
                <h2 style={{textShadow: "-1px -1px 0 #000, 0   -1px 0 #000, 1px -1px 0 #000, 1px  0   0 #000, 1px  1px 0 #000, 0    1px 0 #000, -1px  1px 0 #000, -1px  0   0 #000"}} className='text-xl font-bold mt-3'>lofi hip hop radio 📚 - beats to relax/study to</h2>
            </div>
            
            <PlayerControls isVideoPlaying={isVideoPlaying} setIsVideoPlaying={setIsVideoPlaying} volume={volume} setVolume={setVolume} changeBackground={changeBackground} />
            
        </main>
    )
}