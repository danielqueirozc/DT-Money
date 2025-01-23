import { createContext, useContext, useState, useEffect } from "react";

interface ChildrenProps {
    children: React.ReactNode;
}

interface User {
    id: number;
    username: string;
}

interface AuthProviderProps {
    user: User | null;
    token: string | null;
    login: (newToken: string) => void;
    logout: () => void;
}

const AuthContext = createContext({} as AuthProviderProps)

export function AuthProvider({ children }: ChildrenProps) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken ] = useState<string | null>(() => localStorage.getItem('token'))


    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            const payload = JSON.parse(atob(token.split('.')[1])) // divide the token into 3 parts
            const expirationTime = payload.exp * 1000 // convert to milliseconds
            const currentTime = Date.now() // get current time
            if (expirationTime > currentTime) {
                setUser({id: payload.id, username: payload.username})
            }
        } else {
            setUser(null);
            localStorage.removeItem('token')
        }
    }, [token]);

    function login(newToken: string) {
        localStorage.setItem('token', newToken)
        setToken(newToken)
    }

    function logout() {
        localStorage.removeItem('token')
        setToken(null)
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}