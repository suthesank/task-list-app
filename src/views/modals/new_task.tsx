import { Box, Button, Modal, Typography } from "@mui/material"
import * as React from "react"
import { modalstyle } from "../../theme"

const NewTaskModal = (props: {
    openNewTaskModel: boolean,
    handleCloseNewTaskModel: () => void,
    newTaskTitleRef: React.MutableRefObject<null>,
    handleAddNewTask: () => void,
}) => {
    return (
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
                        textTransform: "unset",
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
    )
}

export default NewTaskModal