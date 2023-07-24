import * as React from "react"
import { Box, Card, Checkbox, Divider, Typography } from "@mui/material"
import { ReactComponent as DeleteIcon } from "../../../images/svg/delete.svg"
import { ReactComponent as EditIcon } from "../../../images/svg/edit.svg"

export const TodoRowItem = (props: {
    data: Record<string, any>
    todo_id: string
    handleOpenEditTaskModel: (task_id: string | null) => void
    handleDeleteTask: (task_id: string) => void
    handleUpdateTaskStatus: (task_id: string, status: string) => void
}) => {
    const { data, todo_id } = props
    const handleCheckStatusOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            props.handleUpdateTaskStatus(event.target.id, "completed")
        } else {
            props.handleUpdateTaskStatus(event.target.id, "pending")
        }
    };
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%"
            }}
        >
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center"
            }}>
                <Checkbox
                    id={todo_id}
                    checked={data["list"][todo_id]["status"] == "completed"}
                    inputProps={{ 'aria-label': 'controlled' }}
                    onChange={handleCheckStatusOnChange}
                />

                <Typography
                    fontSize="20px"
                    color={data["list"][todo_id]["status"] == "completed" ? "#537178" : "#5285EC"}
                    sx={{
                        textDecoration: data["list"][todo_id]["status"] == "completed" ? "line-through" : "unset",
                        textDecorationThickness: "2px",
                        textDecorationColor: "#707070"
                    }}
                >{data["list"][todo_id]["title"]}</Typography>
            </Box>
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center"
            }}>
                <Box width="16px" height="18px">
                    <EditIcon onClick={() => props.handleOpenEditTaskModel(todo_id)} />
                </Box>
                <Box ml="16px" width="16px" height="18px">
                    <DeleteIcon onClick={() => props.handleDeleteTask(todo_id)} />
                </Box>
            </Box>
        </Box>
    )
}

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