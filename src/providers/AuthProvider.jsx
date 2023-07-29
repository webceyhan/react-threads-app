import { createContext, useContext, useEffect, useState } from 'react';
import { useApi } from './ApiProvider';

const loggedUserId = 1;

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const api = useApi();
    const [user, setUser] = useState(null);

    const loadUser = async () => {
        setUser(await api.findUser(loggedUserId));
    };

    useEffect(() => {
        loadUser();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                loadUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
