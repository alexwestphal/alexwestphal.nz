
import React from 'react'

import { cls } from '@/core'


export interface FlagProps {
    aspectRatio: 'native' | 'fill' | number
    rotation: number
    viewBox: { x: number, y: number, width: number, height: number }
}

export namespace FlagProps {
    export const Default: FlagProps = {
        aspectRatio: 'native',
        rotation: 0,
        viewBox: { x: 0, y: 0, width: 24, height: 24 }
    }
}

export interface Flag<ColorName extends string = never> {
    (props: FlagProps): React.ReactNode

    readonly flagName: string

    readonly colors: Record<ColorName, string>
    readonly nativeAspectRatio: number
}

interface CreateFlagOptions<ColorName extends string = never> {
    readonly flagName: string

    readonly colors: Record<ColorName, string>
    readonly nativeAspectRatio: number
}

export function createFlag<ColorName extends string>(options: CreateFlagOptions<ColorName>, render: (props: FlagProps & CreateFlagOptions<ColorName>) => React.ReactNode): Flag {

    return Object.assign(function(props: FlagProps) {
        return <svg className={cls(`Flag-${options.flagName}`)}>{render({...props, ...options})}</svg>
    }, options)
}