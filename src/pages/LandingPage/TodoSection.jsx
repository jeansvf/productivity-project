export default function TodoSection({ todoImage }) {
    return (
        <div className="relative flex justify-center items-center w-full h-[50rem]  max-md:flex-col">
            <div className="absolute w-full h-full"></div>
            <div className="z-10 text-left max-md:text-center max-md:mb-8">
                <h2 className="text-[#71EEFF] drop-shadow-blue-title text-[3.5rem] text-6xl font-semibold">Todo</h2>
                <p className="text-white w-80 mt-3 pr-6 mr-2 leading-6 font-medium text-lg max-sm:pr-0">You don't have to keep everything in your head. Stay organized, stress-free, and focused on what matters most with our Todo List!</p>
            </div>
            <img src={todoImage} alt="todo-img" className="max-w-[50.9%] max-h-[31rem] border-[1px] border-white rounded-xl z-10 max-md:max-w-[78%]" />
        </div>
    )
}