import { ActionCenterProps } from "./ActionCenter"
import { RootContext } from "../rootContext"

export const actionCenterPropsAdapter = (rootContext: RootContext): ActionCenterProps => {
    return {
        isDisplay: rootContext.rootState.isActionCenterShow,
        close: () => rootContext.setIsActionCenterShow(false)
    }
}