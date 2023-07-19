import { BsCheckCircle } from "react-icons/bs";
import { MdOutlineClose } from "react-icons/md";

export default function PasswordResetConfirmation({ resetEmail, setShowPasswordResetModal }) {
    return (
        <div className="relative flex flex-col items-center h-[16rem] w-[34rem] px-[1.1rem] py-5 bg-[#333333] rounded-[.3rem] text-white">
            <button onClick={() => setShowPasswordResetModal(false)} className="absolute top-3 right-3 text-4xl" type="button">
                <MdOutlineClose />
            </button>
            <div className="flex text-[#42FF00] text-9xl">
                <BsCheckCircle />
            </div>
            <p className="text-[1.15rem] leading-6 text-center font-medium mt-auto">If an account exists for {resetEmail}, you will get an email to change your password (make sure to check the spam folder)</p>
        </div>
    )
}