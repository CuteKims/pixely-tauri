import { getAnimationTiming, getCssAnimation } from "../../../ui/animation"
import { StackList } from "../../../ui/dataDisplay/list/List"
import { ListItem } from "../../../ui/dataDisplay/list/ListItem"
import { Subpage } from "../../../ui/page/Page"

import IconPixely from '../../../../assets/icons/ui/pixely.svg?react'
import IconAfdian from '../../../../assets/icons/ui/afdian.svg?react'
import IconLightBulb from '../../../../assets/icons/ui/light_bulb.svg?react'
import IconOpenSource from '../../../../assets/icons/ui/open_source.svg?react'

export const About: React.FC = () =>{
    return (
        <Subpage header={'关于Pixely'}>
            <Logo />
            <StackList animation={{delay: getAnimationTiming.fromFrames(10)}}>
                <ListItem text={{primary: '软件版本'}} onClick={() => {}} icon={<IconPixely style={{transition: '.5s'}}/>} customSuffix={<p className='plain-text--main' style={{opacity: .5}}>开发版 Milestone 2</p>}/>
                <ListItem text={{primary: '查看新增功能'}} onClick={() => {}} icon={<IconLightBulb style={{transition: '.5s'}}/>}/>
            </StackList>
            <StackList header="鸣谢" animation={{delay: getAnimationTiming.fromFrames(16)}}>
                <ListItem text={{primary: '查看爱发电赞助者'}} onClick={() => {}} icon={<IconAfdian style={{transition: '.5s'}}/>}/>
                <ListItem text={{primary: '开源授权声明'}} onClick={() => {}} icon={<IconOpenSource style={{transition: '.5s'}}/>}/>
            </StackList>
        </Subpage>
    )
}

const Logo: React.FC = () => {
    return (
        <div style={{display: 'flex', alignItems: 'center', gap: '16px', paddingTop: '4px'}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" style={{filter: 'drop-shadow(0px 0px 6px #EBA153)', ...getCssAnimation({transition: ['fade-in', 'scale-up-in'], delay: getAnimationTiming.fromFrames(24)})}}>
                <rect width="64" height="64" rx="16" fill="#eba153"/>
                <g>
                    <path d="M16,0,32,16,16,32,0,16Z" fill="#f0b97e"/>
                    <path d="M16,0,32,16,16,32,0,16Z" transform="translate(32)" fill="#f0b97e"/>
                    <path d="M16,0,32,16,16,32,0,16Z" transform="translate(32 32)" fill="#f0b97e"/>
                    <path d="M16,0,32,16,16,32,0,16Z" transform="translate(0 32)" fill="#f0b97e"/>
                </g>
                <g transform="translate(16 16)">
                    <rect width="8" height="8" transform="translate(11.992 23.992)" fill="#fff"/>
                    <rect width="8" height="8" transform="translate(-0.008 23.992)" fill="#fff"/>
                    <rect width="8" height="8" transform="translate(-0.008 11.992)" fill="#fff"/>
                    <rect width="8" height="8" transform="translate(11.992 11.992)" fill="#fff"/>
                    <rect width="8" height="8" transform="translate(23.992 11.992)" fill="#fff"/>
                    <rect width="8" height="8" transform="translate(11.992 -0.008)" fill="#fff"/>
                    <rect width="8" height="8" transform="translate(-0.008 -0.008)" fill="#fff"/>
                </g>
            </svg>
            <div style={{display: 'flex', flexDirection: 'column', gap: '2px', position: 'relative', top: '-3px', ...getCssAnimation({transition: ['fade-in', 'left-slide-in'], delay: getAnimationTiming.fromFrames(28)})}}>
                <p style={{color: 'white', fontSize: '20px', textShadow: 'var(--text-shadow-dark)'}}>Pixely Launcher</p>
                <p style={{color: 'white', fontSize: '12px', textShadow: 'var(--text-shadow-dark)', opacity: .75}}>著作权属 © 2024 CuteKims，保留所有权利。</p>
            </div>
        </div>
        
    )
}