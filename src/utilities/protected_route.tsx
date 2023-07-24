import { Box, Button, Card, Typography } from "@mui/material"
import * as React from "react"
import { Outlet } from "react-router-dom"
import { useAppContext } from "../context/context_provider"

const ProtectedRoute = () => {

    const { loginState, handleLogin } = useAppContext()
    const idRef = React.useRef(null)
    const nameRef = React.useRef(null)

    const handleLoginButton = () => {
        if (idRef.current && idRef.current["value"] && nameRef.current && nameRef.current["value"]) {
            handleLogin(idRef.current["value"], nameRef.current["value"])
        }
    }

    if (loginState === true) {
        return (
            <Outlet />
        )
    } else if (loginState === false) {
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
                            ref={idRef}
                            style={{
                                border: "none",
                                outline: "none",
                                backgroundColor: "#EEF1F8",
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
                            ref={nameRef}
                            style={{
                                border: "none",
                                outline: "none",
                                backgroundColor: "#EEF1F8",
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
                            textTransform: "unset",
                            backgroundColor: "#5285EC",
                            borderRadius: "8px"
                        }} variant="contained" onClick={handleLoginButton}>Login</Button>
                    </Box>
                </Card>
            </Box>
        )
    } else {
        return <></>
    }
}

export default ProtectedRoute