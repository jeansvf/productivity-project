import { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { Link } from 'react-router-dom'
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth, continueWithGoogle } from '../../firebase-config'

// TODO: limit characters

export default function LoginForm() {
    const [loginCredentials, setLoginCredentials] = useState({
        email: "",
        password: "",
    })

    const LoginFirebaseUser = (e) => {
        e.preventDefault()

        // sign in user
        signInWithEmailAndPassword(auth, loginCredentials.email, loginCredentials.password)
    }
    d
    return (
        <form onSubmit={(e) => LoginFirebaseUser(e)} className="flex flex-col items-center w-full sm:w-[32rem] h-screen sm:h-[36rem] rounded-[.5rem] sm:border-2 border-white">
            <h1 className="mt-7 mb-7 text-[2.8rem] text-white font-semibold">Login</h1>
            <button onClick={() => continueWithGoogle()} type='button' className='flex items-center bg-white px-[.6rem] py-1 rounded-full'>
                <FcGoogle className='mr-2 text-3xl' />
                <p className='text-[1.2rem] leading-8 font-medium'>Continue with Google</p>
            </button>
            <div className='flex items-center justify-center w-full opacity-40 my-5'>
                <hr className='w-[39.2%]'/>
                <p className='text-white px-3'>or</p>
                <hr className='w-[39.2%]'/>
            </div>
            <input onChange={(e) => setLoginCredentials({...loginCredentials, email: e.target.value})} className='mb-[.9rem] text-lg font-medium text-white pl-2 h-[3.3rem] outline-white w-[88%] rounded-[.3rem] bg-[#393939] border-2 border-white placeholder:text-white' placeholder='E-mail' type="email" />
            <input onChange={(e) => setLoginCredentials({...loginCredentials, password: e.target.value})} className='text-lg font-medium text-white pl-2 h-[3.3rem] w-[88%] rounded-[.3rem] bg-[#393939] outline-white border-2 border-white placeholder:text-white' placeholder='Password' type="password" />
            <button type='button' className='underline text-[#42A4FF] underline-offset-2 mt-3 text-[1.05rem]'>Reset Password</button>
            <input className='w-[88%] h-[3rem] mt-12 cursor-pointer text-lg rounded-full font-bold bg-white' type="submit" value="Login" />
            <Link to={"/signup"} className='underline text-[#42A4FF] underline-offset-2 mt-4 text-lg'>Don’t have an account yet? Sign Up</Link>
        </form>
    )
}