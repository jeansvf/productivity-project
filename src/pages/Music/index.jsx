import PlayerControls from './PlayerControls'
import { useMusicContext } from '../../contexts/MusicContext'
import { BiLinkExternal } from 'react-icons/bi'
import { useRef, useState } from 'react'
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

    const radiosMenuRef = useRef(null)

    const closeWhenClickOutsideRadiosMenu = (e) => {
        if(radiosMenuRef.current && !radiosMenuRef.current.contains(e.target)) {
            setIsShowing({ ...isShowing, radiosMenu: false })
        }
    }

    return (
        <main onClick={closeWhenClickOutsideRadiosMenu} style={{backgroundImage: `url(${playerSettings.background})`}} className={`relative flex flex-col items-center justify-center w-full overflow-hidden h-screen bg-no-repeat bg-cover bg-center z-10 text-white`}>
            <div className='absolute flex flex-col items-center top-[20%]'>
                <h1 className='text-4xl font-bold' style={{textShadow: "-1px -1px 0 #000, 0   -1px 0 #000, 1px -1px 0 #000, 1px  0   0 #000, 1px  1px 0 #000, 0    1px 0 #000, -1px  1px 0 #000, -1px  0   0 #000"}}>Now Playing</h1>
                <a className='flex items-center justify-center w-full text-xl font-bold mt-3 hover:text-purple-400 max-sm:text-center' href={playerSettings.url} target="_blank" rel="noopener noreferrer" style={{textShadow: "-1px -1px 0 #000, 0   -1px 0 #000, 1px -1px 0 #000, 1px  0   0 #000, 1px  1px 0 #000, 0    1px 0 #000, -1px  1px 0 #000, -1px  0   0 #000"}}>
                    <span className='whitespace-nowrap max-sm:text-[4.1vw]'>{playerSettings.currentRadio}</span>
                    <BiLinkExternal className='stroke-1 stroke-black text-2xl ml-1' />
                </a>
            </div>

            <AnimatePresence>
                {showHints.radiosMenuHint && !isShowing.radiosMenu ? (
                    <div className='fixed bottom-0 w-[99%] mb-[3.75rem] max-sm:mb-14 max-sm:w-[98%]'>
                        <RadiosMenuHint />
                    </div>
                ) : null}
            </AnimatePresence>

            <AnimatePresence>
                {isShowing.radiosMenu ? <RadiosMenu isShowing={isShowing} setIsShowing={setIsShowing} radiosMenuRef={radiosMenuRef} />: null}
            </AnimatePresence>

            <PlayerControls isShowing={isShowing} setIsShowing={setIsShowing} />
        </main>
    )
}