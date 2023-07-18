import { useEffect, useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { Link } from 'react-router-dom'
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth, continueWithGoogle } from '../../firebase-config'
import LoadingAnimation from '../../components/LoadingAnimation'

// TODO: limit characters

export default function LoginForm() {
    const [loginCredentials, setLoginCredentials] = useState({
        email: "",
        password: "",
    })
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => setError(""), [loginCredentials])

    const LoginFirebaseUser = (event) => {
        event.preventDefault()
        setIsLoading(true)

        switch (true) {
            case (loginCredentials.email == ""):
                setError("Email is invalid");
                setIsLoading(false)
                return;

            case (loginCredentials.password == ""):
                setError("Password is invalid");
                setIsLoading(false)
                return;
        }

        // sign in user
        signInWithEmailAndPassword(auth, loginCredentials.email, loginCredentials.password)
        .then(() => setIsLoading(false))
        .catch(() => setIsLoading(false))
        // TODO: catch firebase error
    }
    
    return (
        <form onSubmit={(event) => LoginFirebaseUser(event)} className="flex flex-col items-center w-[36rem]">
            <h1 className="flex items-center mt-7 mb-7 text-3xl text-white font-semibold">Welcome back to&nbsp;<p className="text-[#FF7373]">Placeholder!</p></h1>
            <button onClick={() => continueWithGoogle()} type='button' className='flex items-center bg-white px-[.6rem] py-1 rounded-full'>
                <FcGoogle className='mr-2 text-3xl' />
                <p className='text-[1.2rem] leading-8 font-medium'>Continue with Google</p>
            </button>
            <div className='flex items-center justify-center w-full opacity-40 mt-5 mb-2'>
                <hr className='w-[39.2%]'/>
                <p className='text-white px-3'>or</p>
                <hr className='w-[39.2%]'/>
            </div>
            
            <label className="w-[87%] mb-0.5 text-left text-white font-medium" htmlFor="email-input">E-mail</label>
            <input onChange={(e) => setLoginCredentials({...loginCredentials, email: e.target.value})} className='mb-[.25rem] text-lg font-medium text-white pl-2 h-[3rem] w-[88%] rounded-[.3rem] bg-[#393939] outline-white border-[1px] border-white' type="email" id="email-input" />
            <label className="w-[87%] mb-0.5 text-left text-white font-medium" htmlFor="password-input">Password</label>
            <input onChange={(e) => setLoginCredentials({...loginCredentials, password: e.target.value})} className='mb-[.25rem] text-lg font-medium text-white pl-2 h-[3rem] w-[88%] rounded-[.3rem] bg-[#393939] outline-white border-[1px] border-white' type="password" id="password-input" />

            {/* <button type='button' className='underline text-[#42A4FF] underline-offset-2 mt-3 text-[1.05rem]'>Reset Password</button> */}
            
            <p className="w-[87%] text-start text-red-400">{error}</p>
            <div className='relative flex justify-center items-center w-full mt-4' style={{ marginTop: error == "" ? "16px" : "6px" }}>
                <input className='w-[88%] h-[3rem] cursor-pointer text-lg text-center rounded-full font-semibold bg-white hover:bg-[#FF7373] hover:text-white transition-colors' type="submit" value={!isLoading ? "Login" : ""} />
                {isLoading ? (
                    <div className='absolute flex items-center justify-center w-full h-full text-inherit'>
                        <LoadingAnimation width={5} height={5} />
                    </div>
                ) : null}
            </div>
            <Link to={"/signup"} className='underline text-[#42A4FF] underline-offset-2 mt-4 text-lg'>Don’t have an account yet? Sign Up</Link>
        </form>
    )
}