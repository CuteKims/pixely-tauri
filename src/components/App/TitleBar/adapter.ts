import { TitleBarProps } from "."
import { PAGES_MAP } from "../../../consts/pages"
import { GlobalContext } from "../contextWrappers/global"
import { PageStackContext } from "../contextWrappers/page_stack"

export const titleBarPropsAdapter = (pageStackContext: PageStackContext, globalContext: GlobalContext): TitleBarProps => {
    return {
        back: pageStackContext.popPage,
        menu: globalContext.toggleIsActionCenterShow,
        minimize: globalContext.setMinimized,
        maximize: globalContext.toggleMaximize,
        close: globalContext.close,
        test: () => {
            console.log(pageStackContext.state)
        },
        isMaximized: false,
        isFocused: true,
        titleStr: PAGES_MAP[pageStackContext.getLastPage().pageKey].friendlyName
    }
}