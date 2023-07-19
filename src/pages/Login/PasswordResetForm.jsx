import { motion } from "framer-motion"
import { MdOutlineClose } from "react-icons/md"
import LoadingAnimation from "../../components/LoadingAnimation"

export default function PasswordResetModal({ resetPassword, setShowPasswordResetModal, setResetEmail, sending }) {
    return (
        <motion.form
            onSubmit={(event) => {
                event.preventDefault()
                resetPassword()
            }}
            initial={{ opacity: 0, y: "-30" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-30" }}
            transition={{ duration: .2 }}
            className="flex flex-col h-[16rem] w-[34rem] px-[1.1rem] py-5 bg-[#333333] rounded-[.3rem] text-white"
        >
            <div className="flex w-full items-start">
                <p className="text-[1.6rem] leading-8 font-semibold">Enter your e-mail to reset your password</p>
                <button onClick={() => setShowPasswordResetModal(false)} className="text-4xl" type="button">
                    <MdOutlineClose />
                </button>
            </div>
            <div className="mt-auto">
                <input onChange={(e) => setResetEmail(e.target.value)} className='mb-4 text-lg font-medium text-white pl-2 h-[3rem] w-full rounded-[.3rem] bg-[#393939] outline-white border-[1px] border-white' type="email" placeholder="E-mail" />
                
                <div className="relative w-full h-[3rem] bg-white hover:bg-[#FF7373] text-black hover:text-white transition-colors rounded-md font-semibold">
                    <input className='w-full h-full cursor-pointer text-lg text-center' type="submit" value={!sending ? "Reset Password" : ""} />
                    {sending ? (
                        <div className='absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-inherit pointer-events-none'>
                            <LoadingAnimation width={5} height={5} />
                        </div>
                    ) : null}
                </div>
            </div>
        </motion.form>
    )
}