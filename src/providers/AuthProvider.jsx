import { createContext, useContext, useEffect, useState } from 'react';
import { findUser } from '../api';

const loggedUserId = 1;

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const loadUser = async () => {
        setUser(await findUser(loggedUserId));
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
