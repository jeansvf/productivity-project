import PlayerControls from './PlayerControls'
import { useMusicContext } from '../../contexts/MusicContext'
import { BiLinkExternal } from 'react-icons/bi'
import { useState } from 'react'
import RadiosMenu from './RadiosMenu'
import { AnimatePresence } from 'framer-motion'
import RadiosMenuHint from './RadiosMenuHint'
import { useHintsContext } from '../../contexts/HintsContext'

export default function Music() {
    const { playerSettings } = useMusicContext()
    const { showHints } = useHintsContext()

    const [isShowing, setIsShowing] = useState({
        volumeInput: false,
        radiosMenu: false,
    })

    return (
        // TODO: change now playing
        // TODO: change color of radio when hovering
        // TODO: cut the start of the sound to make it clearer
        // TODO: animation to radiosmenu appearance
        // TODO: put a scroll on the radios
        // TODO: compress radio images
        // TODO: fix absolute radiosmenu when resizing
        // TODO: new radios menu hint
        
        // TODO: click outside to close radios menu
        // TODO: improve gifs
        // TODO: add gifs https://tenor.com/pt-BR/view/lofi-gif-23550450 https://tenor.com/pt-BR/view/rain-gif-24724128 https://tenor.com/view/90s-anime-raining-droplets-aesthetic-gif-17310556 https://steamuserimages-a.akamaihd.net/ugc/806620367840670314/D07C1C650FC5B78893D4E130B045D0ED13CD0132/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false
        // TODO: current radio indicator when opening radios
        // TODO: if selected radio is the same return
        // TODO: check onError and return
        // TODO: (?) add loading when clicking radio

        <main style={{backgroundImage: `url(${playerSettings.background})`}} className={`relative flex flex-col items-center justify-center w-full overflow-hidden h-screen bg-no-repeat bg-cover bg-center z-10 text-white`}>
            <div className='absolute flex flex-col items-center top-[20%]'>
                <h1 className='text-4xl font-bold' style={{textShadow: "-1px -1px 0 #000, 0   -1px 0 #000, 1px -1px 0 #000, 1px  0   0 #000, 1px  1px 0 #000, 0    1px 0 #000, -1px  1px 0 #000, -1px  0   0 #000"}}>Now Playing</h1>
                <a className='flex items-center justify-center w-full text-xl font-bold mt-3 hover:text-purple-400 max-sm:text-center' href={playerSettings.url} target="_blank" rel="noopener noreferrer" style={{textShadow: "-1px -1px 0 #000, 0   -1px 0 #000, 1px -1px 0 #000, 1px  0   0 #000, 1px  1px 0 #000, 0    1px 0 #000, -1px  1px 0 #000, -1px  0   0 #000"}}>
                    <span className='whitespace-nowrap max-sm:text-[4.1vw]'>{playerSettings.currentRadio}</span>
                    <BiLinkExternal className='stroke-1 stroke-black text-2xl ml-1' />
                </a>
            </div>

                <AnimatePresence>
                    {showHints.radiosMenuHint && !isShowing.radiosMenu ? (
                        <div className='absolute bottom-0 w-[99%] mb-[3.75rem] max-sm:mb-14 max-sm:w-[98%]'>
                            <RadiosMenuHint />
                        </div>
                    ) : null}
                </AnimatePresence>

            <AnimatePresence>
                {isShowing.radiosMenu ? <RadiosMenu isShowing={isShowing} setIsShowing={setIsShowing} />: null}
            </AnimatePresence>

            <PlayerControls isShowing={isShowing} setIsShowing={setIsShowing} />
        </main>
    )
}