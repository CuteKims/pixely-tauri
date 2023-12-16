import { useContext, useEffect, useState } from 'react'
import styles from './launcher.module.css'
import { MinecraftInstance, ParsedTaskResponse } from '../../../bridger/parser'
import BackendInvoker, { InstantTaskHeaders } from '../../../bridger/invoker'
import { convertFileSrc } from '@tauri-apps/api/tauri'
import { motion } from 'framer-motion'
import { SubpageMap } from '../pages'
import { globalStateContext } from '../../hocs/context'

const Launcher: React.FC = () => {
    const {state} = useContext(globalStateContext);
    const [instanceArray, setInstanceArray] = useState<{state: 'loading' | 'ok' | 'error', data: null | MinecraftInstance[] | Error}>({state: 'loading', data: null});
    const [pointer, setPointer] = useState(0)
    useEffect(() => {
        new BackendInvoker({
            Instant: {
                taskHeader: InstantTaskHeaders.InstancesInstalled,
                taskBody: 'wtf'
            }
        }).invoke().then(result => {
            setInstanceArray({
                state: 'ok',
                data: (result as ParsedTaskResponse<InstantTaskHeaders>).body as MinecraftInstance[]
            })
        }).catch(error => {
            setInstanceArray({state: 'error', data: error})
        })
    }, [])
    function handleScroll(props: any) {
        if (props.deltaY < 0) {
            if (pointer > 0) {
                setPointer(pointer - 1)
            }
        } else {
            if (pointer < ((instanceArray.data as MinecraftInstance[]).length - 1)) {
                setPointer(pointer + 1)
            }
        }
    }
    return (
        <>
            <motion.div id={styles.drawer} onWheel={(prop) => handleScroll(prop)}>
                <div id={styles['tile-container']}>
                    {(() => {
                        switch (instanceArray.state) {
                            case 'loading': return <></>
                            case 'error': return <p>error</p>
                            case 'ok': {
                                return (instanceArray.data as MinecraftInstance[]).map((element, index) => <Tile key={index} props={{position: index, iconPath: element.iconPath, name: element.name, pointer, setPointer}}/>)
                            }
                        }
                    })()}
                </div>
            </motion.div>
        </>
    )
}

const Tile: React.FC<{props: {
    position: number,
    pointer: number,
    setPointer: React.Dispatch<React.SetStateAction<number>>,
    iconPath: string,
    name: string,
}}> = ({props}) => {
    const isSelected = (props.position == props.pointer)
    const infoboxWidth = getCharsWidth(props.name, {size: 22, family: "'Segoe UI', 'Microsoft YaHei'"}) + 32
    return (
        <>
            <motion.div className={styles.tile}>
                <div className={styles['image-container']}>
                    <img src={convertFileSrc(props.iconPath)} />
                </div>
                <div className={styles['infobox-container']} style={isSelected ? {width: infoboxWidth} : {width: 0, borderRight: "none"}}>
                    <div className={styles.infobox} style={{width: infoboxWidth, opacity: isSelected ? 1 : 0, transform: isSelected ? 'translateX(0px)' : 'translateX(-' + infoboxWidth +'px)'}}>
                        <p style={{fontSize: 22}}>{props.name}</p>
                        <p style={{fontSize: 12, marginLeft: 16, marginBottom: 16, justifyContent: 'end'}}>最近游玩：刚刚<br />游戏时长：8小时</p>
                    </div>
                </div>
            </motion.div>
        </>
    )
}


export function getCharsWidth(text: string, options: {size: number, family: string}) {
    const { size = 14, family = "Microsoft YaHei" } = options;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if(ctx) {
        ctx.font = `${size}px ${family}`;
        return ctx.measureText(text).width;
    } else {
        console.error('Failed to calculate character display width, returning 0')
        return 0
    }
}

// export const subpagesMap: SubpageMap = {
//     'plaza.minecraft': {
//         component: Minecraft,
//         friendlyName: '本体',
//         display: true,
//     },
//     'plaza.modpack': {
//         component: Minecraft,
//         friendlyName: '整合包',
//         display: true,
//     },
//     'plaza.download_preview': {
//         component: DownloadPreview,
//         friendlyName: '下载预览',
//         display: true,
//     }
// }

export default Launcher;