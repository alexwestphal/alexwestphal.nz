import React from 'react'
import type { Metadata } from 'next'

import CssBaseline from '@mui/material/CssBaseline'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import { ThemeProvider } from '@mui/material/styles'

import theme from '@/app/theme'

import NavigationDrawer from '@/components/NavigationDrawer'


export const metadata: Metadata = {
  title: "Alex Westphal",
  description: "Personal Website of Alex Westphal",
};

export default function RootLayout(props: Readonly<{children: React.ReactNode }>) {
  return <html lang="en">
      <body>
        <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <div style={{ display: 'flex' }}>
                    <NavigationDrawer/>
                    <main style={{ flexGrow: 1 }}>{props.children}</main>
                </div>
            
            </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
}