import { Box, Stack } from '@mui/material'
import React from 'react'
import AdminSidebar from './AdminSidebar'
import { Outlet } from 'react-router-dom'

const AdminPage = () => {
    return (
        <Box>
            <Stack direction="row" spacing={2}>
                <AdminSidebar/>
                <Outlet/>
            </Stack>
        </Box>
    )
}

export default AdminPage