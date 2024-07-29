
import { useTranslations } from 'next-intl'
import React from 'react'

import TranslateIcon from '@mui/icons-material/TranslateSharp'
import { Button, Dialog, IconButton, Tooltip } from '@mui/material'

import { UserPreferences, cls, createClasses, createIDs } from '@/core'

export interface I18nControlProps {
    className?: string
}

export const i18nControlClasses = createClasses('I18nControl', ['button'])
export const i18nControlIDs = createIDs('I18nControl', ['button', 'dialog'])

export const I18nControl: React.FC<I18nControlProps> = ({className}) => {

    const t = useTranslations('I18nControl')

    const [dialogOpen, setDialogOpen] = React.useState<boolean>(false)

    return <>
        <Tooltip title="Language">
            <IconButton
                className={cls(i18nControlClasses.button, className)}
            >
                <TranslateIcon/>
            </IconButton>
        </Tooltip>

        {/* <Dialog></Dialog> */}
    </>
}