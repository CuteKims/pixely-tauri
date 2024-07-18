import { useEffect, useRef, useState } from 'react'
import { Avatar } from '../avatar/Avatar'
import style from './ListItem.module.css'

export type ListItemProps = {
    clickable?: boolean,
    selected?: boolean,
    text?: {
        primary: string,
        secondary?: string,
    },
    customPrefix?: React.ReactNode,
    customSuffix?: React.ReactNode,
    onClick?: React.MouseEventHandler<HTMLDivElement> | undefined
}

export const ListItem: React.FC<ListItemProps> = (props) => {
    return (
        <div className={props.clickable ? style['list-item-clickable'] : style['list-item']} onClick={props.onClick}>
            {(() => {
                if(props.customPrefix) {
                    return (
                        <div style={{display: 'flex', margin: 'auto 0px', padding: '12px 0px 12px 12px', alignContent: 'center', flexShrink: 0, minHeight: '32px', minWidth: '32px'}}>
                            <div style={{display: 'flex', margin: 'auto'}}>
                                {props.customPrefix}
                            </div>
                        </div>
                    )
                }
            })()}
            {(() => {
                if(props.text) {
                    if(props.text.secondary) {
                        return (
                            <div className={style['text-container']}>
                                <p className={style['primary-text']}>{props.text.primary}</p>
                                <p className={style['secondary-text']}>{props.text.secondary}</p>
                            </div>
                        )
                    } else {
                        return (
                            <div className={style['text-container']}>
                                <p className={style['primary-text']} style={{margin: '12px'}}>{props.text.primary}</p>
                            </div>
                        )
                    }
                }
            })()}
            {(() => {
                if(props.customSuffix) {
                    return (
                        <div style={{display: 'flex', margin: 'auto 0px auto auto', padding: '12px 12px 12px 0px', alignContent: 'center', alignSelf: 'end', flexShrink: 0, minHeight: '32px', minWidth: '32px'}}>
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