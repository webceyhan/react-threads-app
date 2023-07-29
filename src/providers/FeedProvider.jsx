import { createContext, useContext, useEffect, useState } from 'react';
import { createThread, findThreadsByUser } from '../api';
import { useAuth } from './AuthProvider';

const FeedContext = createContext();

export const useFeed = () => useContext(FeedContext);

export const FeedProvider = ({ children }) => {
    const { user } = useAuth();
    const [threads, setThreads] = useState([]);

    const loadThreads = async () => {
        setThreads(await findThreadsByUser(user?.uuid));
    };

    const addThread = async (data) => {
        const newThread = await createThread(data);
        // add new thread to the top of the list
        setThreads([newThread, ...threads]);
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
                addThread,
            }}
        >
            {children}
        </FeedContext.Provider>
    );
};
