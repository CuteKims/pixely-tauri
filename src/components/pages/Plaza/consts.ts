import React from "react"
import { SubpageMap } from "../../../types/consts"

import { plaza_versionManifest_INITIAL_STATE } from "./Plaza_VersionManifest"
import { plaza_installer_INITIAL_STATE } from "./Plaza_Installer"

const SubpageInstaller = React.lazy(() => import("./Plaza_Installer"))
const SubpageVersionManifest = React.lazy(() => import("./Plaza_VersionManifest"))

const SUBPAGES_MAP_PLAZA: SubpageMap = {
    default: 'plaza.version_manifest',
    map: {
        'plaza.version_manifest': {
            component: SubpageVersionManifest,
            friendlyName: '本体',
            display: true,
            initialState: plaza_versionManifest_INITIAL_STATE
        },
        'plaza.modpack': {
            component: SubpageVersionManifest,
            friendlyName: '整合包',
            display: true,
            initialState: plaza_versionManifest_INITIAL_STATE
        },
        'plaza.installer': {
            component: SubpageInstaller,
            friendlyName: '安装向导',
            display: true,
            initialState: plaza_installer_INITIAL_STATE
        },
    }
}

export default SUBPAGES_MAP_PLAZA