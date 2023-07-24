import { Box, Button, Modal, Typography } from "@mui/material"
import * as React from "react"
import { modalstyle } from "../../theme"

const EditTaskModal = (props: {
    openEditTaskModel: boolean,
    handleCloseEditTaskModel: () => void,
    editTaskTitleRef: React.MutableRefObject<null>,
    handleEditTaskTitle: () => void,
}) => {
    return (
        <Modal
            open={props.openEditTaskModel}
            onClose={props.handleCloseEditTaskModel}
        >
            <Box sx={modalstyle}>
                <Typography fontSize="20px" color="#537178" marginBottom="24px">
                    Edit Task
                </Typography>
                <input
                    ref={props.editTaskTitleRef}
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
                    onClick={props.handleEditTaskTitle}
                >
                    Edit Task
                </Button>
            </Box>
        </Modal>
    )
}

export default EditTaskModal