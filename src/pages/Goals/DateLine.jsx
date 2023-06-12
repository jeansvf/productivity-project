import { useEffect } from "react"

export default function DateLine({ date }) {

    var day = [];
    var month = [];
    var year = [];

    // format date from the date input
    for (let i=0; i < date?.length; i++) {
        if (i < 4 && date[i] != "/") {
            year[i] = date[i]
        }
        if (i < 7 && i > 4 && date[i] != "/") {
            month[i] = date[i]
        }
        if (i < date?.length && i > 7 && date[i] != "/") {
            day[i] = date[i]
        }
    }

    return (
        <div className={`flex items-center justify-center w-[90%] ${date ? "my-3" : "my-6"} opacity-70 select-none`}>
            <hr className={`${date == undefined ? "w-[8%]" : "w-[5%]"}`} />
                {date == "placeholder" ? <p className='text-white w-[6%] mx-2 text-center'>mm/dd/yyyy</p> : null}
                {date == undefined ? null : null}
                {date !== "placeholder" && date !== undefined ? <p className='text-white w-[6%] mx-2 text-center'>{month}/{day}/{year}</p> : null}
            <hr className='w-[92%]' />
        </div>
    )
}