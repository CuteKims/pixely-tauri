import { useEffect, useState } from "react"

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

export const Playground: React.FC = () => {
    return (
        <>
            <button onClick={() => callback('1.16.5')} style={{margin: '72px'}}>
                这是一个按钮！
            </button>
        </>
    )
}