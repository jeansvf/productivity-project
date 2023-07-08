import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { TfiClose } from "react-icons/tfi";

export default function TemporaryCard({ addNewCard, setShowTemporaryCard }) {
    const [temporaryCardValues, setTemporaryCardValues] = useState({
        color: "78D7FF",
        text: "",
        description: ""
    })

    return (
        <motion.div
        initial={{
            opacity: 0,
            height: 0,
        }}
        animate={{
            opacity: 1,
            height: "14rem"
        }}
        exit={{
            opacity: 0,
            height: 0,
        }}
        className="flex bg-[#4F4F4F] w-full h-56 rounded-[.25rem]">
            <div className={`w-1.5 h-full rounded-tl-[.25rem] rounded-bl-[.25rem] bg-[#${temporaryCardValues.color}]`}></div>
            <div className="flex flex-col w-full h-full">
                <div className="flex items-center h-14">
                    <input autoFocus onChange={(event) => setTemporaryCardValues({ ...temporaryCardValues, text: event.target.value })} className="w-full h-full bg-transparent pl-1.5 outline-none" placeholder="Card Text..." type="text" />
                    <button onClick={() => setShowTemporaryCard(false)} className="mr-2.5 text-sm">
                        <TfiClose />
                    </button>
                </div>
                <textarea onChange={(event) => setTemporaryCardValues({ ...temporaryCardValues, description: event.target.value })} placeholder="Description (optional)..." className="w-full h-full pl-1.5 pt-1 bg-transparent resize-none outline-none"></textarea>
                <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-end h-full self-start px-1.5" >
                        <button onClick={() => setTemporaryCardValues({...temporaryCardValues, color: "FFFFFF"})} className="w-4 h-4 mx-0.5 rounded-sm bg-[#FFFFFF]" type="button"></button>
                        <button onClick={() => setTemporaryCardValues({...temporaryCardValues, color: "78D7FF"})} className="w-4 h-4 mx-0.5 rounded-sm bg-[#78D7FF]" type="button"></button>
                        <button onClick={() => setTemporaryCardValues({...temporaryCardValues, color: "78FF9E"})} className="w-4 h-4 mx-0.5 rounded-sm bg-[#78FF9E]" type="button"></button>
                        <button onClick={() => setTemporaryCardValues({...temporaryCardValues, color: "FFA978"})} className="w-4 h-4 mx-0.5 rounded-sm bg-[#FFA978]" type="button"></button>
                        <button onClick={() => setTemporaryCardValues({...temporaryCardValues, color: "F478FF"})} className="w-4 h-4 mx-0.5 rounded-sm bg-[#F478FF]" type="button"></button>
                    </div>
                    <button onClick={() => addNewCard(temporaryCardValues)} className={`mr-2 px-2 rounded-md text-black bg-[#${temporaryCardValues.color}] hover:opacity-70`} type="button">submit</button>
                </div>
            </div>
        </motion.div>
    )
}