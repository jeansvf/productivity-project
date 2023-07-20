import { collection, doc, getDoc, getDocs } from "firebase/firestore"
import { useContext, useEffect, useState } from "react"
import { createContext } from "react"
import { db, auth } from "../firebase-config"
import { useAuthState } from "react-firebase-hooks/auth"

const ProfileContextProvider = createContext()

export default function profileContext({ children }) {
    // TODO: turn all of these states into one user object
    const [profilePic, setProfilePic] = useState("")
    const [userName, setUserName] = useState("")
    const [userPomodoros, setUserPomodoros] = useState([])
    const [dates, setDates] = useState([])

    const [userInfo, setUserInfo] = useState({})
    
    const [user] = useAuthState(auth)
    
    const currentDate = new Date()
    
    useEffect(() => {
        getUserInfo()
    }, [user])

    const getUserProfilePicture = async () => {
        let userDocs = await getDoc(doc(db, `users/${user.uid}`))
        userDocs.data().photoUrl ? setProfilePic(userDocs.data().photoUrl) : null
        setUserName(userDocs.data().userName)
        
        // TODO: turn all the different user info states into one of these
        setUserInfo(userDocs.data())
    }
    
    const getUserInfo = async () => {
        let finalDates = []

        if (user) {
            getUserProfilePicture()

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

            // organize pomodoros in order by month and year
            finalPomodoros.sort((a, b) => {
                let [yearA, monthA] = a.date.split(', ')
                let [yearB, monthB] = b.date.split(', ')
        
                if (yearA != yearB) {
                    return yearA - yearB
                }
        
                return monthA - monthB
            })
            
            setUserPomodoros(finalPomodoros)
            
            for (var i = 1; i <= 12 - finalPomodoros.length; i++) {
                // get the month and year of the current date
                var currentMonth = currentDate.getMonth()
                var currentYear = currentDate.getFullYear()
        
                // subtract i months from the current date
                var pastDate = new Date(currentYear, currentMonth - i, 1)
        
                // extract the month and year from the past date
                var pastMonth = pastDate.toLocaleString('default', { month: 'long' })
                var pastYear = pastDate.getFullYear()
        
                // print the past month and year
                let month = pastMonth + ' ' + pastYear
        
                let finalMonth = month.charAt(0) + month.charAt(1) + month.charAt(2)
                
                finalDates.unshift(finalMonth)
            }

            setDates(finalDates);
        } else null
    }

    const toDate = (value) => {
        let month = value.charAt(0) == 0 ? value.charAt(1) : value.charAt(0) + value.charAt(1)
        let year = value.charAt(3) + value.charAt(4) + value.charAt(5) + value.charAt(6)
        
        return `${year}, ${month}`
    }

    const value = {
        userInfo,
        getUserInfo,
        getUserProfilePicture,
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