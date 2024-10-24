import styles from './Personalization.module.css'

import { StackList } from "../../../ui/dataDisplay/list/List"
import { ListItem } from "../../../ui/dataDisplay/list/ListItem"
import { Subpage } from "../../../ui/page/Page"
import { useState } from 'react'
import { getAnimationTiming, getCssAnimation, UiAnimationProperty } from '../../../ui/animation'

import IconPhotos from '../../../../assets/icons/ui/photos.svg?react'
import IconFolder from '../../../../assets/icons/ui/file_folder_windows.svg?react'
import IconBrush from '../../../../assets/icons/ui/brush.svg?react'
import IconColorPalatte from '../../../../assets/icons/ui/color_palatte.svg?react'
import IconTransparentEffect from '../../../../assets/icons/ui/transparent_effect.svg?react'
import IconAnimation from '../../../../assets/icons/ui/animation.svg?react'
import IconTranslate from '../../../../assets/icons/ui/translate.svg?react'

import Selector from '../../../ui/inputs/selector/Selector'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

export const Personalization: React.FC = () => {
    const {i18n} = useTranslation()
    const navigate = useNavigate()
    return (
        <Subpage header='个性化你的启动器'>
            <StackList header='背景图片' animation={{delay: getAnimationTiming.fromFrames(10)}}>
                <ImageSetter />
                <ListItem
                    text={{primary: '选择计算机上的文件...'}}
                    icon={<IconFolder />}
                    onClick={() => {}}
                />
                <ListItem
                    text={{primary: '浏览预设图片...'}}
                    icon={<IconPhotos />}
                    onClick={() => navigate('/settings/personalization/preset_images')}
                />
            </StackList>
            <StackList header="用户界面" animation={{delay: getAnimationTiming.fromFrames(16)}}>
                <ListItem
                    text={{primary: '显示语言'}}
                    icon={<IconTranslate />}
                    customSuffix={
                        <Selector
                            selections={[
                                {value: 'zh-CN', node: '简体中文（中国大陆）'},
                                {value: 'zh-TW', node: '繁體中文（台灣）'},
                                {value: 'zh-HK', node: '繁體中文（香港特別行政區）'},
                                {value: 'lzh', node: '文言（華夏）'},
                                {value: 'en-US', node: 'English (US)'}
                            ]}
                            selectValue={i18n.language}
                            onChange={newValue => i18n.changeLanguage(newValue)}
                        />
                    }
                />
                <ListItem
                    text={{primary: '主题', secondary: '更改用户界面显示颜色'}}
                    icon={<IconBrush />}
                    customSuffix={
                        <Selector
                            selections={[
                                {value: 'light', node: '浅色'},
                                {value: 'dark', node: '深色'},
                                {value: 'auto', node: '跟随系统'}
                            ]}
                            selectValue='dark'
                        />
                    }
                />
                <ListItem
                    text={{primary: '选择强调色...'}}
                    icon={<IconColorPalatte />}
                />
                <ListItem
                    text={{
                        primary: [
                            '高级材质',
                            <span className='marked-text--sidenote'>需要重启</span>
                        ],
                        secondary: '用户界面元素的透明、颜色过滤和模糊效果。如果用户界面出现性能问题，请尝试关闭该选项。'
                    }}
                    icon={<IconTransparentEffect />}
                />
            </StackList>
            <StackList header="动画" animation={{delay: getAnimationTiming.fromFrames(22)}}>
                <ListItem
                    text={{
                        primary: [
                            '全局动画效果',
                            <span className='marked-text--sidenote'>需要重启</span>
                        ]
                    }}
                    icon={<IconAnimation />}
                />
                <ListItem
                    text={{
                        primary: [
                            '过渡动画速度倍率',
                            <span className='marked-text--sidenote'>需要重启</span>
                        ]
                    }}
                    icon={<IconAnimation />}
                />
                <ListItem
                    text={{
                        primary: [
                            '关键帧动画速度倍率',
                            <span className='marked-text--sidenote'>需要重启</span>
                        ]
                    }}
                    icon={<IconAnimation />}
                />
            </StackList>
        </Subpage>
    )
}

const ImageSetter: React.FC<{animation?: UiAnimationProperty}> = (props) => {
    let [isOnDragOver, setIsOnDragOver] = useState(false)
    return (
        <div className={styles['image-setter']} style={{backgroundColor: isOnDragOver ? 'rgba(0,0,0,.25)' : 'transparent', ...getCssAnimation(props.animation)}} onDragOver={() => setIsOnDragOver(true)} onDragOverCapture={() => console.log('DragOver')}>
            <DragDropIcon />
            <p className='white-text--small' style={{textAlign: 'center'}}>拖放图片来设置<br /><span className='marked-text--sidenote'>将受支持的图像文件拖放到此处即可设置背景图片。</span></p>
        </div>
    )
}

const DragDropIcon: React.FC = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" style={{color: 'white', transition: 'color .5s', filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,.16))', margin: '0px auto 4px auto'}}>
            <g transform="translate(-489 -336)">
                <path d="M-2754,28V24h4v4Zm0-8V16h4v4Zm0-8V8h4v4Zm24-8V0h4V4Zm-8,0V0h4V4Zm-8,0V0h4V4Zm-8,0V0h4V4Z" transform="translate(3243 336)" fill="currentColor"/>
                <path d="M-2750,28h-4V0h28V12h-4V4h-20V24h8v4Z" transform="translate(3251 344)" fill="currentColor"/>
                <path d="M-2750,6.828V12h-4V0h12V4h-5.172L-2742,9.172-2744.828,12Z" transform="translate(3267 360)" fill="currentColor"/>
            </g>
        </svg>
    )
}