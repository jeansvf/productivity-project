import { useProfileContext } from "../../contexts/ProfileContext"

export default function UserInfo() {
    const { profilePic, userName } = useProfileContext()

    return (
        <div className="flex items-center text-white">
            <img className="w-44 h-44 rounded-full" src={profilePic} alt="" />
            <div className="ml-7">
                <h1 className="text-6xl font-bold ml-2">{userName}</h1>
                <div className="flex font-semibold mt-1.5 opacity-70">
                    <p className="mr-4">Studied Time: 2h</p>
                    <p>Listened Time: 3h</p>
                </div>
            </div>
        </div>
    )
}