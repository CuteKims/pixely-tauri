import { getAnimationTiming } from "../../../ui/animation"
import { StackList } from "../../../ui/dataDisplay/list/List"
import { ListItem } from "../../../ui/dataDisplay/list/ListItem"
import { Subpage } from "../../../ui/page/Page"

export const Accessibility: React.FC = () => {
    return (
        <Subpage>
            <h1>使启动器更易于使用</h1>
            <p>大多数辅助功能需要前往系统设置开启。</p>
            <StackList animation={{delay: getAnimationTiming.fromFrames(10)}}>
                <ListItem text={{primary: '通知', secondary: '推送、提醒并管理启动器内的通知信息'}}/>
                <ListItem text={{primary: '请勿打扰', secondary: '将通知直接推送到操作中心而不提醒'}}/>
                <ListItem text={{primary: '自动启用“请勿打扰”'}}/>
            </StackList>
        </Subpage>
    )
}