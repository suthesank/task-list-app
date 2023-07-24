import * as React from "react"
import { Box, Button, Card, Modal, Typography } from "@mui/material"
import NewTaskModal from "../../modals/new_task"

const NoTask = (props: {
    openNewTaskModel: boolean,
    handleCloseNewTaskModel: () => void,
    handleOpenNewTaskModel: () => void,
    newTaskTitleRef: React.MutableRefObject<null>,
    handleAddNewTask: () => void,
}) => {
    return (
        <>
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
                            textTransform: "unset",
                            height: "40px",
                            borderRadius: "8px",
                            width: "124px",
                            backgroundColor: "#5285EC",
                            marginTop: "20px"
                        }}
                        variant="contained"
                        onClick={props.handleOpenNewTaskModel}
                    >
                        + New Task
                    </Button>
                </Card>
            </Box>
            <NewTaskModal
                openNewTaskModel={props.openNewTaskModel}
                handleCloseNewTaskModel={props.handleCloseNewTaskModel}
                newTaskTitleRef={props.newTaskTitleRef}
                handleAddNewTask={props.handleAddNewTask}
            />
        </>
    )
}

export default NoTask