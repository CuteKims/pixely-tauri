import { listen, emit } from "@tauri-apps/api/event";
import { LauncherInstance } from "../types/ui";

import { z } from 'zod'
import { invoke } from "@tauri-apps/api/core";

type Task = {
    taskId: string,
}

type Bridger = {
    subscribe: (dispatch: (tasks: Task[]) => void) => {
        unsubscribe: () => void
    },
    get: () => Task[],
    api: BridgerApi
}

type BridgerApi = {
    testCall: () => void
}

export function useBridger(): Bridger {
    let taskArray: Task[] = []
    let subscribers: {[key: string]: ((tasks: Task[]) => void)} = {};

    // listen('rasterizer_emitter', event => {

    //     subscribers.forEach(dispatch => {
    //         dispatch(taskArray)
    //     })
    // })

    return {
        subscribe: (dispatch) => {
            let id = self.crypto.randomUUID()
            subscribers[id] = dispatch
            return {
                unsubscribe: () => {
                    delete subscribers[id]
                }
            }
        },
        api: generateBridgerApi(taskArray, subscribers),
        get: () => {
            return taskArray
        }
    }
}

function generateBridgerApi(taskArray: Task[], subscribers: {[key: string]: ((tasks: Task[]) => void)}): BridgerApi {
    return {
        testCall: () => {
            let taskId = self.crypto.randomUUID()
            taskArray.push({taskId})
            invoke('rasterizer_bridger', {id: taskId, payload: '没什么价值的信息'})
            Object.keys(subscribers).forEach(key => {
                subscribers[key](taskArray)
            })
        }
    }
}