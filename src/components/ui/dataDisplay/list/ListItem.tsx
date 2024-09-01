import { useEffect, useRef, useState } from 'react'
import { Avatar } from '../avatar/Avatar'
import style from './ListItem.module.css'
import { getCssAnimation, UiAnimationProperty } from '../../animation'

export type ListItemProps = {
    clickable?: boolean,
    animation?: UiAnimationProperty
    selected?: boolean,
    text?: {
        primary: React.ReactNode,
        secondary?: React.ReactNode,
    },
    icon?: React.ReactNode,
    customPrefix?: React.ReactNode,
    customSuffix?: React.ReactNode,
    onClick?: React.MouseEventHandler<HTMLDivElement> | undefined
}

export const ListItem: React.FC<ListItemProps> = (props) => {
    return (
        <div className={props.clickable ? style['list-item--clickable'] : style['list-item']} onClick={props.onClick} style={getCssAnimation(props.animation)}>
            {(() => {
                if(props.customPrefix) {
                    return (
                        <div style={{display: 'flex', margin: 'auto -2px auto 0px', padding: '12px 0px 12px 12px', alignContent: 'center', flexShrink: 0, minHeight: '32px', minWidth: '32px'}}>
                            <div style={{display: 'flex', margin: 'auto'}}>
                                {props.customPrefix}
                            </div>
                        </div>
                    )
                }
            })()}
            {(() => {
                if(props.icon) {
                    return (
                        <div style={{display: 'flex', margin: 'auto -10px auto 0px', padding: '12px 0px 12px 12px', alignContent: 'center', flexShrink: 0, minHeight: '32px', minWidth: '32px'}}>
                            <div style={{display: 'flex', margin: 'auto'}}>
                                {props.icon}
                            </div>
                        </div>
                    )
                }
            })()}
            {(() => {
                if(props.text) {
                    if(props.text.secondary) {
                        return (
                            <div className={style['list-item__text-container']}>
                                <div className={style['list-item__text-container__primary-text']}>{props.text.primary}</div>
                                <div className={style['list-item__text-container__secondary-text']}>{props.text.secondary}</div>
                            </div>
                        )
                    } else {
                        return (
                            <div className={style['list-item__text-container']}>
                                <div className={style['list-item__text-container__primary-text']} style={{margin: '12px'}}>{props.text.primary}</div>
                            </div>
                        )
                    }
                }
            })()}
            {(() => {
                if(props.customSuffix) {
                    return (
                        <div style={{display: 'flex', margin: 'auto 0px auto -2px', padding: '12px 12px 12px 0px', alignContent: 'center', alignSelf: 'end', flexShrink: 0, minHeight: '32px', minWidth: '32px'}}>
                            <div style={{display: 'flex', margin: 'auto'}}>
                                {props.customSuffix}
                            </div>
                        </div>
                    )
                }
            })()}
        </div>
    )
}

export type ListDividerProps = {

}

export const ListDivider: React.FC<{}> = () => {
    return (
        <>

        </>
    )
}