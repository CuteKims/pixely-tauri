export const bridger = {
    getInstalledInstances: (): Promise<number> => {
        return new Promise((resolve, reject) => {
            resolve(1)
        })
    },
    getImage: (): Promise<string> => {
        return new Promise((resolve, reject) => {
            resolve('1')
        })
    }
}