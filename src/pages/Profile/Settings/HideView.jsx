import {useHintsContext} from "../../../contexts/HintsContext"
import ToggleSwitch from "../../Pomodoro/Settings/ToggleSwitch"

export default function HidePomodoroView({
    sliderSettings,
    setSliderSettings,
    isViewSwitchOn,
    hideView,
    view,
}) {
    const {views, setViews} = useHintsContext()

    return (
        <button
            onClick={() => {
                setSliderSettings({
                    ...sliderSettings,
                    [isViewSwitchOn]: !sliderSettings[isViewSwitchOn],
                })
                setViews({
                    ...views,
                    [hideView]: !sliderSettings[isViewSwitchOn],
                })
                let newViews = JSON.parse(localStorage.getItem("views"))
                    ? JSON.parse(localStorage.getItem("views"))
                    : {}
                newViews[hideView] = !sliderSettings[isViewSwitchOn]
                localStorage.setItem("views", JSON.stringify(newViews))
            }}
            className="flex items-center font-medium text-lg mb-1"
            type="button"
        >
            <span className="mr-2">Hide {view} View</span>
            <ToggleSwitch isToggled={sliderSettings[isViewSwitchOn]} />
        </button>
    )
}
