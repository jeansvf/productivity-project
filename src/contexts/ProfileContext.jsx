import { collection, doc, getDoc, getDocs } from "firebase/firestore"
import { useContext, useEffect, useState } from "react"
import { createContext } from "react"
import { db, auth } from "../firebase-config"
import { onAuthStateChanged } from "firebase/auth"

const ProfileContextProvider = createContext()

export default function profileContext({ children }) {
    const [profilePic, setProfilePic] = useState("")
    const [userName, setUserName] = useState("")
    const [userPomodoros, setUserPomodoros] = useState([])
    const [dates, setDates] = useState([])

    const currentDate = new Date();
    
    useEffect(() => {
        const getProfilePic = async () => {
            onAuthStateChanged(auth, async (user) => {

                let finalDates = []

                if (user) {
                    let userDocs = await getDoc(doc(db, `users/${user.uid}`))
                    setProfilePic(userDocs.data().photoUrl)
                    setUserName(userDocs.data().userName)
                    
                    let pomodoroDocs = await getDocs(collection(db, `users/${user.uid}/pomodoro`))
                    
                    let pomodoros = []
                    pomodoroDocs.docs.map((el) => pomodoros.push(el.data()))
                    
                    let finalPomodoros = []
                    pomodoros.map((pomodoro) => {
                        let modifiedPomodoro = {}
                        modifiedPomodoro.date = toDate(pomodoro.date)
                        modifiedPomodoro.minutes = pomodoro.minutes
                        
                        finalPomodoros.push(modifiedPomodoro);
                    })
                    
                    setUserPomodoros(finalPomodoros)
                    
                    for (var i = 1; i <= 12 - finalPomodoros.length; i++) {
                        // Get the month and year of the current date
                        var currentMonth = currentDate.getMonth()
                        var currentYear = currentDate.getFullYear()
                
                        // Subtract i months from the current date
                        var pastDate = new Date(currentYear, currentMonth - i, 1)
                
                        // Extract the month and year from the past date
                        var pastMonth = pastDate.toLocaleString('default', { month: 'long' })
                        var pastYear = pastDate.getFullYear()
                
                        // Print the past month and year
                        let month = pastMonth + ' ' + pastYear
                
                        let finalMonth = month.charAt(0) + month.charAt(1) + month.charAt(2)
                        
                        finalDates.unshift(finalMonth)
                    }
    
                    setDates(finalDates);
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
        dates
    }
    return (
        <ProfileContextProvider.Provider value={value}>
            { children }
        </ProfileContextProvider.Provider>
    )
}

export const useProfileContext = () => useContext(ProfileContextProvider)