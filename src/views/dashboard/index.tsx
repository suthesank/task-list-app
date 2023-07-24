import * as React from "react"
import { Box, Typography } from "@mui/material"
import Stats from "./_includes/stats"
import ListTable, { TodoRowItem } from "./_includes/table"
import NoTask from "./_includes/no_task"
import { useAppContext } from "../../context/context_provider"
import NewTaskModal from "../modals/new_task"
import EditTaskModal from "../modals/edit_task"
import SearchBar from "./_includes/search_bar"

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
                    <SearchBar
                        handleFilter={handleFilter}
                        handleOpenNewTaskModel={handleOpenNewTaskModel}
                    />
                    {rows && <ListTable rows={rows} />}

                    <NewTaskModal
                        openNewTaskModel={openNewTaskModel}
                        handleCloseNewTaskModel={handleCloseNewTaskModel}
                        newTaskTitleRef={newTaskTitleRef}
                        handleAddNewTask={handleAddNewTask}
                    />
                    <EditTaskModal
                        openEditTaskModel={openEditTaskModel}
                        handleCloseEditTaskModel={handleCloseEditTaskModel}
                        editTaskTitleRef={editTaskTitleRef}
                        handleEditTaskTitle={handleEditTaskTitle}
                    />
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