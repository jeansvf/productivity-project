import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithPopup } from "firebase/auth"
import { auth, db, continueWithGoogle } from "../../firebase-config"
import { collection, addDoc, doc, setDoc, Timestamp } from "firebase/firestore";

export default function SignUpForm() {
    const [signUpCredentials, setSignUpCredentials] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const signUpFirebaseUser = (e) => {
        e.preventDefault()

        // check if all fields were filled
        switch (true) {
            case (signUpCredentials.name == ""):
                console.log("name was not filled");
                return;

            case (signUpCredentials.email == ""):
                console.log("email was not filled");
                return;

            case (signUpCredentials.password == ""):
                console.log("password was not filled");
                return;

            case (signUpCredentials.confirmPassword == ""):
                console.log("password was not filled");
                return;
        }

        // check if passwords match
        if (signUpCredentials.password !== signUpCredentials.confirmPassword) {
            console.log("Passwords do not match!");
            return;
        }

        // sign up user
        createUserWithEmailAndPassword(auth, signUpCredentials.email, signUpCredentials.password).then(() => {
            // TODO: SEARCH FOR ANOTHER WAY TO DO THIS
            onAuthStateChanged(auth, user => {
                if(user) {
                    setDoc(doc(db, "users", user.uid), {
                        uid: user.uid,
                        userName: signUpCredentials.name,
                        email: signUpCredentials.email,
                        provider: user.providerId,
                        photoUrl: user.photoURL,
                        pomodoroMinutes: 0,
                        createdAt: Timestamp.now(),
                        // emailVerified: ?
                    })
                }
            })
        })
    }

    return (
        <main className="flex items-center justify-center h-screen w-full">
            <form onSubmit={(e) => signUpFirebaseUser(e)} className="flex flex-col items-center w-full sm:w-[32rem] h-screen sm:h-[43rem] rounded-[.5rem] sm:border-2 border-white">
                <h1 className="mt-7 mb-7 text-[2.8rem] text-white font-semibold">Sign Up</h1>
                <button onClick={() => continueWithGoogle()} type='button' className='flex items-center bg-white px-[.6rem] py-1 rounded-full'>
                    <FcGoogle className='mr-2 text-3xl' />
                    <p className='text-[1.2rem] leading-8 font-medium'>Continue with Google</p>
                </button>
                <div className='flex items-center justify-center w-full opacity-40 my-5'>
                    <hr className='w-[39.2%]'/>
                    <p className='text-white px-3'>or</p>
                    <hr className='w-[39.2%]'/>
                </div>
                <input onChange={(e) => setSignUpCredentials({...signUpCredentials, name: e.target.value})} className='mb-[.9rem] text-lg font-medium text-white pl-2 h-[3.3rem] outline-white w-[88%] rounded-[.3rem] bg-[#393939] border-2 border-white placeholder:text-white' placeholder='First Name' type="text" />
                <input onChange={(e) => setSignUpCredentials({...signUpCredentials, email: e.target.value})} className='mb-[.9rem] text-lg font-medium text-white pl-2 h-[3.3rem] w-[88%] rounded-[.3rem] bg-[#393939] outline-white border-2 border-white placeholder:text-white' placeholder='Email' type="email" />
                <input onChange={(e) => setSignUpCredentials({...signUpCredentials, password: e.target.value})} className='mb-[.9rem] text-lg font-medium text-white pl-2 h-[3.3rem] w-[88%] rounded-[.3rem] bg-[#393939] outline-white border-2 border-white placeholder:text-white' placeholder='Password' type="password" />
                <input onChange={(e) => setSignUpCredentials({...signUpCredentials, confirmPassword: e.target.value})} className='text-lg font-medium text-white pl-2 h-[3.3rem] w-[88%] rounded-[.3rem] bg-[#393939] outline-white  border-2 border-white placeholder:text-white' placeholder='Confirm Password' type="password" />
                <input className='w-[88%] h-[3rem] mt-16 cursor-pointer text-lg rounded-full font-bold bg-white' type="submit" value="Sign Up" />
                <Link to={"/login"} className='underline text-[#42A4FF] underline-offset-2 mt-4 text-lg'>Already have an account? Login</Link>
            </form>
        </main>
    )
}