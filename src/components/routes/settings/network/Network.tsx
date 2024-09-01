import { getAnimationTiming } from "../../../ui/animation"
import { StackList } from "../../../ui/dataDisplay/list/List"
import { ListItem } from "../../../ui/dataDisplay/list/ListItem"
import { Subpage } from "../../../ui/page/Page"

export const Network: React.FC = () => {
    return (
        <Subpage>
            <h1>检查网络状态并设置连接与下载</h1>
            <StackList header="网络状态" animation={{delay: getAnimationTiming.fromFrames(10)}}>
                <ListItem />
            </StackList>
            <StackList header="代理" animation={{delay: getAnimationTiming.fromFrames(16)}}>
                <ListItem />
            </StackList>
            <StackList header="下载" animation={{delay: getAnimationTiming.fromFrames(22)}}>
                <ListItem />
            </StackList>
        </Subpage>
    )
}