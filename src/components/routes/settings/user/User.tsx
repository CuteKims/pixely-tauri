import { Avatar } from "../../../ui/dataDisplay/avatar/Avatar"
import { GridList, StackList } from "../../../ui/dataDisplay/list/List"
import { ListItem } from "../../../ui/dataDisplay/list/ListItem"
import { Subpage } from "../../../ui/page/Page"

import avatar from '../../../../assets/avatar.jpg'
import { useTranslation } from "react-i18next"
import { getAnimationTiming } from "../../../ui/animation"

export const User: React.FC = () => {
    let {t} = useTranslation()
    return (
        <Subpage>
            <h1>{t('ui.settings.user')}</h1>
            <StackList header={t('ui.settings.user.pixely_account')} animation={{delay: getAnimationTiming.fromFrames(10)}}>
                <ListItem
                    text={{primary: 'CuteKims#0303', secondary: t('ui.settings.user.pixely_account')}}
                    customPrefix={<Avatar src={avatar} size={36} rounded style={{margin: "-2px"}}/>}
                    customSuffix={<p style={{fontSize: '14px'}}>{t('ui.settings.user.pixely_account.check_profile')}</p>}
                />
                <ListItem
                    text={{primary: t('ui.settings.user.pixely_account.switch')}}
                    clickable
                />
                <ListItem
                    text={{primary: t('ui.settings.user.pixely_account.logout')}}
                    clickable
                />
                <ListItem
                    text={{primary: t('ui.settings.user.pixely_account.introduction')}}
                    clickable
                />
            </StackList>
            <StackList header={t('ui.settings.user.minecraft_account')} animation={{delay: getAnimationTiming.fromFrames(16)}}>
                <GridList>
                    <ListItem
                        text={{primary: 'CuteKims', secondary: t('ui.settings.user.minecraft_account.type.microsoft')}}
                    />
                    <ListItem
                        text={{primary: t('ui.settings.user.minecraft_account.add')}}
                        clickable
                    />
                </GridList>
                <ListItem text={{primary: t('ui.settings.user.minecraft_account.ask_when_launch')}}/>
            </StackList>
        </Subpage>
    )
}