export async function fetchApi(path, options) {
    try {
        const url = 'http://localhost:3001';

        // if no options or no method, then it's a GET request
        if (!options || !options.method) {
            const querySign = !path.includes('?') ? '?' : '&';
            const recentFirts = `${querySign}_sort=id&_order=desc`;

            // append _sort and _order to get the latest first
            const response = await fetch(`${url}/${path}${recentFirts}`);
            return await response.json();
        }

        // other request methods
        const response = await fetch(`${url}/${path}`, options);
        return await response.json();
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
