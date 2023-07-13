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

export const findUser = async (id) => {
    return await fetchApi(`users/${id}`);
};

export const findUserByUuid = async (uuid) => {
    return (await fetchApi(`users?uuid=${uuid}`))[0] ?? null;
};

export const findThreadsByUser = async (uuid) => {
    return await fetchApi(`threads?from=${uuid}${SORT_LATEST}`);
};

export const findRepliesByThread = async (id) => {
    return await fetchApi(`threads?replyTo=${id}${SORT_LATEST}`);
};

export const createThread = async (thread) => {
    return await fetchApi('threads', {
        method: 'POST',
        body: JSON.stringify({
            // from: current user uuid
            // text: text from input
            to: null,
            replyTo: null,
            timestamp: new Date().toISOString(),
            likes: [],
            ...thread,
        }),
    });
};

export const updateThread = async (thread) => {
    return await fetchApi(`threads/${thread.id}`, {
        method: 'PUT',
        body: JSON.stringify(thread),
    });
};
