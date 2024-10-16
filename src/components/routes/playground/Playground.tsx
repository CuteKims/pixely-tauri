import { ScrollBox } from "../../ui/utils/scrollBox/ScrollBox";
import { StackList } from "../../ui/dataDisplay/list/List";
import { ListItem } from "../../ui/dataDisplay/list/ListItem";
import { Page } from "../../ui/page/Page";
import { AnimatePresence, motion } from "framer-motion";

import { bridger } from "../_root/Root";
import { forwardRef, ReactElement, useEffect, useState } from "react";
import Ripple from "../../ui/utils/ripple/Ripple";

const Playground: React.FC = () => {
    // let [state, setState] = useState<string[]>(bridger.get().map(task => {return task.taskId}))
    // useEffect(() => {
    //     let handler = bridger.subscribe(tasks => {
    //         setState(tasks.map(task => {return task.taskId}))
    //     })
    //     return () => {
    //         handler.unsubscribe()
    //     }
    // }, [])
    let [state, setState] = useState<string[]>([])
    return (
        <Page style={{height: '100%'}}>
            <ScrollBox contentContainerStyle={{padding: '40px'}}>
                <StackList>
                    <Ripple>
                        <div style={{height: '20px', width: '200px'}}></div>
                    </Ripple>
                    {/* <ListItem
                        text={{primary: 'Click to test', secondary: 'Just click it'}}
                        clickable
                        onClick={() => {
                            bridger.api.testCall()
                        }}
                    />
                    {state.map(str => {
                        return <ListItem text={{primary: str}} />
                    })} */}
                    <TestButton text="Test" onClick={() => setState([crypto.randomUUID(), ...state])}/>
                    <AnimatePresence mode="popLayout">
                        {state.map(str => {
                            return <TestButton key={str} text={str} onClick={() => setState(state.filter(_str => str !== _str))}/>
                        })}
                    </AnimatePresence>
                </StackList>
            </ScrollBox>
        </Page>
    )
}

const TestButton = forwardRef<HTMLDivElement, {text: string, onClick: () => void}>(function TestButton({text, onClick}, ref) {
    return (
        <motion.div layout ref={ref} initial={{scale: .9, opacity: 0}} animate={{scale: 1, opacity: 1}} exit={{scale: .9, opacity: 0}}>
            <ListItem text={{primary: text}} clickable onClick={onClick}/>
        </motion.div>
    )
})

export default Playground