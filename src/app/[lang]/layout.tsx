

import { NextIntlClientProvider } from 'next-intl'
import { getMessages} from 'next-intl/server'
import type { Metadata } from 'next'
import React from 'react'

import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'

import NavigationDrawer from '@/components/nav/NavigationDrawer'
import {UserPreferencesProvider } from '@/core/UserPreferences'

export const metadata: Metadata = {
    title: "Alex Westphal",
    description: "Personal Website of Alex Westphal",
}

export default async function RootLayout(props: Readonly<{ children: React.ReactNode, locale: string }>) {

    const messages = await getMessages({ locale: props.locale })

    return <AppRouterCacheProvider>
        <UserPreferencesProvider locale={props.locale}>
            <NextIntlClientProvider messages={messages}>
                <body>
                    <div style={{ display: 'flex' }}>
                        <NavigationDrawer/>
                        
                        <main style={{ flexGrow: 1 }}>{props.children}</main>
                    </div>
                </body>
            </NextIntlClientProvider>
        </UserPreferencesProvider>
    </AppRouterCacheProvider>
}