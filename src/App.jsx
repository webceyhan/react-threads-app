import { useEffect, useState } from 'react';
import { createThread, findThreadsByUser, findRepliesByThread } from './api';
import { useAuth } from './providers/AuthProvider';
import { WriteIcon } from './icons';
import Feed from './components/Feed';
import Header from './components/Header';
import Nav from './components/Nav';
import SlideUp from './components/SlideUp';

export default function App() {
    const { user, loadUser } = useAuth();

    const [threads, setThreads] = useState([]);
    const [filteredThreads, setFilteredThreads] = useState([]);
    const [selectedThread, setSelectedThread] = useState(null);
    const [selectedThreadReplies, setSelectedThreadReplies] = useState([]);
    const [viewThreadsFeed, setViewThreadsFeed] = useState(true);
    const [viewSlideUp, setViewSlideUp] = useState(false);
    const [text, setText] = useState('');

    const loadThreads = async () => {
        setThreads(await findThreadsByUser(user?.uuid));
    };

    const loadFilteredThreads = () => {
        if (viewThreadsFeed) {
            setFilteredThreads(threads.filter(({ to }) => to === null)); // my threads
        } else {
            setFilteredThreads(threads.filter(({ to }) => to !== null)); // my replies
        }
    };

    const loadSelectedThreadReplies = async () => {
        setSelectedThreadReplies(await findRepliesByThread(selectedThread?.id));
    };

    const postThread = async () => {
        const thread = await createThread({
            from: user.uuid,
            to: selectedThread?.from ?? null,
            replyTo: selectedThread.id ?? null,
            text,
        });

        // add new standalone thread to the top of the list
        setThreads([thread, ...threads]);

        // reload threads if replying to a thread
        selectedThread && loadThreads();

        setText(''); // reset text input
        setViewSlideUp(false); // close slideup
    };

    const handleSlideUpToggle = () => {
        setSelectedThread(null);
        setViewSlideUp(!viewSlideUp);
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
                            text={text}
                            setText={setText}
                            postThread={postThread}
                        />
                    )}

                    <button
                        className="slideup-toggle"
                        onClick={handleSlideUpToggle}
                    >
                        <WriteIcon />
                    </button>
                </div>
            )}
        </>
    );
}
