import * as React from "react"

interface AppContextProps {
    loginState: boolean | null;
    setLoginState: React.Dispatch<React.SetStateAction<boolean | null>>;
    handleLogin: () => void
    handleLogout: () => void
    data: Record<string, any> | null,
    setData: React.Dispatch<React.SetStateAction<Record<string, any> | null>>
    addNewTask: (title: string) => void
    editTaskTitle: (task_id: string, new_title: string) => void
    deleteTask: (task_id: string) => void
    updateTaskStatus: (task_id: string, status: string) => void
}

export const useAppContext = () => React.useContext(AppContext);

export const AppContext = React.createContext<AppContextProps>({
    loginState: null,
    setLoginState: () => { },
    handleLogin: () => { },
    handleLogout: () => { },
    data: null,
    setData: () => { },
    addNewTask: () => { },
    editTaskTitle: () => { },
    deleteTask: () => { },
    updateTaskStatus: () => { }
});

const AppContextProvider = (props: { children: React.ReactNode }) => {
    // Hold the shared state here
    const [loginState, setLoginState] = React.useState<null | boolean>(null)
    const [data, setData] = React.useState<Record<string, any> | null>(null)

    const dataInit = () => {
        const todo_data = localStorage.getItem("todo_data")
        if (todo_data) {
            setData(JSON.parse(todo_data))
        } else {
            const new_todo_data = {
                completed: [],
                pending: [],
                total: 0,
                list: {}
            }
            localStorage.setItem("todo_data", JSON.stringify(new_todo_data))
            setData(new_todo_data)
        }
    }

    const handleLogin = () => {
        localStorage.setItem("loginCreds", "true")
        setLoginState(true)
        dataInit()
    }

    const handleLogout = () => {
        localStorage.removeItem("loginCreds")
        window.location.reload()
    }

    const addNewTask = React.useCallback((title: string) => {
        if (data) {
            const largestId = Object.keys(data["list"]).reduce((a, b) => {
                return (Number(a) > Number(b)) ? a : b;
            }, "0");
            const newDataId = Number(largestId) + 1
            data["total"] = data["total"] + 1
            data["list"][String(newDataId)] = {
                title: title,
                status: "pending"
            }
            data["pending"] = [...data["pending"], newDataId]
            localStorage.setItem("todo_data", JSON.stringify(data))
            setData(structuredClone(data))
        }
    }, [data])

    const editTaskTitle = React.useCallback((task_id: string, new_title: string) => {
        if (data) {
            data["list"][task_id]["title"] = new_title
            localStorage.setItem("todo_data", JSON.stringify(data))
            setData(structuredClone(data))
        }
    }, [data])

    const deleteTask = React.useCallback((task_id: string) => {
        if (data) {
            data["total"] = data["total"] - 1
            data[data["list"][task_id]["status"]] = data[data["list"][task_id]["status"]].filter((item: number) => {
                return String(item) != task_id
            })
            delete data["list"][task_id]
            localStorage.setItem("todo_data", JSON.stringify(data))
            setData(structuredClone(data))
        }
    }, [data])

    const updateTaskStatus = React.useCallback((task_id: string, status: string) => {
        if (data) {
            data["list"][task_id]["status"] = status
            if (status == "completed") {
                data["pending"] = data["pending"].filter((item: number) => {
                    return String(item) != task_id
                })
                data["completed"].push(task_id)
            } else if (status == "pending") {
                data["completed"] = data["completed"].filter((item: number) => {
                    return String(item) != task_id
                })
                data["pending"].push(task_id)
            }
            localStorage.setItem("todo_data", JSON.stringify(data))
            setData(structuredClone(data))
        }
    }, [data])

    React.useEffect(() => {
        const login_creds = localStorage.getItem("loginCreds");
        if (login_creds) {
            setLoginState(true)
            dataInit()
        } else {
            setLoginState(false)
        }
    }, [])

    return (
        <AppContext.Provider
            value={{
                loginState,
                setLoginState,
                handleLogin,
                handleLogout,
                data,
                setData,
                addNewTask,
                editTaskTitle,
                deleteTask,
                updateTaskStatus
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;