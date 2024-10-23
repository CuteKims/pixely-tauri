import { getAnimationTiming, getCssAnimation } from "../../../ui/animation"
import { StackList } from "../../../ui/dataDisplay/list/List"
import { ListItem } from "../../../ui/dataDisplay/list/ListItem"
import { Subpage } from "../../../ui/page/Page"

export const Accessibility: React.FC = () => {
    return (
        <Subpage header={'使启动器更易于使用'}>
            <div className="hint-box--emphasis" style={getCssAnimation({'transition': 'bottom-slide-in'})}>
                <p className="plain-text--medium">大多数辅助功能由操作系统的辅助功能设置决定。<br />在此处的设置将会覆盖操作系统的设置。</p>
            </div>
            <StackList animation={{delay: getAnimationTiming.fromFrames(10)}}>
                <ListItem text={{primary: '通知', secondary: '推送、提醒并管理启动器内的通知信息'}}/>
                <ListItem text={{primary: '请勿打扰', secondary: '将通知直接推送到操作中心而不提醒'}}/>
                <ListItem text={{primary: '自动启用“请勿打扰”'}}/>
            </StackList>
        </Subpage>
    )
}