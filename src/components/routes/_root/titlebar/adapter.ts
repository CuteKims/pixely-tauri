import { TitlebarProps } from "./Titlebar"
import { RootContext } from "../rootContext"

export const titlebarPropsAdapter = (rootContext: RootContext): TitlebarProps => {
    return {
        isMaximized: false,
        isFocused: true,
        menu: rootContext.toggleIsActionCenterShow,
        minimize: rootContext.setMinimized,
        maximize: rootContext.toggleMaximize,
        close: rootContext.close
    }
}