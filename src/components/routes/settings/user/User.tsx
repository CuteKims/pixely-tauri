import { StackList } from "../../../ui/dataDisplay/list/List"
import { ListItem } from "../../../ui/dataDisplay/list/ListItem"
import { Subpage } from "../../../ui/page/Page"

export const User: React.FC = () => {
    return (
        <Subpage>
            <StackList>
                <ListItem />
            </StackList>
            <StackList>
                <ListItem />
            </StackList>
        </Subpage>
    )
}