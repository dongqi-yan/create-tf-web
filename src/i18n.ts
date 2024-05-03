import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LangDetector from 'i18next-browser-languagedetector'
import zhCN from '@/locales/zh-CN.json'
import enUS from '@/locales/en-US.json'
import zhTW from '@/locales/zh-TW.json'

type Locale = 'en-US' | 'zh-CN' | 'zh-TW'

export const LOCALES = ['en-US', 'zh-CN', 'zh-TW'] as Locale[]

i18n.use(LangDetector).use(initReactI18next).init({
  resources: {
    'en-US': { translation: enUS },
    'zh-CN': { translation: zhCN },
    'zh-TW': { translation: zhTW },
  },
  detection: {
    order: ['querystring', 'localStorage', 'navigator'],
    caches: ['localStorage'],
    lookupQuerystring: 'lang',
    lookupLocalStorage: 'lang',
    convertDetectedLanguage: (lang: string) => {
      const formatLang = lang.replace('_', '-') as Locale
      if (LOCALES.includes(formatLang)) return lang
      return 'en-US'
    }
  },
  interpolation: {
    escapeValue: false,
  },
})

export function changeLanguage(lang: Locale) {
  i18n.changeLanguage(lang)
}

export default i18n