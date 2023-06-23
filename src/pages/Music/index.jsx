import { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import PlayerControls from './PlayerControls'
import { backgrounds } from './backgrounds'

export default function Music() {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false)
    const [volume, setVolume] = useState(.5)
    const [background, setBackground] = useState('https://i.giphy.com/media/798oH0WDEQnicM4857/giphy.webp')

    useEffect(() => {
        console.log(background);
    }, [background])
    
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

            <div className='-z-10'>
                <ReactPlayer
                playing={isVideoPlaying}
                volume={volume}
                url='https://www.youtube.com/watch?v=jfKfPfyJRdk&ab_channel=LofiGirl' />
            </div>
        </main>
    )
}