import * as React from "react"
import { Box, Button, Card, Modal, Typography } from "@mui/material"
import { modalstyle } from "../../../theme"

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
            <Modal
                open={props.openNewTaskModel}
                onClose={props.handleCloseNewTaskModel}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalstyle}>
                    <Typography fontSize="20px" color="#537178" marginBottom="24px">
                        + New Task
                    </Typography>
                    <input
                        ref={props.newTaskTitleRef}
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
                        placeholder="Task Name"
                    />
                    <Button
                        sx={{
                            height: "40px",
                            borderRadius: "8px",
                            width: "100%",
                            backgroundColor: "#5285EC",
                            marginTop: "12px"
                        }}
                        variant="contained"
                        onClick={props.handleAddNewTask}
                    >
                        + New Task
                    </Button>

                </Box>
            </Modal>
        </>
    )
}

export default NoTask