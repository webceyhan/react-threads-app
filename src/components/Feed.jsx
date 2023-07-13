import Thread from './Thread';

export default function Feed({ user, threads, setViewSlideUp }) {
    return (
        <div className="feed">
            {threads.map((thread) => (
                <Thread
                    key={thread.id}
                    user={user}
                    thread={thread}
                    setViewSlideUp={setViewSlideUp}
                />
            ))}
        </div>
    );
}
