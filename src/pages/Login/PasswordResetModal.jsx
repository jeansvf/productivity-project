import { motion } from "framer-motion";
import PasswordResetForm from "./PasswordResetForm";
import PasswordResetConfirmation from "./PasswordResetConfirmation";

export default function PasswordResetModal({ setShowPasswordResetModal, sending, resetPassword, resetEmail, setResetEmail, passwordResetRequestSent }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute left-0 top-0 flex items-center justify-center w-full h-screen bg-black bg-opacity-70 backdrop-blur-sm z-10"
        >
            {!passwordResetRequestSent ? <PasswordResetForm resetPassword={resetPassword} setShowPasswordResetModal={setShowPasswordResetModal} setResetEmail={setResetEmail} sending={sending} /> : null}
            {passwordResetRequestSent ? <PasswordResetConfirmation resetEmail={resetEmail} setShowPasswordResetModal={setShowPasswordResetModal} /> : null}
        </motion.div>
    )
}