
import type { Metadata } from 'next'
import React from 'react'

import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'

import NavigationDrawer from '@/components/NavigationDrawer'

import {UserPreferencesProvider} from './UserPreferences'

export const metadata: Metadata = {
    title: "Alex Westphal",
    description: "Personal Website of Alex Westphal",
}

export default function RootLayout(props: Readonly<{ children: React.ReactNode }>) {

    return <AppRouterCacheProvider>
        <UserPreferencesProvider>
            <html lang="en">
                <body>
                    <div style={{ display: 'flex' }}>
                        <NavigationDrawer/>
                        
                        <main style={{ flexGrow: 1 }}>{props.children}</main>
                    </div>
                </body>
            </html>
            
        </UserPreferencesProvider>
    </AppRouterCacheProvider>
}