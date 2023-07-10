import { collection, doc, getDoc, getDocs } from "firebase/firestore"
import { useContext, useEffect, useState } from "react"
import { createContext } from "react"
import { db, auth } from "../firebase-config"
import { onAuthStateChanged } from "firebase/auth"
import { getMonth } from "date-fns"

const ProfileContextProvider = createContext()

export default function profileContext({ children }) {
    const [profilePic, setProfilePic] = useState("")
    const [userName, setUserName] = useState("")
    const [userPomodoros, setUserPomodoros] = useState(null)

    useEffect(() => {
    const getProfilePic = async () => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                let userDocs = await getDoc(doc(db, `users/${user.uid}`))
                setProfilePic(userDocs.data().photoUrl)
                setUserName(userDocs.data().userName)
                
                let pomodoroDocs = await getDocs(collection(db, `users/${user.uid}/pomodoro`))
                
                let pomodoros = []
                pomodoroDocs.docs.map((el) => pomodoros.push(el.data()))

                pomodoros.map((pomodoro) => {
                    let modifiedPomodoro = {}
                    modifiedPomodoro.date = toDate(pomodoro.date)
                    modifiedPomodoro.minutes = pomodoro.minutes
                    
                    console.log(modifiedPomodoro);

                    setUserPomodoros(...userPomodoros, modifiedPomodoro)
                })
            } else null
        })
    }
    getProfilePic()
    }, [])

    const toDate = (value) => {
        let month = value.charAt(0) == 0 ? value.charAt(1) : value.charAt(0) + value.charAt(1)
        let year = value.charAt(3) + value.charAt(4) + value.charAt(5) + value.charAt(6)
        
        return `${year}, ${month}`
    }

    const value = {
        profilePic,
        userName,
        userPomodoros,
    }
    return (
        <ProfileContextProvider.Provider value={value}>
            { children }
        </ProfileContextProvider.Provider>
    )
}

export const useProfileContext = () => useContext(ProfileContextProvider)