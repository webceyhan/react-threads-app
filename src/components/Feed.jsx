import Thread from './Thread';

export default function Feed({
    user,
    threads,
    setViewSlideUp,
    setSelectedThread,
}) {
    return (
        <div className="feed">
            {threads.map((thread) => (
                <Thread
                    key={thread.id}
                    user={user}
                    thread={thread}
                    setViewSlideUp={setViewSlideUp}
                    setSelectedThread={setSelectedThread}
                />
            ))}
        </div>
    );
}
