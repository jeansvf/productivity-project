import { motion } from "framer-motion";

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
        className={`relative items-center justify-center w-[94%] ${date ? "py-2" : "py-4"} py-5 opacity-70 select-none`}>

            {date == "placeholder" ? <p className='absolute left-20 top-1/2 -translate-y-1/2 px-3 bg-[#393939]'>mm/yyyy</p> : null}
            {date == "completed" ? <p className='absolute left-20 top-1/2 -translate-y-1/2 px-3 bg-[#393939]'>Completed</p> : null}
            {date == undefined ? null : null}
            {date !== "placeholder" && date !== undefined && date !== "completed" ? <p className='absolute left-20 top-1/2 -translate-y-1/2 px-3 bg-[#393939]'>{month}/{year}</p> : null}
            
            <hr className='w-full' />
        </motion.div>
    )
}