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

const URLS = {
    users: {
        find: (id) => `users/${id}`,
        findByUuid: (uuid) => `users?uuid=${uuid}`,
    },
    threads: {
        find: (id) => `threads/${id}`,
        findByUser: (uuid) => `threads?from=${uuid}${SORT_LATEST}`,
        findByThread: (id) => `threads?replyTo=${id}${SORT_LATEST}`,
        update: (id) => `threads/${id}`,
        create: 'threads',
    },
};

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

// RESOURCES ///////////////////////////////////////////////////////////////////////////////////////

const findUser = async (id) => {
    return await fetchApi(URLS.users.find(id));
};

const findUserByUuid = async (uuid) => {
    return (await fetchApi(URLS.users.findByUuid(uuid)))[0] ?? null;
};

const findThreadsByUser = async (uuid) => {
    return await fetchApi(URLS.threads.findByUser(uuid));
};

const findRepliesByThread = async (id) => {
    return await fetchApi(URLS.threads.findByThread(id));
};

const createThread = async (thread) => {
    return await fetchApi(URLS.threads.create, {
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
    });
};

const updateThread = async (thread) => {
    return await fetchApi(URLS.threads.update(thread.id), {
        method: 'PUT',
        body: JSON.stringify(thread),
    });
};

// PROVIDER ////////////////////////////////////////////////////////////////////////////////////////

const ApiContext = createContext();

export const useApi = () => useContext(ApiContext);

export const ApiProvider = ({ children }) => {
    return (
        <ApiContext.Provider
            value={{
                findUser,
                findUserByUuid,
                findThreadsByUser,
                findRepliesByThread,
                createThread,
                updateThread,
            }}
        >
            {children}
        </ApiContext.Provider>
    );
};