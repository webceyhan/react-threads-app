import { createContext, useContext, useState } from 'react';
import { findUser } from '../api';

const loggedUserId = 1;

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const loadUser = async () => {
        setUser(await findUser(loggedUserId));
    };

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
