

import React from 'react'

import { Box } from '@mui/material'


export interface ArticleProps {
    children: React.ReactNode
}

export default function Article(props: ArticleProps) {
    return <Box 
        component="article"
        sx={{ padding: 2 }}
    >{props.children}</Box>
}