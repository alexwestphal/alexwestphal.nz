
import { LocalePrefix, Pathnames } from 'next-intl/routing'

export const defaultLocale = 'en'

export const localePrefix = 'always' satisfies LocalePrefix

export const supportedLocales = ['de', 'en', 'es', 'fr', 'he', 'mi', 'nl', 'uk'] as const

export const isLocaleRTL = (locale: string) => ['he'].includes(locale)

// export const pathnames = {

//     '/about-me': {
//         de: '',
//         en: '/about-me',
//         es: '',
//         fr: '',
//         nl: '/over-mij'
//     },

// } satisfies Pathnames<typeof supportedLocales>