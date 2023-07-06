import { RiAddFill } from "react-icons/ri";

export default function AddListButton({ addNewColumn }) {
    return (
        <button onClick={addNewColumn} className="flex items-center h-10 py-5 pl-4 pr-[1.25rem] mr-2 border-[1px] border-white rounded-lg select-none hover:opacity-70">
            <RiAddFill className="text-xl" />
            <p className="ml-1 whitespace-nowrap">Add Another List</p>
        </button>
    )
}