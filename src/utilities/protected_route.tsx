import { Box, Button, Card, TextField, Typography } from "@mui/material"
import * as React from "react"
import { Outlet } from "react-router-dom"

const ProtectedRoute = () => {

    const [loginState, setLoginState] = React.useState<null | boolean>(null)

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
                    <Typography>Login</Typography>
                    <TextField
                        sx={{
                            backgroundColor: "#EEF1F8",
                        }}
                        label="Id"
                        variant="outlined"
                        margin="dense"
                        size="small"
                    />
                    <TextField
                        sx={{
                            backgroundColor: "#EEF1F8",
                        }}
                        label="Name"
                        variant="outlined"
                        margin="dense"
                        size="small"
                    />
                    <Button variant="contained" onClick={handleLogin}>Login</Button>
                </Card>
            </Box>
        )
    }
}

export default ProtectedRoute