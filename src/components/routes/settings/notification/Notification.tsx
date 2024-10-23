import { getAnimationTiming } from "../../../ui/animation"
import { StackList } from "../../../ui/dataDisplay/list/List"
import { ListItem } from "../../../ui/dataDisplay/list/ListItem"
import { Subpage } from "../../../ui/page/Page"

export const Notification: React.FC = () => {
    return (
        <Subpage header={'管理通知的推送方式'}>
            <StackList animation={{delay: getAnimationTiming.fromFrames(10)}}>
                <ListItem text={{primary: '通知', secondary: '推送、提醒并管理启动器内的通知信息'}}/>
                <ListItem text={{primary: '请勿打扰', secondary: '将通知直接推送到操作中心而不提醒'}}/>
                <ListItem text={{primary: '自动启用“请勿打扰”'}}/>
            </StackList>
            <StackList header="管理来自特定频道的通知" animation={{delay: getAnimationTiming.fromFrames(16)}}>
                <ListItem text={{primary: '下载管理器'}}/>
                <ListItem text={{primary: '启动器更新'}}/>
                <ListItem text={{primary: '启动台'}}/>
                <ListItem text={{primary: 'Pixely广场'}}/>
                <ListItem text={{primary: 'Pixely账号'}}/>
                <ListItem text={{primary: 'Pixely云同步'}}/>
                <ListItem text={{primary: 'Pixely好友'}}/>
            </StackList>
            <StackList header="其他通知设置" animation={{delay: getAnimationTiming.fromFrames(22)}}>
                <ListItem text={{primary: '将重要通知推送至操作系统'}}/>
                <ListItem text={{primary: '失去焦点时将所有新通知推送至操作系统'}}/>
                <ListItem text={{primary: '告诉我Pixely的新增功能'}}/>
                <ListItem text={{primary: '告诉我有关更好地使用Pixely的建议'}}/>
                <ListItem text={{primary: '询问我对Pixely使用体验的评价'}}/>
            </StackList>
        </Subpage>
    )
}