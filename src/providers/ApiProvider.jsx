import { createContext, useContext } from 'react';
import { timestamp } from '../utils';

// base url for all requests
const BASE_URL = 'http://localhost:3001';

// default headers for all requests
const BASE_OPTIONS = {
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
};

// query to sort by latest
const SORT_LATEST = '&_sort=id&_order=desc';

const fetchApi = async (path, options) => {
    try {
        const response = await fetch(`${BASE_URL}/${path}`, {
            ...BASE_OPTIONS,
            ...options,
        });
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

// RESOURCE ACTIONS ////////////////////////////////////////////////////////////////////////////////

const ACTIONS = {
    users: {
        find: (id) => fetchApi(`users/${id}`),
        findByUuid: async (uuid) =>
            (await fetchApi(`users?uuid=${uuid}`))[0] ?? null,
    },

    threads: {
        find: (id) => fetchApi(`threads/${id}`),
        findByUser: (uuid) => fetchApi(`threads?from=${uuid}${SORT_LATEST}`),
        findByThread: (id) => fetchApi(`threads?replyTo=${id}${SORT_LATEST}`),
        update: (thread) =>
            fetchApi(`threads/${thread.id}`, {
                method: 'PUT',
                body: JSON.stringify(thread),
            }),
        create: (thread) =>
            fetchApi('threads', {
                method: 'POST',
                body: JSON.stringify({
                    // from: current user uuid
                    // text: text from input
                    to: null,
                    replyTo: null,
                    timestamp: timestamp(),
                    likes: [],
                    ...thread,
                }),
            }),
    },
};

// PROVIDER ////////////////////////////////////////////////////////////////////////////////////////

const ApiContext = createContext();

export const useApi = () => useContext(ApiContext);

export const ApiProvider = ({ children }) => {
    return (
        <ApiContext.Provider value={{ ...ACTIONS }}>
            {children}
        </ApiContext.Provider>
    );
};
