import { IoMdClose } from "react-icons/io"
import { useHintsContext } from "../../../contexts/HintsContext"

export default function CloseButton() {
    const { views, setViews, showHints, setShowHints } = useHintsContext()

    return (
        <button
            onClick={() => {
                setViews({ ...views, musicView: false })
                showHints.disableViewsHint === "disabled" ? null : setShowHints({ ...showHints, disableViewsHint: true })
            }}
            className="absolute right-0 top-0 mt-2 mr-2 text-3xl rounded-[.2rem] hover:bg-opacity-30 hover:bg-white"
            type="button"
        >
            <IoMdClose style={{ stroke: "black", strokeWidth: "12" }} />
        </button>
    )
}