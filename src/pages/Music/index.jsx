import PlayerControls from './PlayerControls'
import { useMusicContext } from '../../contexts/MusicContext'

export default function Music() {
    const { background } = useMusicContext()

    return (
        <main style={{backgroundImage: `url(${background})`}} className={`flex flex-col items-center justify-center w-full overflow-hidden h-screen bg-no-repeat bg-cover bg-center z-10 text-white`}>
            <div className='absolute flex flex-col items-center top-[20%]'>
                <h1 className='text-4xl font-bold' style={{textShadow: "-1px -1px 0 #000, 0   -1px 0 #000, 1px -1px 0 #000, 1px  0   0 #000, 1px  1px 0 #000, 0    1px 0 #000, -1px  1px 0 #000, -1px  0   0 #000"}}>Now Playing</h1>
                <a className='text-xl font-bold mt-3 hover:text-purple-400' href='https://www.youtube.com/watch?v=jfKfPfyJRdk&ab' target="_blank" rel="noopener noreferrer" style={{textShadow: "-1px -1px 0 #000, 0   -1px 0 #000, 1px -1px 0 #000, 1px  0   0 #000, 1px  1px 0 #000, 0    1px 0 #000, -1px  1px 0 #000, -1px  0   0 #000"}}>lofi hip hop radio 📚 - beats to relax/study to</a>
            </div>

            <PlayerControls />

        </main>
    )
}