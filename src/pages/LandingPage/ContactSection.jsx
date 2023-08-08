import { AiOutlineRight } from "react-icons/ai";

export default function ContactSection() {
    return (
        <div className="flex flex-col mt-8 ml-12 max-md:m-0 max-md:text-center max-md:items-center max-md:pb-12">
            <p className="text-lg font-semibold opacity-70">Website Created by Jeansvf</p>
            <h3 className="text-[2.5rem] leading-[3rem] font-bold">Let's collaborate!<br /> Get in touch.</h3>
            <a href="https://jeansvf.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-72 h-12 mt-6 font-semibold text-xl cursor-pointer bg-white transition-colors hover:bg-[#bfbfbf]">
                <button type="button" className="w-full h-full text-black">My Portfolio</button>
                <div className="flex items-center justify-center w-16 text-2xl h-full border-[1px] border-white bg-[#171717]">
                    <AiOutlineRight />
                </div>
            </a>
        </div>
    )
}