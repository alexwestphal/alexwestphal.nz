
'use client'

import React from 'react'
import NextLink from 'next/link'

import AppsIcon from '@mui/icons-material/Apps'
import ArticleIcon from '@mui/icons-material/Article'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import PersonIcon from '@mui/icons-material/Person4'
import ScienceIcon from '@mui/icons-material/Science'

import { Button, Divider, IconButton, List, ListItem, ListItemButton, listItemButtonClasses, ListItemIcon, listItemIconClasses, ListItemText, Paper } from '@mui/material'


import { cls, createClasses } from '@/util/cls'



const drawerWidth = 320;

const navItems: { label: string, key: string, icon?: React.ReactNode }[] = [
    { label: 'Profile', key: 'profile', icon: <PersonIcon/> },
    { label: 'Articles', key: 'articles', icon: <ArticleIcon/> },
    { label: 'Projects', key: 'projects', icon: <AppsIcon/> },
    { label: 'Experiments', key: 'experiments', icon: <ScienceIcon/> },
]

export const navigationDrawerClasses = createClasses('NavigationDrawer', ['closed', 'collapseControl', 'copyright', 'experienceControls', 'header', 'listItem', 'name', 'open', 'scrollable'])

export default function NavigationDrawer() {

    const [open, setOpen] = React.useState(true);

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
                    width: drawerWidth,
                    transition: theme.transitions.create('width', {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.enteringScreen,
                    }),
                    overflowX: 'hidden',
                },
                [`&.${classes.closed}`]: {
                    transition: theme.transitions.create('width', {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
                    overflowX: 'hidden',
                    width: `calc(${theme.spacing(7)} + 1px)`,
                    [theme.breakpoints.up('sm')]: {
                        width: `calc(${theme.spacing(8)} + 1px)`,
                    },
                },
            },

            [`& .${classes.copyright}`]: {
                padding: 2,
                color: theme.palette.text.secondary,
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
                    mr: open ? 3 : 'auto',
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
            <div className={classes.experienceControls}>
                <IconButton>

                </IconButton>
            </div>
        </div>
        
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
    </Paper>
}