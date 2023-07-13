import { useEffect, useState } from 'react';
import { fetchApi } from './utils';
import Feed from './components/Feed';
import Header from './components/Header';
import Nav from './components/Nav';
import SlideUp from './components/SlideUp';
import WriteIcon from './components/WriteIcon';

const loggedUserId = 1;

export default function App() {
    const [user, setUser] = useState(null);
    const [threads, setThreads] = useState([]);
    const [filteredThreads, setFilteredThreads] = useState([]);
    const [selectedThread, setSelectedThread] = useState(null);
    const [selectedThreadReplies, setSelectedThreadReplies] = useState([]);
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
            setFilteredThreads(threads.filter(({ to }) => to === null)); // my threads
        } else {
            setFilteredThreads(threads.filter(({ to }) => to !== null)); // my replies
        }
    };

    const loadSelectedThreadReplies = async () => {
        setSelectedThreadReplies(
            await fetchApi(`threads?replyTo=${selectedThread?.id}`)
        );
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

    useEffect(() => {
        loadSelectedThreadReplies();
    }, [selectedThread]);

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
                        setSelectedThread={setSelectedThread}
                    />

                    {viewSlideUp && (
                        <SlideUp
                            user={user}
                            threads={selectedThreadReplies}
                            setViewSlideUp={setViewSlideUp}
                        />
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
