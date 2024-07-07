
'use client'

import {Roboto} from 'next/font/google'
import React, { useContext } from 'react'

import { CssBaseline, useMediaQuery } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
})

interface UserPreferences {
    readonly colorMode: UserPreferences.ColorMode
    setColorMode(mode: UserPreferences.ColorMode): void

}

export namespace UserPreferences {

    export type ColorMode = 'light' | 'dark' | 'system'

    export type State = Pick<UserPreferences, 'colorMode'>

    export const DefaultState: State = {
        colorMode: 'system'
    }
}

export const UserPreferencesContext = React.createContext<UserPreferences>({
    ...UserPreferences.DefaultState,
    setColorMode() {},
})

export interface UserPreferencesProviderProps {
    children: React.ReactNode
}

export const UserPreferencesProvider: React.FC<UserPreferencesProviderProps> = ({children}) => {

    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const [{colorMode}, setState] = React.useState<UserPreferences.State>(UserPreferences.DefaultState)

    const configuration = React.useMemo(() => ({
        colorMode,
        setColorMode: (mode: UserPreferences.ColorMode) => {
            setState(prev => ({...prev, colorMode: mode }))
        },
    } satisfies UserPreferences) , [colorMode])

    const theme = React.useMemo(() => createTheme({
        palette: {
            mode: colorMode == 'system' ? (prefersDarkMode ? 'dark' : 'light') : colorMode,
        },
        typography: {
            fontFamily: roboto.style.fontFamily
        },
    
    }), [colorMode])

    return <UserPreferencesContext.Provider value={configuration}>
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            {children}
        </ThemeProvider>
    </UserPreferencesContext.Provider>
    
    
}


export const useUserPreferences = () => useContext(UserPreferencesContext)