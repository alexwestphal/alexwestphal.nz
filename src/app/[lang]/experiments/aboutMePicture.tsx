
import React from 'react'

import AccessibilityIcon from '@mui/icons-material/AccessibilityNewOutlined'
import CloudIcon from '@mui/icons-material/CloudOutlined'
import CodeIcon from '@mui/icons-material/CodeOutlined';
import ComputerIcon from '@mui/icons-material/Computer'
import PlayIcon from '@mui/icons-material/PlayCircleOutline'
import WorkIcon from '@mui/icons-material/WorkOutline'
import SchoolIcon from '@mui/icons-material/SchoolOutlined';
import TranslateIcon from '@mui/icons-material/TranslateOutlined';
import BikeIcon from '@mui/icons-material/DirectionsBikeOutlined';
import KayakingIcon from '@mui/icons-material/KayakingOutlined';
import HikingIcon from '@mui/icons-material/HikingOutlined';
import ScubaDivingIcon from '@mui/icons-material/ScubaDivingOutlined'
import FireIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
import SatelliteIcon from '@mui/icons-material/SatelliteAltOutlined'
import AirportShuttleIcon from '@mui/icons-material/AirportShuttleOutlined'
import LocalShippingIcon from '@mui/icons-material/LocalShippingOutlined';

import GridIcon from '@mui/icons-material/GridOnOutlined';


import {Box} from '@mui/material'

export interface ActivityCollectorProps {
    activityId: number
}

export const ActivityCollector: React.FC<ActivityCollectorProps> = (props) => {

    // return <div className={cls("ActivityCollector")}>Activity</div>

    return <Box sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        '& svg': {
            position: 'absolute',
            fontSize: 50
        },

        '& .page': {
            position: 'relative',
            width: 800,
            height: 600,
        },

        '& .name': {
            position: 'absolute',
            top: 50,
            left: (800-350)/2,
            width: 350,
            textAlign: 'center',
            fontSize: '40px'
        },

        '& .section': {
            position: 'absolute',
            width: 0,
            height: 0,
            '& .sa': {
                top: -40, left: -40,
                fontSize: 80,
            },
            '& .sb': {
                top: -15, left: -20,
                fontSize: 40
            },
            '& .s1': {
                top: -100, left: -25,
            },
            '& .s2': {
                top: 40, left: -25,
            },
            '& .s3': {
                left: -100, top: -25,
            },
            '& .s4': {
                left: 50, top: -25,
            },
        },

        '& .hebrew': {
            position: 'absolute',
            top: 500, left: (800-250)/2,
            fontSize: 40,
            width: 250,
            textAlign: 'center',
        },
    }}>
        <div className="page">
            <div className="name">ALEX WESTPHAL NZ-RT11</div>

            <div className="section" style={{ top: 275, left: 150 }}>
                <WorkIcon className="sa"/>
                <CodeIcon className="sb"/>
                <CloudIcon className="s1"/>
                <TranslateIcon className="s2"/>
                <SchoolIcon className="s3"/>
                <AccessibilityIcon className="s4"/>

            </div>
            <div className="section" style={{ top: 275, left: 800 - 150 }}>
                <PlayIcon className="sa"/>
                <BikeIcon className="s1"/>
                <KayakingIcon className="s2"/>
                <HikingIcon className="s3"/>
                <ScubaDivingIcon className="s4"/>
            </div>
            <div className="section" style={{ top: 350, left: 800/2 }}>
                <FireIcon className="sa"/>
                <SatelliteIcon className="s1"/>
                <GridIcon className="s2"/>
                <AirportShuttleIcon className="s3"/>
                <LocalShippingIcon className="s4"/>
            </div>
            <div dir="rtl" className="hebrew">
                אלכס ווסטפאל
            </div>
        </div>
    </Box>
}