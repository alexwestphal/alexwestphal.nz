
import { useTranslations } from 'next-intl'
import React from 'react'

import AutoModeIcon from '@mui/icons-material/AutoMode'
import LToRIcon from '@mui/icons-material/FormatTextdirectionLToRSharp'
import RToLIcon from '@mui/icons-material/FormatTextdirectionRToLSharp'

import {IconButton, ListItemIcon, ListSubheader, Menu, MenuItem, Tooltip} from '@mui/material'

import { UserPreferences, cls, createClasses, createIDs } from '@/core'

export interface TextDirectionControlProps {

}

export const textDirectionControlClasses = createClasses('TextDirectionControl', ['button', 'menu'])
export const textDirectionControlIDs = createIDs('TextDirectionControl', ['button', 'menu'])

