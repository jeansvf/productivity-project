import Radio from './Radio'
import coffeShop from '../../assets/radios/coffe-shop-radio.jpg'
import lofiHipHop from '../../assets/radios/lofi-hip-hop-radio.gif'
import sleep from '../../assets/radios/sleep-radio.jpg'
import synthwave from '../../assets/radios/synthwave-radio.gif'
import { motion } from 'framer-motion'
import { useMusicContext } from '../../contexts/MusicContext'

export default function RadiosMenu({ isShowing, setIsShowing, radiosMenuRef }) {
    const { radios } = useMusicContext()

    return (
        <motion.div
            initial={{
                opacity: 0
            }}
            animate={{
                opacity: 100
            }}
            exit={{
                opacity: 0,
                transition: {
                    delay: .05
                }
            }}
            transition={{
                duration: .1
            }}
            ref={radiosMenuRef}
            className="flex flex-col justify-start absolute left-0 bottom-0 ml-4 mb-16 py-2 w-80 h-[73.4vh] min-h-[11.7rem] px-3 border border-white border-opacity-30 bg-[#111111] bg-opacity-75 rounded-lg font-inter font-medium overflow-y-auto scrollbar-hidden"
        >
            <Radio url={radios.coffe_shop.url} text={radios.coffe_shop.name} image={coffeShop} setIsShowing={setIsShowing} isShowing={isShowing} />
            <Radio url={radios.synthwave.url} text={radios.synthwave.name} image={synthwave} setIsShowing={setIsShowing} isShowing={isShowing} />
            <Radio url={radios.lofi_hip_hop.url} text={radios.lofi_hip_hop.name} image={lofiHipHop} setIsShowing={setIsShowing} isShowing={isShowing} />
            <Radio url={radios.sleep.url} text={radios.sleep.name} image={sleep} setIsShowing={setIsShowing} isShowing={isShowing} />
        </motion.div>
    )
}