import { ScrollBox } from "../../ui/utils/scrollBox/ScrollBox";
import { StackList } from "../../ui/dataDisplay/list/List";
import { ListItem } from "../../ui/dataDisplay/list/ListItem";
import { Page } from "../../ui/page/Page";
import { motion } from "framer-motion";

import image from '../../../assets/bgimage/SC_Frontiers_November2022.webp'

import { forwardRef } from "react";
import ImagePresenter from "../../ui/dataDisplay/imagePresenter/ImagePresenter";

const Playground: React.FC = () => {
    return (
        <Page style={{height: '100%', padding: '76px 40px 40px 40px'}}>
            <ImagePresenter src={image} width={'256px'}/>
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