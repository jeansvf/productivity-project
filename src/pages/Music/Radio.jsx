import { BiLinkExternal } from "react-icons/bi";
import { useMusicContext } from "../../contexts/MusicContext";
import radioChange from "../../assets/radios/radio-change.mp3"
import { motion } from "framer-motion";

export default function Radio({ image, text, url, setIsShowing, isShowing, }) {
    const { playerSettings, setPlayerSettings } = useMusicContext()

    const selectRadio = () => {
        if(url === playerSettings.url) {
            return
        }

        setIsShowing({ ...isShowing, radiosMenu: false })
        setPlayerSettings({ ...playerSettings,
            url: url,
            currentRadio: text
        })
        
        let radioSoundEffect = new Audio(radioChange)
        radioSoundEffect.volume = playerSettings.volume
        radioSoundEffect.play()
    }

    return (
        <motion.button
            whileHover={{
                opacity: "75%",
            }}
            onClick={selectRadio}
            className={`relative flex w-full h-[10rem] min-h-[10rem] rounded-xl border-2 my-[.35rem] border-white`}
            style={{ background: `url(${image})`, backgroundSize: "cover", backgroundRepeat: "no-repeat" }}
        >
            <p className="w-full self-end pl-2 py-2 whitespace-nowrap overflow-ellipsis overflow-hidden bg-black bg-opacity-50 text-sm rounded-bl-xl rounded-br-xl">{text}</p>
            <a className="absolute right-0 h-fit m-1.5 hover:text-purple-400" href={url} target="_blank" rel="noopener noreferrer">
                <BiLinkExternal className='stroke-1 stroke-black text-[1.7rem]' />
            </a>
        </motion.button>
    )
}