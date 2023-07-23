import * as React from "react"
import { Box, Button, Checkbox, Input, InputAdornment, Modal, Typography } from "@mui/material"
import { ReactComponent as DeleteIcon } from "../../images/svg/delete.svg"
import { ReactComponent as EditIcon } from "../../images/svg/edit.svg"
import { ReactComponent as SearchIcon } from "../../images/svg/search.svg"
import Stats from "./_includes/stats"
import ListTable from "./_includes/table"
import NoTask from "./_includes/no_task"
import { useAppContext } from "../../context/context_provider"
import { modalstyle } from "../../theme"


const TodoRowItem = (props: {
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


const Dashboard = () => {
    const { data, addNewTask, editTaskTitle, deleteTask, updateTaskStatus } = useAppContext()


    const [rows, setRows] = React.useState<React.JSX.Element[] | null>(null)
    const [filteredTaskIds, setFilteredTaskIds] = React.useState<string[] | null>(null)
    const newTaskTitleRef = React.useRef(null)
    const editTaskTitleRef = React.useRef(null)

    const [openNewTaskModel, setOpenNewTaskModel] = React.useState(false);
    const [openEditTaskModel, setOpenEditTaskModel] = React.useState(false);
    const [taskIdToEdit, setTaskIdToEdit] = React.useState<string | null>(null)

    const handleOpenNewTaskModel = () => setOpenNewTaskModel(true);
    const handleCloseNewTaskModel = () => setOpenNewTaskModel(false);
    const handleOpenEditTaskModel = (task_id: string | null) => {
        if (task_id) {
            setTaskIdToEdit(task_id)
            setOpenEditTaskModel(true);
        }
    }
    const handleCloseEditTaskModel = () => setOpenEditTaskModel(false);

    const handleAddNewTask = () => {
        if (newTaskTitleRef.current && newTaskTitleRef.current["value"]) {
            setOpenNewTaskModel(false)
            addNewTask(newTaskTitleRef.current["value"])
        }
    }

    const handleEditTaskTitle = () => {
        if (editTaskTitleRef.current && editTaskTitleRef.current["value"] && taskIdToEdit) {
            editTaskTitle(taskIdToEdit, editTaskTitleRef.current["value"])
        }
    }

    const handleDeleteTask = (task_id: string) => {
        deleteTask(task_id)
    }

    const handleUpdateTaskStatus = (task_id: string, status: string) => {
        updateTaskStatus(task_id, status)
    }

    const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (data && event.target.value) {
            const intFilterBy: string = event.target.value
            const filteredTaskIds = Object.keys(data["list"]).filter(taskId => data["list"][taskId]["title"].includes(intFilterBy))
            setFilteredTaskIds(filteredTaskIds)
        } else {
            setFilteredTaskIds(null)
        }
    }

    React.useEffect(() => {
        if (data && data["total"] > 0) {
            let int_rows: React.JSX.Element[] = []
            const taskIds = filteredTaskIds ? filteredTaskIds : Object.keys(data["list"])
            taskIds.map((todo_id, idx) => {
                int_rows.push(
                    <TodoRowItem data={data} todo_id={todo_id} handleOpenEditTaskModel={handleOpenEditTaskModel} handleDeleteTask={handleDeleteTask} handleUpdateTaskStatus={handleUpdateTaskStatus} key={idx} />
                )
            })
            setRows(int_rows.reverse())
        } else {
            setRows(null)
        }
    }, [data, filteredTaskIds])

    if (data) {
        if (data["total"] > 0) {
            // There are tasks attached to user
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
                                    onChange={handleFilter}
                                />
                            </Box>
                            <Button
                                sx={{
                                    textTransform: "unset",
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
                                ref={newTaskTitleRef}
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
                                onClick={handleAddNewTask}
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
                                ref={editTaskTitleRef}
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
                                onClick={handleEditTaskTitle}
                            >
                                Edit Task
                            </Button>
                        </Box>
                    </Modal>
                </>
            )
        } else {
            // There are no tasks attached to user
            return (
                <NoTask
                    openNewTaskModel={openNewTaskModel}
                    handleCloseNewTaskModel={handleCloseNewTaskModel}
                    handleOpenNewTaskModel={handleOpenNewTaskModel}
                    newTaskTitleRef={newTaskTitleRef}
                    handleAddNewTask={handleAddNewTask}
                />
            )
        }
    } else {
        // Fallback container/skeleton when data is not available yet (loading/fetching etc.)
        return (
            <Box sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%"
            }}>
                <Typography>Loading...</Typography>
            </Box >
        )
    }
}

export default Dashboard