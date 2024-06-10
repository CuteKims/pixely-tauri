import { TitlebarProps, TitlebarRef } from "."
import { PAGES_MAP } from "../../../consts/pages"
import { GlobalContext } from "../contextWrapper/global"
import { PageStackContext } from "../contextWrapper/page_stack"

export const titlebarPropsAdapter = (pageStackContext: PageStackContext, globalContext: GlobalContext): TitlebarProps => {
    return {
        isMaximized: false,
        isFocused: true,
        titleStr: PAGES_MAP[pageStackContext.getLastPage().pageKey].friendlyName
    }
}

export const titlebarRefAdapter = (pageStackContext: PageStackContext, globalContext: GlobalContext): TitlebarRef => {
    return {
        home: () => {
            pageStackContext.pushPage({pageKey: 'launcher'})
        },
        back: pageStackContext.popPage,
        menu: globalContext.toggleIsActionCenterShow,
        minimize: globalContext.setMinimized,
        maximize: globalContext.toggleMaximize,
        close: globalContext.close,
        test: () => {
            console.log(pageStackContext.state)
        }
    }
}