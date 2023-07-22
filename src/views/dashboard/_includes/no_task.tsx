import * as React from "react"
import { Box, Button, Card, Typography } from "@mui/material"

const NoTask = () => {
    return (
        <Box sx={{
            display: "flex",
            alignItems: {
                md: "center"
            },
            justifyContent: "center",
            height: "100%"
        }}>
            <Card sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#FFFFFF",
                width: {
                    xs: "100%",
                    md: "304px"
                },
                height: "158px",
                boxShadow: "0px 3px 6px #0000000A",
                borderRadius: {
                    xs: "unset",
                    md: "12px"
                },
                padding: "37px 0"
            }}>
                <Typography fontSize="20px" color="#537178">You have no task.</Typography>
                <Button
                    sx={{
                        height: "40px",
                        borderRadius: "8px",
                        width: "124px",
                        backgroundColor: "#5285EC",
                        marginTop: "20px"
                    }}
                    variant="contained">
                    + New Task
                </Button>
            </Card>
        </Box>
    )
}

export default NoTask