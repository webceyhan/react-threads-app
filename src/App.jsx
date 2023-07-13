import { useEffect, useState } from 'react';
import Feed from './components/Feed';
import Header from './components/Header';
import Nav from './components/Nav';
import SlideUp from './components/SlideUp';
import WriteIcon from './components/WriteIcon';

const loggedUserId = 1;

async function fetchApi(path, options) {
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

export default function App() {
    const [user, setUser] = useState(null);
    const [threads, setThreads] = useState([]);
    const [filteredThreads, setFilteredThreads] = useState([]);
    const [viewThreadsFeed, setViewThreadsFeed] = useState(true);
    const [viewSlideUp, setViewSlideUp] = useState(false);

    const loadUser = async () => {
        setUser(await fetchApi(`users/${loggedUserId}`));
    };

    const loadThreads = async () => {
        setThreads(await fetchApi(`threads?from=${user?.uuid}`));
    };

    const loadFilteredThreads = () => {
        if (viewThreadsFeed) {
            setFilteredThreads(threads.filter(({ to }) => to === null)); // Threads
        } else {
            setFilteredThreads(threads.filter(({ to }) => to !== null)); // Replies
        }
    };

    useEffect(() => {
        loadUser();
    }, []);

    useEffect(() => {
        loadThreads();
    }, [user]);

    useEffect(() => {
        loadFilteredThreads();
    }, [threads, viewThreadsFeed]);

    return (
        <>
            {user && (
                <div>
                    <Nav url={user.instagramUrl} />

                    <Header
                        user={user}
                        viewThreadsFeed={viewThreadsFeed}
                        setViewThreadsFeed={setViewThreadsFeed}
                    />
                    <Feed
                        user={user}
                        threads={filteredThreads}
                        setViewSlideUp={setViewSlideUp}
                    />

                    {viewSlideUp && (
                        <SlideUp user={user} setViewSlideUp={setViewSlideUp} />
                    )}

                    <button
                        className="slideup-toggle"
                        onClick={() => setViewSlideUp(true)}
                    >
                        <WriteIcon />
                    </button>
                </div>
            )}
        </>
    );
}
