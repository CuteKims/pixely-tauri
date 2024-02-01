import { ActionCenterProps } from "."
import { GlobalContext } from "../contextWrappers/global"
import { PageStackContext } from "../contextWrappers/page_stack"

export const actionCenterPropsAdapter = (pageStackContext: PageStackContext, globalContext: GlobalContext): ActionCenterProps => {
    return {
        isDisplay: globalContext.globalState.isActionCenterShow,
        notif: {
            notifications: 0,
            tasks: 0,
        },
        currentPageKey: pageStackContext.getLastPage().pageKey,
        pushPage: pageStackContext.pushPage,
        close: () => globalContext.setIsActionCenterShow(false)
    }
}