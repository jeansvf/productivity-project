export default function ListItem({ content }) {
    return (
        <li className="flex items-center bg-[#4F4F4F] w-[92%] h-10 mb-2 rounded-[.25rem]">
            <div className="w-2 h-full rounded-tl-[.25rem] rounded-bl-[.25rem] bg-[#78FF9E]"></div>
            <p className="pl-1">{content}</p>
        </li>
    )
}