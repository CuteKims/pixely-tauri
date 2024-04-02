import { ScrollBox } from "../../hocs/ScrollBox";
import { Page } from "../../shared/page";

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
        <Page>
            <div style={{height: 200, width: 400, margin: 72, backgroundColor: 'rgba(255, 255, 255, .2)', position: 'relative'}}>
                <ScrollBox fullHeight>
                    <div style={{display: 'flex', flexDirection: 'column', gap: '1px', padding: '18px'}} onClick={() => callback('1.16.5')}>
                        {array.map(() => <div style={{height: 40, backgroundColor: 'white'}}></div>)}
                    </div>
                </ScrollBox>
            </div>
        </Page>
    )
}

export default Playground