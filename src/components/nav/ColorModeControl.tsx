
import { useTranslations } from 'next-intl'
import React from 'react'

import DarkModeIcon from '@mui/icons-material/DarkModeOutlined'
import LightModeIcon from '@mui/icons-material/LightMode'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightnessSharp'

import { IconButton, ListItemIcon, ListItemText, ListSubheader, Menu, MenuItem, Tooltip } from '@mui/material'

import { UserPreferences, cls, createClasses, createIDs } from '@/core'


export interface ColorModeControlProps {
    colorMode: UserPreferences.ColorMode
    onChange: (colorMode: UserPreferences.ColorMode) => void
    className?: string
}

export const colorModeControlClasses = createClasses('ColorModeControl', ['button', 'menu'])
export const colorModeControlIDs = createIDs('ColorModeControl', ['button', 'menu'])

export const ColorModeControl: React.FC<ColorModeControlProps> = ({ colorMode, onChange, className }) => {

    const t = useTranslations('ColorModeControl')

    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null)
    const menuOpen = Boolean(anchorEl)

    const handleOpenMenu = (ev: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(ev.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleClickMenuItem = (newColorMode: UserPreferences.ColorMode) => {
        if(newColorMode != colorMode) onChange(newColorMode)
        setAnchorEl(null)
    }

    const classes = colorModeControlClasses
    return <>
        <Tooltip title={t('buttonTooltip')}>
            <IconButton
                className={cls(classes.button, className)}
                id={colorModeControlIDs.button}
                aria-controls={menuOpen ? colorModeControlIDs.menu : undefined}
                aria-haspopup="true"
                aria-expanded={menuOpen ? 'true' : undefined}
                onClick={handleOpenMenu}
                sx={{}}
            >
                <DarkModeIcon/>
            </IconButton>
        </Tooltip>
        
        <Menu
            className={classes.menu}
            id={colorModeControlIDs.menu}
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={handleClose}
            MenuListProps={{
                'aria-labelledby': colorModeControlIDs.button,
                disablePadding: true,
                sx: { width: 200 }
            }}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'left'
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
            }}
        >
            <ListSubheader>Color Mode</ListSubheader>
            <MenuItem
                selected={colorMode == 'light'}
                onClick={() => handleClickMenuItem('light')}
            >
                <ListItemIcon>
                    <LightModeIcon fontSize="small"/>
                </ListItemIcon>
                <ListItemText>{t('optionLight')}</ListItemText>
            </MenuItem>
            <MenuItem
                selected={colorMode == 'system'}
                onClick={() => handleClickMenuItem('system')}
            >
                <ListItemIcon>
                    <SettingsBrightnessIcon fontSize="small"/>
                </ListItemIcon>
                <ListItemText>{t('optionSystem')}</ListItemText>
            </MenuItem>
            <MenuItem
                selected={colorMode == 'dark'}
                onClick={() => handleClickMenuItem('dark')}
            >
                <ListItemIcon>
                    <DarkModeIcon fontSize="small"/>
                </ListItemIcon>
                <ListItemText>{t('optionDark')}</ListItemText>
            </MenuItem>
        </Menu>
    </>
}