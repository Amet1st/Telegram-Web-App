import {createContext, useState, ReactNode, useContext} from "react";
import {ITelegramUser} from "../models/interfaces";
import {environment} from "../evn";

interface AuthContextType {
    user: ITelegramUser | null;
    login: (user: ITelegramUser) => void;
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    login: () => {
    },
});

export const AuthProvider = ({children}: { children: ReactNode }) => {
    const [user, setUser] = useState<ITelegramUser | null>(null);

    const login = (user: ITelegramUser) => {
        storeUser(user);
        setUser(user);
    };

    const getStoredUser = () => {
        try {
            const user = localStorage.getItem(environment.userStorageKey);
            if (user) {
                return JSON.parse(user) as ITelegramUser;
            } else return null;
        } catch {
        }
    }

    const storeUser = (user: ITelegramUser) => {
        localStorage.setItem(environment.userStorageKey, JSON.stringify(user));
    }

    return (
        <AuthContext.Provider value={{user: getStoredUser() ?? user, login}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);


