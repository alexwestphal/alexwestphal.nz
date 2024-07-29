'use client'

import { useTranslations } from 'next-intl'
import React from 'react'

import AppsIcon from '@mui/icons-material/Apps'
import ArticleIcon from '@mui/icons-material/Article'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import GitHubIcon from '@mui/icons-material/GitHub'
import LoginIcon from '@mui/icons-material/Login'
import PersonIcon from '@mui/icons-material/Person4'
import RTLIcon from '@mui/icons-material/FormatTextdirectionRToLSharp'
import ScienceIcon from '@mui/icons-material/Science'
import SettingsIcon from '@mui/icons-material/Settings'

import { NoSsr } from '@mui/base'
import { Box, Button, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Tooltip, buttonClasses, iconButtonClasses, listItemButtonClasses, listItemIconClasses } from '@mui/material'

import { useUserPreferences, cls, createClasses } from '@/core'
import {Link as NextLink} from '@/navigation'

import { ColorModeControl } from './ColorModeControl'
import { I18nControl } from './I18nControl'

const DRAWER_WIDTH_OPEN = 320;
const DRAWER_WIDTH_CLOSED = 64;
const ICON_BUTTON_HEIGHT = 48;
const ICON_BUTTON_WIDTH = 64;


export const navigationDrawerClasses = createClasses('NavigationDrawer', ['closed', 'collapseControl', 'copyright', 'header', 'listItem', 'name', 'open', 'scrollable'])

export default function NavigationDrawer() {

    const t = useTranslations('NavigationDrawer')

    const [open, setOpen] = React.useState(true)

    const handleDrawerOpen = () => {
        setOpen(true)
    }
    const handleDrawerClose = () => {
        setOpen(false)
    }

    const navItems: { label: string, key: string, icon?: React.ReactNode }[] = [
        { label: t('aboutMe'), key: 'aboutMe', icon: <PersonIcon/> },
        { label: t('articles'), key: 'articles', icon: <ArticleIcon/> },
        { label: t('projects'), key: 'projects', icon: <AppsIcon/> },
        { label: t('experiments'), key: 'experiments', icon: <ScienceIcon/> },
        { label: t('sourceCode'), key: 'sourceCode', icon: <GitHubIcon/> }
    ]

    const classes = navigationDrawerClasses
    return <Paper
        className={cls(classes.root, open ? classes.open : classes.closed )}
        elevation={4} square
        sx={theme => ({
            [`&.${classes.root}`]: {
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                flexShrink: 0,
                whiteSpace: 'nowrap',
                boxSizing: 'border-box',
                overflowX: 'hidden',

                [`&.${classes.open}`]: {
                    width: DRAWER_WIDTH_OPEN + 1,
                    transition: theme.transitions.create('width', {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.enteringScreen,
                    }),
                },
                [`&.${classes.closed}`]: {
                    width: DRAWER_WIDTH_CLOSED + 1, // include the border
                    transition: theme.transitions.create('width', {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
                },
            },

            [`& .${classes.copyright}`]: {
                padding: 2,
                color: 'text.secondary',
                textAlign: 'center',
            },
            [`& .${classes.listItem}`]: {
                display: 'block',

                [`& .${listItemButtonClasses.root}`]: {
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                },
                [`& .${listItemIconClasses.root}`]: {
                    minWidth: 0,
                    [theme.direction == 'ltr' ? 'mr' : 'ml']: open ? 3 : 'auto',
                    justifyContent: 'center',
                },
            },
            [`& .${classes.name}`]: {
                paddingX: 1.5,
                paddingY: 1,
                fontSize: '24px',
                display: 'block',
                textTransform: 'none',
                color: 'inherit',
            },
            [`& .${classes.scrollable}`]: {
                width: 'inherit',
                flexGrow: 1,
                overflowY: 'auto',
                overflowX: 'hidden'
            },
        })}
    >
        <div className={classes.header}>
            
            <Button
                className={classes.name} 
                component={NextLink}
                href="/"
            >{open ? "Alex Westphal" : "AW"}</Button>
        </div>
        <Divider/>
        <ExperienceControls drawerOpen={open}/>
        <Divider/>
        <div className={classes.scrollable}>
            <List disablePadding>
                {navItems.map((navItem) => {
                    const button = <ListItemButton LinkComponent={NextLink} href={`/${navItem.key}`}>
                        <ListItemIcon>
                            {navItem.icon}
                        </ListItemIcon>
                        <ListItemText primary={navItem.label} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                    return <ListItem 
                        key={navItem.key}
                        className={classes.listItem}
                        disablePadding
                        >
                        {open ? button : <Tooltip title={navItem.label} placement="right">{button}</Tooltip>}
                    </ListItem>
                })}
                </List>
                <Divider />
        </div>
        {open && <div className={classes.copyright}>{t('copyright', {year: new Date().getFullYear()})}</div>}
        <Divider/>
        <NoSsr>
            <div className={classes.collapseControl}>
                {open 
                    ? <Button sx={{ width: '100%' }}
                        startIcon={<ChevronLeftIcon/>}
                        onClick={handleDrawerClose}
                    
                    >Collapse Drawer</Button>
                    : <Button onClick={handleDrawerOpen}>
                        <ChevronRightIcon/>
                    </Button>
                }
            </div>
        </NoSsr>
    </Paper>
}



interface ExperienceControlsProps {
    drawerOpen: boolean
}

const experienceControlsClasses = createClasses('ExperienceControls', ['button1', 'button2', 'button3', 'button4', 'button5', 'closed', 'open'])

const ExperienceControls: React.FC<ExperienceControlsProps> = ({drawerOpen}) => {

    const userPreferences = useUserPreferences()

    const classes = experienceControlsClasses
    return <Box 
        className={cls(classes.root, drawerOpen ? classes.open : classes.closed)}
        sx={theme => ({
            [`&.${classes.root}`]: {
                position: 'relative',

                [`&.${classes.open}`]: {
                    height: ICON_BUTTON_HEIGHT,
                    transition: theme.transitions.create('height', {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.enteringScreen,
                    }),

                    [`& > .${iconButtonClasses.root}`]: {
                        top: 0,
                        transition: theme.transitions.create(['top', 'left'], {
                            easing: theme.transitions.easing.sharp,
                            duration: theme.transitions.duration.enteringScreen,
                        }),
                    },

                    [`& .${classes.button1}`]: { left: ICON_BUTTON_WIDTH * 0 },
                    [`& .${classes.button2}`]: { left: ICON_BUTTON_WIDTH * 1 },
                    [`& .${classes.button3}`]: { left: ICON_BUTTON_WIDTH * 2 },
                    [`& .${classes.button4}`]: { left: ICON_BUTTON_WIDTH * 3 },
                    [`& .${classes.button5}`]: { left: ICON_BUTTON_WIDTH * 4 },
                },
                [`&.${classes.closed}`]: {
                    height: ICON_BUTTON_HEIGHT * 5,
                    transition: theme.transitions.create('height', {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.enteringScreen,
                    }),

                    [`& > .${iconButtonClasses.root}`]: {
                        left: 0,
                        transition: theme.transitions.create(['top', 'left'], {
                            easing: theme.transitions.easing.sharp,
                            duration: theme.transitions.duration.enteringScreen,
                        }),
                    },

                    [`& .${classes.button1}`]: { top: ICON_BUTTON_HEIGHT * 0 },
                    [`& .${classes.button2}`]: { top: ICON_BUTTON_HEIGHT * 1 },
                    [`& .${classes.button3}`]: { top: ICON_BUTTON_HEIGHT * 2 },
                    [`& .${classes.button4}`]: { top: ICON_BUTTON_HEIGHT * 3 },
                    [`& .${classes.button5}`]: { top: ICON_BUTTON_HEIGHT * 4 },
                },
            },

            [`& > .${iconButtonClasses.root}`]: {
                position: 'absolute',
                width: ICON_BUTTON_WIDTH,
                height: ICON_BUTTON_HEIGHT,
                borderRadius: 0,
                
            },
        })}
    >
        <ColorModeControl
            className={classes.button1}
            colorMode={userPreferences.colorMode} 
            onChange={(value) => userPreferences.setColorMode(value)}
        />
        <I18nControl
            className={classes.button2}
        />
        <IconButton className={classes.button3}>
            <RTLIcon/>
        </IconButton>
        <IconButton className={classes.button4}>
            <LoginIcon/>
        </IconButton>
        <IconButton className={classes.button5}>
            <SettingsIcon/>
        </IconButton>
    </Box>
}

