export async function fetchApi(path, options) {
    try {
        const url = 'http://localhost:3001';
        const response = await fetch(`${url}/${path}`, options);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const shortenUrl = (url) => {
    const { hostname, pathname } = new URL(url);
    return hostname.replace('www.', '') + pathname;
};

export const ago = (timestamp) => {
    const formatter = new Intl.RelativeTimeFormat('en', { style: 'short' });

    const elapsed = (Date.now() - new Date(timestamp)) / 1000;

    if (elapsed < 60) {
        return formatter.format(-Math.floor(elapsed), 'seconds');
    }

    if (elapsed < 60 * 60) {
        return formatter.format(-Math.floor(elapsed / 60), 'minutes');
    }

    if (elapsed < 60 * 60 * 24) {
        return formatter.format(-Math.floor(elapsed / (60 * 60)), 'hours');
    }

    return formatter.format(-Math.floor(elapsed / (60 * 60 * 24)), 'days');
};
