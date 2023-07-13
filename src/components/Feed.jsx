import Thread from './Thread';

export default function Feed({ user, threads }) {
    return (
        <div className="feed">
            {threads.map((thread) => (
                <Thread key={thread.id} user={user} thread={thread} />
            ))}
        </div>
    );
}
