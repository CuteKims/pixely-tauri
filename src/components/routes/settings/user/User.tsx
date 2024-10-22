import { Avatar } from "../../../ui/dataDisplay/avatar/Avatar"
import { GridList, StackList } from "../../../ui/dataDisplay/list/List"
import { ListItem } from "../../../ui/dataDisplay/list/ListItem"
import { Subpage } from "../../../ui/page/Page"

import IconSwitchAccount from '../../../../assets/icons/ui/switch_account.svg?react'
import IconLogout from '../../../../assets/icons/ui/logout.svg?react'
import avatar from '../../../../assets/avatar.jpg'
import { useTranslation } from "react-i18next"
import { getAnimationTiming } from "../../../ui/animation"
import Button from "../../../ui/inputs/button/Button"
import { CircularProgress } from "../../../ui/dataDisplay/spinner/Spinner"

export const User: React.FC = () => {
    let {t} = useTranslation()
    return (
        <Subpage>
            <h1>{t('ui.settings.user')}</h1>
            <StackList header={t('ui.settings.user.pixely_account')} animation={{delay: getAnimationTiming.fromFrames(10)}}>
                <ListItem
                    text={{primary: 'CuteKims#0303', secondary: t('ui.settings.user.pixely_account')}}
                    customPrefix={<Avatar src={avatar} size={36} rounded/>}
                    customSuffix={<Button icon={<IconSwitchAccount />}>{[t('ui.settings.user.pixely_account.check_profile')]}</Button>}
                />
                <ListItem
                    text={{primary: t('ui.settings.user.pixely_account.switch')}}
                    onClick={() => {}}
                    icon={<IconSwitchAccount />}
                />
                <ListItem
                    text={{primary: t('ui.settings.user.pixely_account.logout')}}
                    onClick={() => {}}
                    icon={<IconLogout />}
                />
                <ListItem
                    text={{primary: t('ui.settings.user.pixely_account.introduction')}}
                    onClick={() => {}}
                />
            </StackList>
            <StackList header={t('ui.settings.user.minecraft_account')} animation={{delay: getAnimationTiming.fromFrames(16)}}>
                <GridList>
                    <ListItem
                        text={{primary: 'CuteKims', secondary: t('ui.settings.user.minecraft_account.type.microsoft')}}
                    />
                    <ListItem
                        text={{primary: t('ui.settings.user.minecraft_account.add')}}
                        onClick={() => {}}
                    />
                </GridList>
                <ListItem text={{primary: t('ui.settings.user.minecraft_account.ask_when_launch')}}/>
            </StackList>
        </Subpage>
    )
}