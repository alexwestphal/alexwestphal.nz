
'use client'

import {Roboto, Noto_Sans_Hebrew} from 'next/font/google'
import React, { useContext } from 'react'

import { CssBaseline, useMediaQuery } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import { isLocaleRTL } from '@/config'

const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin', 'cyrillic'],
    display: 'swap',
})

const notoSansHebrew = Noto_Sans_Hebrew({
    weight: ['300', '400', '500', '700'],
    subsets: ['hebrew', 'latin'],
    display: 'swap'
})

/**
 * Interface for configuring user preferences.
 */
interface UserPreferences {

    /**
     * The currently configured ColorMode.
     */
    readonly colorMode: UserPreferences.ColorMode

    /**
     * The actual color mode that is applied based on both the configured value and and the user-agent settings.
     */
    readonly actualColorMode: Exclude<UserPreferences.ColorMode, 'system'>

    /**
     * The currently configured Locale.
     */
    readonly locale: string

    /**
     * The currently configured TextDirection.
     */
    readonly textDirection: UserPreferences.TextDirection

    /**
     * The actual text direction applied based on both the configured value and the locale.
     */
    readonly actualTextDirection: Exclude<UserPreferences.TextDirection, 'auto'>

    /**
     * Set the configured ColorMode
     * @param newColorMode The new ColorMode to set
     */
    setColorMode(newColorMode: UserPreferences.ColorMode): void

    /**
     * Set the configured TextDirection
     * @param newTextDirection The new TextDirection to set
     */
    setTextDirection(newTextDirection: UserPreferences.TextDirection): void

}

export namespace UserPreferences {

    export type ColorMode = 'light' | 'dark' | 'system'

    export type TextDirection = 'ltr' | 'rtl' | 'auto'

    export type State = Pick<UserPreferences, 'colorMode' | 'locale' | 'textDirection'>

    export const DefaultState: State = {
        colorMode: 'system',
        locale: 'en',
        textDirection: 'auto'
    }
}

const UserPreferencesContext = React.createContext<UserPreferences>({
    ...UserPreferences.DefaultState,
    actualColorMode: 'light',
    actualTextDirection: 'ltr',
    setColorMode() {},
    setTextDirection() {},
})


export interface UserPreferencesProviderProps {
    children: React.ReactNode
    locale: string
}

export const UserPreferencesProvider: React.FC<UserPreferencesProviderProps> = ({children, locale}) => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
    
    const [{colorMode, textDirection}, setState] = React.useState<UserPreferences.State>(UserPreferences.DefaultState)

    const userPreferences = React.useMemo(() => ({
        colorMode, locale, textDirection,
        actualColorMode: colorMode == 'system' ? (prefersDarkMode ? 'dark' : 'light') : colorMode,
        actualTextDirection: textDirection == 'auto' ? (isLocaleRTL(locale) ? 'rtl' : 'ltr' ) : textDirection,
        setColorMode(newColorMode: UserPreferences.ColorMode) {
            setState(prev => ({...prev, colorMode: newColorMode }))
        },
        setTextDirection(newTextDirection: UserPreferences.TextDirection) {
            setState(prev => ({...prev, textDirection: newTextDirection}))
        }
    } satisfies UserPreferences) , [colorMode, textDirection, locale])

    const theme = React.useMemo(() => {
        let fontFamily: string
        if(locale == 'he') fontFamily = notoSansHebrew.style.fontFamily
        else fontFamily = roboto.style.fontFamily

        return createTheme({
            direction: userPreferences.actualTextDirection,
            palette: {
                mode: userPreferences.actualColorMode,
            },
            typography: {
                fontFamily
            },
        
        })
    }, [prefersDarkMode, userPreferences.actualColorMode, userPreferences.actualTextDirection, locale])

    return <UserPreferencesContext.Provider value={userPreferences}>
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <html lang={userPreferences.locale} dir={userPreferences.actualTextDirection}>
                {children}
            </html>
        </ThemeProvider>
    </UserPreferencesContext.Provider>
    
    
}


export const useUserPreferences = () => useContext(UserPreferencesContext)

