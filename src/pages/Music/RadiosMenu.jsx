import Radio from './Radio'
import coffeShop from '../../assets/radios/coffe-shop-radio.jpg'
import lofiHipHop from '../../assets/radios/lofi-hip-hop-radio.gif'
import sleep from '../../assets/radios/sleep-radio.jpg'
import synthwave from '../../assets/radios/synthwave-radio.gif'
import { motion } from 'framer-motion'

export default function RadiosMenu({ isShowing, setIsShowing }) {
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
            className="flex flex-col justify-start absolute left-0 bottom-0 ml-4 mb-16 py-2 w-80 h-[73.4vh] min-h-[11.7rem] px-3 border border-white border-opacity-30 bg-[#111111] bg-opacity-80 rounded-lg font-inter font-medium overflow-y-auto scrollbar-hidden"
        >
            <Radio url={"https://www.youtube.com/watch?v=lP26UCnoH9s&ab_channel=STEEZYASFUCK"} text={"Coffee Shop Radio ☕ - 24/7 lofi & jazzy hip-hop beats"} image={coffeShop} setIsShowing={setIsShowing} isShowing={isShowing} />
            <Radio url={"https://www.youtube.com/watch?v=4xDzrJKXOOY&ab_channel=LofiGirl"} text={"synthwave radio 🌌 - beats to chill/game to"} image={synthwave} setIsShowing={setIsShowing} isShowing={isShowing} />
            <Radio url={"https://www.youtube.com/watch?v=jfKfPfyJRdk&ab_channel=LofiGirl"} text={"lofi hip hop radio 📚 - beats to relax/study to"} image={lofiHipHop} setIsShowing={setIsShowing} isShowing={isShowing} />
            <Radio url={"https://www.youtube.com/watch?v=rUxyKA_-grg&ab_channel=LofiGirl"} text={"lofi hip hop radio 💤 - beats to sleep/chill to"} image={sleep} setIsShowing={setIsShowing} isShowing={isShowing} />
        </motion.div>
    )
}