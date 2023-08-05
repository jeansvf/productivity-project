import { useState } from "react"
import { useProfileContext } from "../../contexts/ProfileContext"
import { BsCameraFill } from "react-icons/bs"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../../firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import LoadingAnimation from "../../components/LoadingAnimation";
import imageCompression from 'browser-image-compression'
import { doc, updateDoc } from "firebase/firestore";

export default function UserInfo() {
    const { profilePic, userName, getUserProfilePicture, studiedTime } = useProfileContext()

    const [isHovering, setIsHovering] = useState(false)
    const [isImageUploading, setIsImageUploading] = useState(false)

    const [user] = useAuthState(auth)

    const uploadImage = async (file) => {
        setIsImageUploading(true)

        const options = {
            maxSizeMB: .1,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
        }
        
        let storageRef = ref(storage, `user-profile-pictures/${user.uid}`)
        
        imageCompression(file, options)
        .then((compressedPicture) => {
            uploadBytes(storageRef, compressedPicture)
            .then((response) => {
                getDownloadURL(response.ref)
                .then((url) => {
                    updateDoc(doc(db, `users/${user.uid}`), {
                        photoUrl: url 
                    })
                    .then(() => {
                        getUserProfilePicture()
                        setIsImageUploading(false)
                    })
                })
            })
        })
        
        .catch((err) => {
            setIsImageUploading(false)
            console.log(err)
        })
    }

    const getFormattedMinutes = (minutes) => {
        return minutes < 60 ? `${minutes}min` : `${(minutes / 60).toFixed(0)}h`
    }

    return (
        <div className="flex items-center text-white max-sm:flex-col">
            <label onMouseOver={() => setIsHovering(true)} onMouseOut={() => setIsHovering(false)} className="relative w-44 h-44 bg-cover rounded-full bg-no-repeat cursor-pointer" style={{ backgroundImage: `url(${profilePic})`}} htmlFor="image-input">
                {isHovering && !isImageUploading ? (
                    <div className="absolute left-0 top-0 flex flex-col items-center justify-center w-full h-full bg-black rounded-full opacity-60">
                        <BsCameraFill className="text-4xl" />
                        <span className="w-[80%] text-center">Change Profile Picture</span>
                    </div>
                ) : null}
                {isImageUploading ? (
                    <div className="absolute left-0 top-0 flex flex-col items-center justify-center w-full h-full bg-black rounded-full opacity-60">
                        <LoadingAnimation width={12} height={12} />
                    </div>
                ) : null}
            </label>
            <input onChange={(event) => uploadImage(event.target.files[0])} className="hidden" type="file" accept="image/*" id="image-input" />
            
            <div className="ml-7 max-sm:ml-0">
                <h1 className="text-6xl font-bold ml-2 max-sm:my-4 max-sm:text-center">{userName}</h1>
                <div className="flex font-semibold mt-1.5 opacity-70">
                    <p className="mr-4 max-sm:mr-0">Studied Time: {getFormattedMinutes(studiedTime)}</p>
                    {/* <p>Listened Time: 3h</p> */}
                </div>
            </div>
        </div>
    )
}