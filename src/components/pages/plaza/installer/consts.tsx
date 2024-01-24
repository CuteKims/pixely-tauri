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
    isCompatible: true,
    callback: function (): { version: string; info: string; }[] {
        throw new Error("Function not implemented.");
    }
},
{
    title: "Fabric",
    subTitle: "新兴的、现代Minecraft版本流行的轻量级模组加载器",
    icon: iconFabric,
    iconPosition: {
        height: 36,
    },
    isCompatible: true,
    callback: function (): { version: string; info: string; }[] {
        throw new Error("Function not implemented.");
    }
},
{
    title: "NeoForge",
    subTitle: "由原Forge团队创建的Forge分支版本，与Forge模组兼容",
    icon: iconNeoforge,
    iconPosition: {
        width: 36,
    },
    isCompatible: true,
    callback: function (): { version: string; info: string; }[] {
        throw new Error("Function not implemented.");
    }
},
{
    title: "Quilt",
    subTitle: "Fabric的分支版本，与Fabric模组兼容",
    icon: iconQuilt,
    iconPosition: {
        width: 36,
        top: 2,
        left: 2,
    },
    isCompatible: true,
    callback: function (): { version: string; info: string; }[] {
        throw new Error("Function not implemented.");
    }
},
{
    title: "LiteLoader",
    subTitle: "旧版本Minecraft的轻量模组加载器，现已停止维护",
    icon: iconLiteloader,
    iconPosition: {
        width: 40,
    },
    isCompatible: true,
    callback: function (): { version: string; info: string; }[] {
        throw new Error("Function not implemented.");
    }
}]

export const addonOptions: InstallationOptionProps[] = [{
    title: "Optifine",
    subTitle: "历久弥新的Minecraft优化模组",
    icon: iconOptifine,
    iconPosition: {
        width: 32,
    },
    isCompatible: true,
    callback: function (): { version: string; info: string; }[] {
        throw new Error("Function not implemented.");
    }
},
{
    title: "Fabric API",
    subTitle: "Fabric的通用前置模组",
    icon: iconFabric,
    iconPosition: {
        height: 36,
    },
    isCompatible: true,
    callback: function (): { version: string; info: string; }[] {
        throw new Error("Function not implemented.");
    }
},
{
    title: "OptiFabric",
    subTitle: "Fabric的Optifine兼容模组",
    icon: iconOptifabric,
    iconPosition: {
        width: 40,
    },
    isCompatible: true,
    callback: function (): { version: string; info: string; }[] {
        throw new Error("Function not implemented.");
    }
}]