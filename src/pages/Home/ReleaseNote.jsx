import React from "react";
import { BsGithub } from "react-icons/bs";

export default function ReleaseNote({ releaseNote }) {
    return (
        <div className="w-[27.5rem] mb-10 py-1.5 px-3 border rounded-lg border-white bg-gradient-to-br from-[#2E2E2E] to-[#33333300] max-sm:w-[90%]">
            <p className="opacity-50">{releaseNote.date}</p>
            <p className="font-semibold text-3xl mt-0.5"><span className="text-[#FF7373]">Focusplace</span> {releaseNote.version}</p>
            <hr className="w-full mx-auto opacity-50 my-2" />
            <p className="font-semibold text-3xl">Release Notes</p>
            <ul className="list-disc list-inside italic text-[1.2rem]">
                {releaseNote.changes.map((change) => (
                    <React.Fragment key={change.title}>
                        <li className="my-2">
                            <span className="ml-[-.5rem]">{change.title} <span className="not-italic text-2xl">{change.emoji}</span></span>
                            <p className="text-[#B4B4B4] leading-6">{change.description}</p>
                        </li>

                        {change.lineBelow ? <hr className="w-full mx-auto opacity-50 my-3" /> : null}
                    </React.Fragment>
                ))}
            </ul>
            <div className="flex items-center justify-between mt-4">
                <p className="text-lg text-start">Thank you for using <span className="text-[#FF7373]">Focusplace</span>!</p>
                <a href="https://github.com/jeansvf/productivity-project" target="_blank" rel="noopener noreferrer">
                    <BsGithub className="text-2xl" />
                </a>
            </div>
        </div>
    )
}