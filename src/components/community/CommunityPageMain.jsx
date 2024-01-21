import React from 'react'
import SideMenu from './SideMenu'
import { Box, Stack, Container } from '@mui/material'
import { Outlet } from 'react-router-dom'

const CommunityPageMain = () => {
  return (
    // 커뮤니티 메인 내용이 너무 없어서 footer가 상담으로 올라오는거때문에 임의로 높이값 잡아둠
    <Box minWidth="1440px" height={'1000px'}> 
      <Container maxWidth="xl">
        <Stack direction="row" spacing={2}>
          <SideMenu />
          <Outlet />
        </Stack>
      </Container>
    </Box>
  )
}

export default CommunityPageMain