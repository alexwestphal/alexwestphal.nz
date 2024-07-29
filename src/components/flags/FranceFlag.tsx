
import React from 'react'

import {FlagBase, FlagProps} from './Flag'



export function FranceFlag({viewBox}: FlagProps) {

    return <FlagBase >
        <rect x1={0} y1={0} x2={8} y2={16}></rect>
    </svg>
}

export namespace FranceFlag {

    export const NativeAspectRatio = 1.5

    export const Blue = '#002654'
    export const White = '#FFFFFF'
    export const Red = '#CE1126'
}