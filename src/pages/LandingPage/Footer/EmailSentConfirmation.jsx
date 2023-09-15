import { BsCheckCircle } from "react-icons/bs";

export default function EmailSentConfirmation() {
    return (
        <div className="absolute top-1/2 -translate-y-1/2 left-12 flex flex-col items-center h-[12rem] rounded-[.3rem] text-white">
            <div className="flex text-[#42FF00] text-9xl">
                <BsCheckCircle />
            </div>
            <p className="text-[1.15rem] leading-6 text-center font-medium mt-auto">Email sent.<br /> Thanks for the feedback!</p>
        </div>
    )
}