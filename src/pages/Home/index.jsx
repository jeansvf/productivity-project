import { signOut } from "firebase/auth"
import { auth } from "../../firebase-config"

export default function Home() {
    return (
        <div className="pt-14 w-full h-screen bg-[#393939] z-10">
            <div>home</div>
            <button onClick={() => signOut(auth).then((response) => console.log(response))}>sign out</button>
        </div>
    )
}