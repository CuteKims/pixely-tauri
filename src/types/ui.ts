import { path } from "@tauri-apps/api"
import { ModLoaderTypes, VersionTypes } from "./instance"
import { ArchTypes } from "./system"

export type LauncherInstance = {
    instanceId: string,
    instanceName: string,
    iconPath: string,
    lastPlayed: Date,
    playTime: number
}

export type LauncherInstanceDetail = {
    info: {
        modLoader?: {
            type: ModLoaderTypes,
            version: string
        },
        modCount?: {
            installed: number,
            enabled: number
        },
        saves?: {
            count: number,
            sizeInKiB: number,
        },
        jre?: {
            executableFile: {
                description: string,
                version: string,
            }
            arch: ArchTypes,
            ramAllowcatedInMiB: number
        }
    },
    screenshotPaths: string[]
}

export type PlazaMinecraftVersion = {
    versionName: string,
    time: Date,
    versionType: VersionTypes
}