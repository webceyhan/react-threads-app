import { createContext, useContext, useEffect, useState } from 'react';
import { findThreadsByUser } from '../api';
import { useAuth } from './AuthProvider';

const FeedContext = createContext();

export const useFeed = () => useContext(FeedContext);

export const FeedProvider = ({ children }) => {
    const { user } = useAuth();
    const [threads, setThreads] = useState([]);

    const loadThreads = async () => {
        setThreads(await findThreadsByUser(user?.uuid));
    };

    useEffect(() => {
        loadThreads();
    }, [user]);

    return (
        <FeedContext.Provider
            value={{
                threads,
                setThreads,
                loadThreads,
            }}
        >
            {children}
        </FeedContext.Provider>
    );
};
