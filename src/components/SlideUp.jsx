import SlideUpThread from './SlideUpThread';
import ThreadForm from './ThreadForm';

export default function SlideUp({
    user,
    threads,
    setViewSlideUp,
    text,
    setText,
    postThread,
}) {
    return (
        <div className="slideup">
            <button className="close" onClick={() => setViewSlideUp(false)}>
                X
            </button>

            <div className="feed">
                {threads.map((thread) => (
                    <SlideUpThread
                        key={thread.id}
                        user={user}
                        thread={thread}
                    />
                ))}
            </div>

            <ThreadForm
                user={user}
                text={text}
                setText={setText}
                postThread={postThread}
            />
        </div>
    );
}
