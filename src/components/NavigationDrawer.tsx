'use client'

import React from 'react'
import NextLink from 'next/link'

import AppsIcon from '@mui/icons-material/Apps'
import ArticleIcon from '@mui/icons-material/Article'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import DarkModeIcon from '@mui/icons-material/DarkModeOutlined'
import GitHubIcon from '@mui/icons-material/GitHub'
import LightModeIcon from '@mui/icons-material/LightMode'
import PersonIcon from '@mui/icons-material/Person4'
import RTLIcon from '@mui/icons-material/FormatTextdirectionRToLSharp'
import ScienceIcon from '@mui/icons-material/Science'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightnessSharp'
import TranslateIcon from '@mui/icons-material/TranslateSharp'

import { NoSsr } from '@mui/base'
import { Box, Button, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Menu, MenuItem, Paper, Tooltip, listItemButtonClasses, listItemIconClasses } from '@mui/material'

import { UserPreferences, useUserPreferences } from '@/app/UserPreferences'
import { cls, createClasses, createIDs } from '@/util/cls'



const DRAWER_WIDTH = 320;

const navItems: { label: string, key: string, icon?: React.ReactNode }[] = [
    { label: 'Profile', key: 'profile', icon: <PersonIcon/> },
    { label: 'Articles', key: 'articles', icon: <ArticleIcon/> },
    { label: 'Projects', key: 'projects', icon: <AppsIcon/> },
    { label: 'Experiments', key: 'experiments', icon: <ScienceIcon/> },
]

export const navigationDrawerClasses = createClasses('NavigationDrawer', ['closed', 'collapseControl', 'copyright', 'header', 'listItem', 'name', 'open', 'scrollable'])


export default function NavigationDrawer() {

    const [open, setOpen] = React.useState(true)

    const handleDrawerOpen = () => {
        setOpen(true)
    }
    const handleDrawerClose = () => {
        setOpen(false)
    }

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
                    width: DRAWER_WIDTH,
                    transition: theme.transitions.create('width', {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.enteringScreen,
                    }),
                },
                [`&.${classes.closed}`]: {
                    transition: theme.transitions.create('width', {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
                    width: `calc(${theme.spacing(7)} + 1px)`,
                    [theme.breakpoints.up('sm')]: {
                        width: `calc(${theme.spacing(8)} + 1px)`,
                    },
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
                paddingY: 2,
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
            <List>
                {navItems.map((navItem) => (
                    <ListItem 
                        key={navItem.key}
                        className={classes.listItem}
                        disablePadding
                        >
                        <ListItemButton LinkComponent={NextLink} href={`/${navItem.key}`}>
                            <ListItemIcon>
                                {navItem.icon}
                            </ListItemIcon>
                            <ListItemText primary={navItem.label} sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem>
                ))}
                </List>
                <Divider />
        </div>
        {open && <div className={classes.copyright}>© {new Date().getFullYear()} Alex Westphal.</div>}
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

const experienceControlsClasses = createClasses('ExperienceControls', [])

const ExperienceControls: React.FC<ExperienceControlsProps> = ({drawerOpen}) => {

    const userPreferences = useUserPreferences()
    const [colorModeMenuAnchorEl, setColorModeMenuAnchorEl] = React.useState<HTMLElement | null>(null)

    const classes = experienceControlsClasses
    return <Box 
        className={classes.root}
        sx={{
            [`&.${classes.root}`]: {
                display: 'flex',
                justifyContent: 'space-around',
                marginY: 1,
            },
        }}
    >
        <ColorModeControl colorMode={userPreferences.colorMode} onChange={(value) => userPreferences.setColorMode(value)}/>
        <IconButton>
            <TranslateIcon/>
        </IconButton>
        <IconButton>
            <RTLIcon/>
        </IconButton>
        <IconButton>
            <GitHubIcon/>
        </IconButton>
        <Menu 
            open={Boolean(colorModeMenuAnchorEl)}
            anchorEl={colorModeMenuAnchorEl}
        >

        </Menu>
    </Box>
}

interface ColorModeControlProps {
    colorMode: UserPreferences.ColorMode
    onChange: (colorMode: UserPreferences.ColorMode) => void
}

const colorModeControlIDS = createIDs('ColorModeControl', ['button', 'menu'])

const ColorModeControl: React.FC<ColorModeControlProps> = ({ colorMode, onChange }) => {

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

    return <>
        <Tooltip title="Change Color Mode">
            <IconButton
                id={colorModeControlIDS.button}
                aria-controls={menuOpen ? colorModeControlIDS.menu : undefined}
                aria-haspopup="true"
                aria-expanded={menuOpen ? 'true' : undefined}
                onClick={handleOpenMenu}
            >
                <DarkModeIcon/>
            </IconButton>
        </Tooltip>
        
        <Menu
            id={colorModeControlIDS.menu}
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={handleClose}
            MenuListProps={{
                'aria-labelledby': colorModeControlIDS.button,
                disablePadding: true,
                sx: { width: 200 }
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
                <ListItemText>Light</ListItemText>
            </MenuItem>
            <MenuItem
                selected={colorMode == 'system'}
                onClick={() => handleClickMenuItem('system')}
            >
                <ListItemIcon>
                    <SettingsBrightnessIcon fontSize="small"/>
                </ListItemIcon>
                <ListItemText>System</ListItemText>
            </MenuItem>
            <MenuItem
                selected={colorMode == 'dark'}
                onClick={() => handleClickMenuItem('dark')}
            >
                <ListItemIcon>
                    <DarkModeIcon fontSize="small"/>
                </ListItemIcon>
                <ListItemText>Dark</ListItemText>
            </MenuItem>
        </Menu>
    </>
}