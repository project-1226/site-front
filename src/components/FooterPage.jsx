import { Box, Container, Link, Typography } from "@mui/material";
import React from "react";

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary">
            {"Copyright © "}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const FooterPage = () => {
    return (
        <>
            <Box
                component="footer"
                sx={{
                    py: 3,
                    px: 2,
                    mt: "auto",
                    backgroundColor: (theme) =>
                        theme.palette.mode === "light"
                            ? theme.palette.grey[200]
                            : theme.palette.grey[800],
                }}
            >
                <Container maxWidth="sm">
                    <Typography variant="body1">
                        My sticky footer can be found here.
                    </Typography>
                    <Copyright />
                </Container>
            </Box>
        </>
    );
};

export default FooterPage;
