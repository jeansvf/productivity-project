import { AnimatePresence, motion } from "framer-motion";

export default function DateLine({ date }) {
    var month = [];
    var year = [];

    // format date from the date input
    for (let i=0; i < date?.length; i++) {
        if (i < 4 && date[i] != "/") {
            year[i] = date[i]
        }
        if (i < 7 && i > 4 && date[i] != "/") {
            month[i] = date[i]
        }
    }

    return (
        <motion.div 
        initial={{
            width: "40%"
        }}
        animate={{
            width: "90%"
        }}
        exit={{
            width: "40%",
            opacity: 0
        }}
        className={`flex items-center justify-center w-[90%] ${date ? "my-2" : "my-4"} opacity-70 select-none`}>
            <hr className={`${date == undefined ? "w-[8%]" : "w-[5%]"}`} />

            {date == "placeholder" ? <p className='text-white w-[4%] mx-2 text-center'>mm/yyyy</p> : null}
            {date == undefined ? null : null}
            {date !== "placeholder" && date !== undefined ? <p className='text-white w-[4%] mx-2 text-center'>{month}/{year}</p> : null}
            
            <hr className='w-[92%]' />
        </motion.div>
    )
}