import React from 'react'
import SideMenu from './SideMenu'
import { Box, Stack } from '@mui/material'
import { Outlet } from 'react-router-dom'

const CommunityPageMain = () => {
    return (
        <Box>
            <Stack direction="row" spacing={2}>
                <SideMenu />
                <Outlet />
            </Stack>
        </Box>
    )
}

export default CommunityPageMain