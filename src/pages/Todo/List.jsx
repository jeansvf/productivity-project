import { IoIosAdd } from "react-icons/io";
import ListItem from "./ListItem";
import { Droppable } from "react-beautiful-dnd";
import { useState } from "react";

export default function List() {
    const [ listItems, setListItems ] = useState([
        "fix login screen appearance on reload",
        "add profile picture changing",
        "add forgot password",
    ])
    return (
        <div id="droppable1" type="person" className="flex flex-col items-center w-80 h-fit bg-[#2E2E2E] rounded-[.4rem] mr-5">
            <h2 className="w-[90%] py-4 font-semibold text-[17px]">Todo</h2>

            <li className="flex items-center bg-[#4F4F4F] w-[92%] h-10 mb-2 rounded-[.25rem]">
                <div className="w-2 h-full rounded-tl-[.25rem] rounded-bl-[.25rem] bg-[#78FF9E]"></div>
                <p className="pl-1">{content}</p>
            </li>

            <ListItem content="snap"/>
            <ListItem content="snap"/>
            <button className="flex w-[92%] pt-1 pb-3 items-center"><IoIosAdd className="text-2xl" /> Add Task</button>
        </div>

        /* <div className="flex items-center cursor-pointer pl-4 w-52 h-12 text-lg border-[1px] rounded-[.4rem]">
        <IoIosAdd className="text-[1.75rem] text-start" />
        Add another list
        </div> */
    )
}