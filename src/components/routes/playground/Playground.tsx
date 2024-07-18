import { ScrollBox } from "../../ui/utils/scrollBox/ScrollBox";
import { StackList } from "../../ui/dataDisplay/list/List";
import { ListItem } from "../../ui/dataDisplay/list/ListItem";
import { Page } from "../../ui/page/Page";

import avatar from '../../../assets/avatar.jpg'
import img from '../../../assets/bgimage/wallpaper5.jpg'

import iconGrass from '../../../assets/icons/grass_block.png'
import { Avatar } from "../../ui/dataDisplay/avatar/Avatar";
import { CircularProgress } from "../../ui/dataDisplay/spinner/Spinner";

async function get(url: string) {
    return await (await fetch(new Request(url))).json()
}

async function getVersions(id: string) {
    return (await get("https://meta.fabricmc.net/v2/versions/loader/" + id)).map((element: any) => {
        return {
            version: element.loader.version,
            info: element.loader.stable ? 'stable' : 'unstable',
            url: 'https://meta.fabricmc.net/v2/versions/loader/' + id + '/' + element.loader.version + '/profile/json'
        }
    })
}

function callback(id: string) {
    getVersions(id).then(result => console.log(result));
} // !!! TODO: Move GET operation to the backend because JS sucks.

const Playground: React.FC = () => {
    let array = [1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9]
    return (
        <Page style={{height: '100%'}}>
            {/* <div style={{height: 200, width: 400, margin: 72, backgroundColor: 'rgba(255, 255, 255, .2)', position: 'relative'}}> */}
                <ScrollBox contentContainerStyle={{padding: '40px'}}>
                    <StackList>
                        <ListItem
                            text={{primary: 'CuteKims#0303', secondary: 'Pixely账户'}}
                            customPrefix={<Avatar src={avatar} size={48} rounded/>}
                            customSuffix={<p style={{margin: '0px'}}>查看和修改个人资料</p>}
                        />
                        <ListItem
                            text={{secondary: 'Ad consequat aute nulla et nisi proident cupidatat qui cillum est id. Eu fugiat ex incididunt pariatur Lorem non aliquip ad consequat dolore. Consequat aliqua ipsum esse occaecat nostrud laboris commodo duis veniam eu occaecat ut voluptate sit.', primary: '响应式布局'}}
                            customPrefix={<Avatar src={iconGrass} size={32}/>}
                            customSuffix={<ListItem text={{primary: '模块化组件', secondary: '这个ListItem组件被嵌套在了父ListItem的customSuffix参数中。'}} customSuffix={<CircularProgress size={16}/>}/>}
                        />
                        <ListItem
                            text={{primary: '我可以点击！', secondary: '鼠标移上来，点两下试试？'}}
                            customPrefix={<CircularProgress />}
                            clickable
                        />
                        <ListItem
                            text={{primary: '图标三边距等宽', secondary: '这是坠吼滴'}}
                            customPrefix={<Avatar src={avatar} size={24} rounded/>}
                        />
                        <ListItem
                            text={{primary: '撑开点空间！', secondary: '来个大的'}}
                            customSuffix={<Avatar src={img} size={256} rounded={32}/>}
                        />
                        <ListItem
                            text={{primary: '看够无限加载了？', secondary: '这是一个环形加载条'}}
                            customPrefix={<CircularProgress value={36}/>}
                        />
                    </StackList>
                </ScrollBox>
            {/* </div> */}
        </Page>
    )
}

export default Playground