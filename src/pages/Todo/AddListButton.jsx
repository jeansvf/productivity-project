import { RiAddFill } from "react-icons/ri";

export default function AddListButton({ addNewColumn, columns }) {
    return (
        <button onClick={addNewColumn} className="flex items-center h-12 w-56 mr-2 pl-3 border-[1px] border-white rounded-lg select-none hover:opacity-70">
            <RiAddFill className="text-xl" />
            <p className="ml-1 whitespace-nowrap font-medium">
                {columns.length == 0 ? "Add a list" : "Add another list"}
            </p>
        </button>
    )
}