export default function LofiSection({ musicImage }) {
    return (
        <div className="relative flex justify-center items-center w-full h-[50rem] max-md:flex-col">
            <div className="absolute w-full h-full"></div>
            <div className="z-10 text-left max-md:text-center max-md:mb-8">
                <h2 className="text-[#FF71CE] drop-shadow-pink-title text-[3.5rem] text-6xl font-semibold">Lofi Music</h2>
                <p className="text-white w-80 mt-3 leading-6 font-medium text-lg">Better your focus and mood by listening to calm, lofi music with beautiful vaporwave art.</p>
            </div>
            <img src={musicImage} alt="music-img" className="max-w-[50.9%] max-h-[31rem] border-[1px] border-white rounded-xl z-10 max-md:max-w-[78%]" />
        </div>
    )
}