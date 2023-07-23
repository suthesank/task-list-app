import { Avatar, Box, Button, Container, Typography } from '@mui/material';
import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { useAppContext } from '../../context/context_provider';


const Layout = () => {

    const { handleLogout, userCreds } = useAppContext()

    return (
        <Box sx={{
            width: "100%",
            height: "100vh",
        }}>
            <Box sx={{
                height: 72,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#FFFFFF",
                boxShadow: "0px 3px 6px #00000029",
            }}>
                <Container sx={{
                    maxWidth: "960px !important",
                    padding: "unset !important",
                    display: "flex",
                    justifyContent: "space-between",
                    marginX: "24px"
                }}>
                    <Box sx={{
                        display: "flex",
                        alignItems: "center"
                    }}>
                        <Avatar
                            alt={userCreds ? userCreds["name"] : ""}
                            src="/avatar.png"
                            sx={{ width: 48, height: 48 }}
                        />
                        <Typography fontSize="16px" color="#6D8187" marginLeft="16px">{userCreds ? userCreds["name"] : ""}</Typography>
                    </Box>
                    <Button onClick={handleLogout} sx={{ textTransform: "unset", color: "#6D8187", fontSize: "16px" }} >Logout</Button>
                </Container>
            </Box>
            <Box sx={{
                display: "flex",
                justifyContent: "center",
                height: {
                    md: "calc(100vh - 72px)"
                }
            }}>
                <Container sx={{
                    maxWidth: "960px !important",
                    paddingX: "unset !important",
                    paddingY: {
                        xs: "12px",
                        md: "22px"
                    },
                    marginX: {
                        xs: "unset",
                        md: "24px"
                    }
                }}>
                    <Outlet />
                </Container>
            </Box>

        </Box>
    )
}

export default Layout