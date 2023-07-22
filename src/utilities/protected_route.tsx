import { Box, Button, Card, Typography } from "@mui/material"
import * as React from "react"
import { Outlet } from "react-router-dom"
import { useAppContext } from "../context/context_provider"

const ProtectedRoute = () => {

    const { loginState, setLoginState } = useAppContext()

    const handleLogin = () => {
        localStorage.setItem("loginCreds", "true")
        setLoginState(true)
    }

    React.useEffect(() => {
        const login_creds = localStorage.getItem("loginCreds");
        if (login_creds) {
            setLoginState(true)
        } else {
            setLoginState(false)
        }
    }, [])

    if (loginState) {
        return (
            <Outlet />
        )
    } else {
        return (
            <Box sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
            }}>
                <Card sx={{
                    width: 296,
                    height: 249,
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "white",
                    padding: "24px 24px 33px 24px",
                    borderRadius: "12px",
                }}>
                    <Typography fontSize="20px" color="#537178">Login</Typography>

                    <Box sx={{
                        display: 'grid',
                        gap: "12px",
                        gridTemplateRows: "repeat(3, 1fr)",
                        marginTop: "24px"
                    }}>
                        <input
                            style={{
                                border: "none",
                                outline: "none",
                                backgroundColor: "#D9DFEB",
                                borderRadius: "8px",
                                height: "40px",
                                width: "244px",
                                fontSize: "14px",
                                padding: "11px 16px",
                                color: "#7A7D7E"
                            }}
                            placeholder="Id"
                        />
                        <input
                            style={{
                                border: "none",
                                outline: "none",
                                backgroundColor: "#D9DFEB",
                                borderRadius: "8px",
                                height: "40px",
                                width: "244px",
                                fontSize: "14px",
                                padding: "11px 16px",
                                color: "#7A7D7E"
                            }}
                            placeholder="Name"
                        />
                        <Button sx={{
                            backgroundColor: "#5285EC",
                            borderRadius: "8px"
                        }} variant="contained" onClick={handleLogin}>Login</Button>
                    </Box>
                </Card>
            </Box>
        )
    }
}

export default ProtectedRoute