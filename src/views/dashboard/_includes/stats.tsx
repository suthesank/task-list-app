import * as React from "react"
import { Box, Card, Stack, Typography } from "@mui/material"
import { PieChart } from "@mui/x-charts"

const StatsCard = (props: {
    children: React.JSX.Element
}) => {
    return (
        <Card sx={{
            height: "158px",
            boxShadow: "0px 3px 6px #0000000A",
            paddingY: "24px",
            paddingX: {
                xs: "32px",
                md: "24px"
            },
            borderRadius: {
                xs: "unset",
                md: "12px",
            }
        }}>
            {props.children}
        </Card>
    )
}

const Stats = (props: {
    data: Record<string, any>
}) => {
    const pieParams = { height: 103, width: 103, margin: { right: 1 } };
    const data = props.data
    return (
        <Box sx={{
            display: 'grid',
            gap: {
                xs: "8px",
                md: "24px"
            },
            gridTemplateColumns: {
                xs: "unset",
                md: "repeat(3, 1fr)"
            },
            gridTemplateRows: {
                xs: "repeat(3, 1fr)",
                md: "unset"
            }
        }}>
            <StatsCard>
                <>
                    <Typography fontSize="20px" color="#537178">Tasks Completed</Typography>
                    <Box sx={{
                        display: "flex"
                    }}>
                        <Typography sx={{
                            display: "flex",
                            alignItems: "center",
                            height: "78px",
                            fontSize: "64px",
                            color: "#5285EC"
                        }}>
                            {data["completed"].length}
                        </Typography>
                        <Typography sx={{
                            display: "flex",
                            alignItems: "flex-end",
                            fontSize: "20px",
                            color: "#8F9EA2"
                        }}>
                            /{data["total"]}
                        </Typography>
                    </Box>
                </>
            </StatsCard>

            <StatsCard>
                <>
                    <Typography fontSize="20px" color="#537178">Latest Created Tasks</Typography>
                    <ul style={{
                        padding: "0 0 0 18px",
                        margin: "8px 0"
                    }}>
                        {Object.keys(data["list"]).slice(-3).reverse().map((todo_id) => {
                            return (
                                <li
                                    key={todo_id}
                                    style={{
                                        color: "#8F9EA2",
                                        textDecoration: data["list"][todo_id]["status"] == "completed" ? "line-through" : "unset",
                                        textDecorationThickness: "2px",
                                        textDecorationColor: "#707070",
                                    }}
                                >{data["list"][todo_id]["title"]}</li>
                            )
                        })}
                    </ul>
                </>
            </StatsCard>


            <StatsCard>
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <Stack direction="row" width="103px" textAlign="center" spacing={2}>
                        <Box flexGrow={1}>
                            <PieChart
                                series={[{
                                    data: [
                                        { value: data["completed"].length, label: "Completed", color: "#5285EC" },
                                        { value: data["pending"].length, label: "Pending", color: "#E8ECEC" },
                                    ]
                                }]}
                                legend={{ hidden: true }}
                                {...pieParams}
                            />
                        </Box>
                    </Stack>
                </Box>
            </StatsCard>
        </Box>
    )
}

export default Stats