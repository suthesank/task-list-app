import * as React from "react"
import { Box, Button, Checkbox, Input, InputAdornment, Modal, Typography } from "@mui/material"
import { ReactComponent as DeleteIcon } from "../../images/svg/delete.svg"
import { ReactComponent as EditIcon } from "../../images/svg/edit.svg"
import { ReactComponent as SearchIcon } from "../../images/svg/search.svg"
import Stats from "./_includes/stats"
import ListTable from "./_includes/table"
import NoTask from "./_includes/no_task"


const TodoRowItem = (props: {
    data: Record<string, any>
    todo_id: string
    handleOpenEditTaskModel: () => void
}) => {
    const { data, todo_id } = props
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
                    checked={data["list"][todo_id]["status"] == "completed"}
                    inputProps={{ 'aria-label': 'controlled' }} />

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
                    <EditIcon onClick={props.handleOpenEditTaskModel} />
                </Box>
                <Box ml="16px" width="16px" height="18px">
                    <DeleteIcon />
                </Box>
            </Box>
        </Box>
    )
}


const Dashboard = () => {

    const [rows, setRows] = React.useState<React.JSX.Element[] | null>(null)
    const [data, setData] = React.useState<Record<string, any> | null>(null)
    const [openNewTaskModel, setOpenNewTaskModel] = React.useState(false);
    const [openEditTaskModel, setOpenEditTaskModel] = React.useState(false);
    const handleOpenNewTaskModel = () => setOpenNewTaskModel(true);
    const handleCloseNewTaskModel = () => setOpenNewTaskModel(false);
    const handleOpenEditTaskModel = () => setOpenEditTaskModel(true);
    const handleCloseEditTaskModel = () => setOpenEditTaskModel(false);

    const modalstyle = {
        position: 'absolute' as 'absolute',
        top: {
            xs: "26%",
            md: "50%"
        },
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "296px",
        backgroundColor: "#FFFFFF",
        boxShadow: "0px 3px 6px #00000029",
        padding: "24px 24px 29px 24px",
        borderRadius: "12px"
    }

    React.useEffect(() => {
        const todo_data = localStorage.getItem("todo_data")
        if (todo_data) {
            setData(JSON.parse(todo_data))
        }
    }, [])

    React.useEffect(() => {
        if (data && data["total"] > 0) {
            console.log(data)
            let int_rows: React.JSX.Element[] = []
            Object.keys(data["list"]).map((todo_id, idx) => {
                int_rows.push(
                    <TodoRowItem data={data} todo_id={todo_id} handleOpenEditTaskModel={handleOpenEditTaskModel} key={idx} />
                )
            })
            setRows(int_rows.reverse())
        } else {
            setRows(null)
        }

    }, [data])

    if (data && data["total"] > 0) {
        return (
            <>
                <Stats data={data} />
                <Box sx={{
                    display: "flex",
                    flexDirection: {
                        xs: "column",
                        md: "row"
                    },
                    alignItems: "center",
                    justifyContent: "space-between",
                    margin: {
                        xs: "29px 0 16px",
                        md: "34px 0 10px"
                    }
                }}>
                    <Box>
                        <Typography fontSize="20px" color="#537178">
                            Tasks
                        </Typography>
                    </Box>
                    <Box sx={{
                        display: "flex",
                        flexDirection: {
                            xs: "column",
                            md: "row"
                        },
                        padding: {
                            xs: "0 13px 0 15px",
                            md: "unset"
                        },
                        width: {
                            xs: "100%",
                            md: "unset"
                        },
                        maxWidth: "450px"
                    }}>
                        <Box sx={{
                            width: {
                                xs: "100%",
                                md: "244px"
                            }
                        }}>
                            <Input
                                style={{
                                    border: "none",
                                    outline: "none",
                                    background: "#D9DFEB",
                                    borderRadius: "8px",
                                    height: "40px",
                                    width: "100%",
                                    fontSize: "14px",
                                    paddingLeft: "15px"
                                }}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <SearchIcon style={{
                                            marginRight: "9px"
                                        }} />
                                    </InputAdornment>
                                }
                                disableUnderline={true}
                                placeholder="Search by task name"
                            />
                        </Box>
                        <Button
                            sx={{
                                height: "40px",
                                borderRadius: "8px",
                                width: {
                                    md: "124px"
                                },
                                marginLeft: {
                                    md: "12px"
                                },
                                marginTop: {
                                    xs: "8px",
                                    md: "unset"
                                },
                                backgroundColor: "#5285EC"
                            }}
                            variant="contained"
                            onClick={handleOpenNewTaskModel}
                        >
                            + New Task
                        </Button>
                    </Box>
                </Box>
                {rows && <ListTable rows={rows} />}
                <Modal
                    open={openNewTaskModel}
                    onClose={handleCloseNewTaskModel}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={modalstyle}>
                        <Typography fontSize="20px" color="#537178" marginBottom="24px">
                            + New Task
                        </Typography>
                        <input
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
                        >
                            + New Task
                        </Button>

                    </Box>
                </Modal>
                <Modal
                    open={openEditTaskModel}
                    onClose={handleCloseEditTaskModel}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={modalstyle}>
                        <Typography fontSize="20px" color="#537178" marginBottom="24px">
                            Edit Task
                        </Typography>
                        <input
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
                        >
                            Edit Task
                        </Button>

                    </Box>
                </Modal>
            </>
        )
    } else {
        return (
            <NoTask />
        )
    }
}

export default Dashboard