import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth, db, continueWithGoogle } from "../../firebase-config"
import { doc, setDoc, Timestamp } from "firebase/firestore";
import LoadingAnimation from "../../components/LoadingAnimation";

export default function SignUpForm() {
    const [signUpCredentials, setSignUpCredentials] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    })
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => setError(""), [signUpCredentials])

    const signUpFirebaseUser = (e) => {
        e.preventDefault()
        setIsLoading(true)

        // check fields
        switch (true) {
            case (signUpCredentials.name == ""):
                setError("Name is invalid");
                setIsLoading(false)
                return;
            
            case (signUpCredentials.name.length < 4 || signUpCredentials.name.length > 12):
                setError("Name must be between 4 and 12 characters");
                setIsLoading(false)
                return;

            case (signUpCredentials.email == ""):
                setError("Email is invalid");
                setIsLoading(false)
                return;

            case (signUpCredentials.password == "" || signUpCredentials.password.length > 128):
                setError("Password is invalid");
                setIsLoading(false)
                return;

            case (signUpCredentials.password.length < 6):
                setError("Password must be at least 6 characters long");
                setIsLoading(false)
                return;

            case (signUpCredentials.confirmPassword == ""):
                setError("Confirm Password is invalid");
                setIsLoading(false)
                return;
        }

        if (signUpCredentials.password !== signUpCredentials.confirmPassword) {
            setError("Passwords do not match");
            setIsLoading(false)
            return;
        }

        createUserWithEmailAndPassword(auth, signUpCredentials.email, signUpCredentials.password)
        .then((userCred) => {
            setDoc(doc(db, "users", userCred.user.uid), {
                uid: userCred.user.uid,
                userName: signUpCredentials.name,
                email: signUpCredentials.email,
                provider: userCred.user.providerId,
                photoUrl: userCred.user.photoURL,
                pomodoroMinutes: 0,
                createdAt: Timestamp.now(),
                plannedHours: 1,
                // emailVerified: ?
                })
            }
        )
        .then(() => setIsLoading(false))
        .catch((err) => {
            setIsLoading(false)

            if(err.message == "Firebase: Error (auth/email-already-in-use).") {
                setError("Email already in use")
            } else setError("Something went wrong, try again later")
        })
    }

    return (
        <form onSubmit={(e) => signUpFirebaseUser(e)} className="flex flex-col items-center w-[36rem]">
            <h1 className="flex items-center mt-7 mb-7 text-3xl text-white font-semibold max-sm:flex-col max-sm:text-[10vw]">Create your<p className="text-[#FF7373] max-sm:py-0.5">&nbsp;Focusplace&nbsp;</p>account</h1>
            <button onClick={() => continueWithGoogle()} type='button' className='flex items-center bg-white px-[.6rem] py-1 rounded-full'>
                <FcGoogle className='mr-2 text-3xl' />
                <p className='text-[1.2rem] leading-8 font-medium'>Continue with Google</p>
            </button>
            <div className='flex items-center justify-center w-full opacity-40 mt-5 mb-2'>
                <hr className='w-[39.2%]'/>
                <p className='text-white px-3'>or</p>
                <hr className='w-[39.2%]'/>
            </div>
            
            <label className="w-[87%] mb-0.5 text-left text-white font-medium" htmlFor="name-input">Name</label>
            <input onChange={(e) => setSignUpCredentials({...signUpCredentials, name: e.target.value})} className='mb-[.25rem] text-lg font-medium text-white pl-2 h-[3rem] w-[88%] rounded-[.3rem] bg-[#393939] outline-white border-[1px] border-white' type="text" id="name-input" />
            <label className="w-[87%] mb-0.5 text-left text-white font-medium" htmlFor="email-input">E-mail</label>
            <input onChange={(e) => setSignUpCredentials({...signUpCredentials, email: e.target.value})} className='mb-[.25rem] text-lg font-medium text-white pl-2 h-[3rem] w-[88%] rounded-[.3rem] bg-[#393939] outline-white border-[1px] border-white' type="email" id="email-input" />
            <label className="w-[87%] mb-0.5 text-left text-white font-medium" htmlFor="password-input">Password</label>
            <input onChange={(e) => setSignUpCredentials({...signUpCredentials, password: e.target.value})} className='mb-[.25rem] text-lg font-medium text-white pl-2 h-[3rem] w-[88%] rounded-[.3rem] bg-[#393939] outline-white border-[1px] border-white' type="password" id="password-input" />
            <label className="w-[87%] mb-0.5 text-left text-white font-medium" htmlFor="confirm-password-input">Confirm Password</label>
            <input onChange={(e) => setSignUpCredentials({...signUpCredentials, confirmPassword: e.target.value})} className='mb-1 text-lg font-medium text-white pl-2 h-[3.3rem] w-[88%] rounded-[.3rem] bg-[#393939] outline-white border-[1px] border-white placeholder:text-white' type="password" id="confirm-password-input" />

            <p className="w-[87%] text-start text-red-400">{error}</p>
            <div className='relative flex justify-center items-center w-full mt-4' style={{ marginTop: error == "" ? "16px" : "6px" }}>
                <input className='w-[88%] h-[3rem] cursor-pointer text-lg text-center rounded-full font-semibold bg-white hover:bg-[#FF7373] hover:text-white transition-colors' type="submit" value={!isLoading ? "Sign Up" : ""} />
                {isLoading ? (
                    <div className='absolute flex items-center justify-center w-full h-full text-inherit'>
                        <LoadingAnimation width={5} height={5} />
                    </div>
                ) : null}
            </div>
            
            <Link to={"/login"} className='underline text-[#42A4FF] underline-offset-2 mt-4 text-lg'>Already have an account? Login</Link>
        </form>
    )
}