import iconForge from '../../../../assets/icons/installer/forge.png'
import iconFabric from '../../../../assets/icons/installer/fabric.png'
import iconNeoforge from '../../../../assets/icons/installer/neoforge.png'
import iconQuilt from '../../../../assets/icons/installer/quilt.png'
import iconLiteloader from '../../../../assets/icons/installer/liteloader.png'
import iconOptifine from '../../../../assets/icons/installer/optifine.png'
import iconOptifabric from '../../../../assets/icons/installer/optifabric.png'

import { InstallationOptionProps } from './installer'

export const loaderOptions: InstallationOptionProps[] = [{
    title: "Forge",
    subTitle: "经典老牌模组加载器",
    icon: iconForge,
    iconPosition: {
        width: 40,
    },
    callback: async () => {
        return [{version: '', info: '', url: ''}]
    }
},
{
    title: "Fabric",
    subTitle: "用于现代Minecraft的轻量模组加载器",
    icon: iconFabric,
    iconPosition: {
        height: 36,
    },
    callback: async () => {
        return [{version: '', info: '', url: ''}]
    }
},
{
    title: "NeoForge",
    subTitle: "Forge分支，兼容Forge模组",
    icon: iconNeoforge,
    iconPosition: {
        width: 36,
    },
    callback: async () => {
        return [{version: '', info: '', url: ''}]
    }
},
{
    title: "Quilt",
    subTitle: "Fabric分支，兼容Fabric模组",
    icon: iconQuilt,
    iconPosition: {
        width: 36,
        top: 2,
        left: 2,
    },
    callback: async () => {
        return [{version: '', info: '', url: ''}]
    }
},
{
    title: "LiteLoader",
    subTitle: "旧版本Minecraft的轻量模组API",
    icon: iconLiteloader,
    iconPosition: {
        width: 40,
    },
    callback: async () => {
        return [{version: '', info: '', url: ''}]
    }
}]

export const addonOptions: InstallationOptionProps[] = [{
    title: "Optifine",
    subTitle: "历久弥新的Minecraft优化模组",
    icon: iconOptifine,
    iconPosition: {
        width: 32,
    },
    callback: async () => {
        return [{version: '', info: '', url: ''}]
    }
},
{
    title: "Fabric API",
    subTitle: "Fabric通用的前置API模组",
    icon: iconFabric,
    iconPosition: {
        height: 36,
    },
    callback: async () => {
        return [{version: '', info: '', url: ''}]
    }
},
{
    title: "OptiFabric",
    subTitle: "Fabric的Optifine兼容模组",
    icon: iconOptifabric,
    iconPosition: {
        width: 40,
    },
    callback: async () => {
        return [{version: '', info: '', url: ''}]
    }
}]