
// import {createLocalizedPathnamesNavigation} from 'next-intl/navigation';
// import {supportedLocales} from './config';
 
// export const {Link, redirect, usePathname, useRouter, getPathname} =
//   createLocalizedPathnamesNavigation({locales: supportedLocales, pathnames: {}, /* ... */});

import {createSharedPathnamesNavigation} from 'next-intl/navigation'
import {supportedLocales} from './config'
 
export const {Link, redirect, usePathname, useRouter} = createSharedPathnamesNavigation({locales: supportedLocales})
