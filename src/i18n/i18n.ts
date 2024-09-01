import i18n from "i18next"
import { initReactI18next } from "react-i18next"

import zh_CN from './lang/zh-cn.json'
import en_US from './lang/en-US.json'

const i18nResources = {
    'zh-CN': {
        translation: zh_CN
    },
    'en-US': {
        translation: en_US
    }
}

i18n
    .use(initReactI18next)
    .init({
        resources: i18nResources,
        lng: 'zh-CN',
        interpolation: {
            escapeValue: false
        }
    })

export default i18n