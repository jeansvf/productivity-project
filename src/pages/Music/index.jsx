import PlayerControls from './PlayerControls'
import { useMusicContext } from '../../contexts/MusicContext'

export default function Music() {
    const { background } = useMusicContext()

    return (
        <main
        style={{backgroundImage: `url(${background})`}}
        className={`flex flex-col items-center justify-center w-full overflow-hidden h-screen bg-no-repeat bg-cover bg-center z-10 text-white`}>
            <div className='absolute flex flex-col items-center top-[25%]'>
                <h1 style={{textShadow: "-1px -1px 0 #000, 0   -1px 0 #000, 1px -1px 0 #000, 1px  0   0 #000, 1px  1px 0 #000, 0    1px 0 #000, -1px  1px 0 #000, -1px  0   0 #000"}} className='text-4xl font-bold'>Now Playing</h1>
                <h2 style={{textShadow: "-1px -1px 0 #000, 0   -1px 0 #000, 1px -1px 0 #000, 1px  0   0 #000, 1px  1px 0 #000, 0    1px 0 #000, -1px  1px 0 #000, -1px  0   0 #000"}} className='text-xl font-bold mt-3'>lofi hip hop radio 📚 - beats to relax/study to</h2>
            </div>
            
            {/* fix this */}
            <PlayerControls />
            
        </main>
    )
}