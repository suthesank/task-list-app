import * as React from "react"

interface AppContextProps {
    loginState: boolean | null;
    setLoginState: React.Dispatch<React.SetStateAction<boolean | null>>;
}

export const useAppContext = () => React.useContext(AppContext);

export const AppContext = React.createContext<AppContextProps>({
    loginState: null,
    setLoginState: () => { }
});

const AppContextProvider = (props: { children: React.ReactNode }) => {
    // Hold the shared state here
    const [loginState, setLoginState] = React.useState<null | boolean>(null)

    return (
        <AppContext.Provider
            value={{
                loginState,
                setLoginState,
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;