import { Avatar, Box, Button, Container, Typography } from '@mui/material';
import * as React from 'react';
import { Outlet } from 'react-router-dom';


const Layout = () => {

    const handleLogout = () => {
        localStorage.removeItem("loginCreds")
        window.location.reload()
    }

    return (
        <Box sx={{
            width: "100%",
            height: "100vh",
        }}>
            <Box sx={{
                height: 72,
                display: "flex",
                alignItems: "center",
                backgroundColor: "#FFFFFF",
                boxShadow: "0px 3px 6px #00000029"
            }}>
                <Container sx={{
                    maxWidth: "960px !important",
                    display: "flex",
                    justifyContent: "space-between"
                }}>
                    <Box sx={{
                        display: "flex",
                        alignItems: "center"
                    }}>
                        <Avatar
                            alt="Remy Sharp"
                            src="/avatar.png"
                            sx={{ width: 48, height: 48 }}
                        />
                        <Typography marginLeft="16px">Ali</Typography>
                    </Box>
                    <Button onClick={handleLogout} sx={{ color: "#6D8187" }} >Logout</Button>
                </Container>
            </Box>
            <Container sx={{
                maxWidth: "960px !important",
            }}>
                <Outlet />
            </Container>
        </Box>
    )
}

export default Layout