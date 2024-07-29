
import { NextRequest } from 'next/server'
import createMiddleware from 'next-intl/middleware'

import {defaultLocale, supportedLocales} from './config'



const intlMiddleware = createMiddleware({
    locales: supportedLocales,
    defaultLocale,
})

export default function middleware(request: NextRequest) {
    const {pathname} = request.nextUrl

    const shouldHandle = pathname === '/' || new RegExp(`^/(${supportedLocales.join('|')})(/.*)?$`).test(request.nextUrl.pathname)
    if(!shouldHandle) return

    return intlMiddleware(request)
}