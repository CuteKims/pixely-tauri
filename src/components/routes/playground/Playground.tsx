import { ScrollBox } from "../../ui/utils/scrollBox/ScrollBox";
import { StackList } from "../../ui/dataDisplay/list/List";
import { ListItem } from "../../ui/dataDisplay/list/ListItem";
import { Page } from "../../ui/page/Page";
import { motion } from "framer-motion";

import image from '../../../assets/bgimage/980d9965f5af340fb2bfaa3c382521fc.jpg'

import { forwardRef } from "react";
import ImagePresenter from "../../ui/dataDisplay/imagePresenter/ImagePresenter";

const Playground: React.FC = () => {
    return (
        <Page style={{height: '100%', padding: '76px 40px 40px 40px'}}>
            <ImagePresenter src={image} height={'256px'}/>
        </Page>
    )
}

const TestButton = forwardRef<HTMLDivElement, {text: string, onClick: () => void}>(function TestButton({text, onClick}, ref) {
    return (
        <motion.div layout ref={ref} initial={{scale: .9, opacity: 0}} animate={{scale: 1, opacity: 1}} exit={{scale: .9, opacity: 0}}>
            <ListItem text={{primary: text}} onClick={onClick}/>
        </motion.div>
    )
})

export default Playground