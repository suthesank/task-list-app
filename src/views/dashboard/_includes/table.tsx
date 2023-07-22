import * as React from "react"
import { Box, Card, Divider } from "@mui/material"

const ListTable = (props: {
    rows: React.JSX.Element[]
}) => {

    return (
        <Card sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#FFFFFF",
            boxShadow: "0px 3px 6px #00000014",
            paddingY: "24px",
            paddingX: "24px",
            borderRadius: {
                xs: "unset",
                md: "12px",
            }
        }}>
            <>
                {props.rows.map((element, idx) => {
                    return (
                        <Box
                            key={idx}
                            sx={{
                                display: "flex",
                                flexDirection: "column"
                            }}>
                            {idx > 0 && <Divider sx={{ marginY: "14px", backgroundColor: "#E8E8E8", height: "2px" }} />}
                            {element}
                        </Box>
                    )
                })}
            </>
        </Card>
    )
}

export default ListTable