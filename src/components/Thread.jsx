import { ago, fetchApi } from '../utils';

export default function Thread({ user, thread, setViewSlideUp }) {
    const updateThread = async () => {
        await fetchApi(`threads/${thread.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(thread),
        });
    };

    const checkIfLiked = () => {
        return thread.likes.some(({ uuid }) => uuid === user.uuid);
    };

    const handleToggleLike = async () => {
        if (checkIfLiked()) {
            // unlike
            thread.likes = thread.likes.filter(
                ({ uuid }) => uuid !== user.uuid
            );
        } else {
            // like
            thread.likes.push({ uuid: user.uuid });
        }
        updateThread();
    };

    return (
        <article className="feed-card">
            <div className="text-container">
                <div className="user-info">
                    <div className="img-container">
                        <img src={user.avatarUrl} alt="avatar" />
                    </div>
                    <p>
                        <strong>{user.handle}</strong>
                    </p>
                </div>
                <p className="subtext">{ago(thread.timestamp)}</p>
            </div>

            <p>{thread.text}</p>

            <div className="icons">
                {/* like */}
                <svg
                    onClick={handleToggleLike}
                    clipRule="evenodd"
                    fillRule="evenodd"
                    strokeLinejoin="round"
                    strokeMiterlimit="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="m7.234 3.004c-2.652 0-5.234 1.829-5.234 5.177 0 3.725 4.345 7.727 9.303 12.54.194.189.446.283.697.283s.503-.094.697-.283c4.977-4.831 9.303-8.814 9.303-12.54 0-3.353-2.58-5.168-5.229-5.168-1.836 0-3.646.866-4.771 2.554-1.13-1.696-2.935-2.563-4.766-2.563zm0 1.5c1.99.001 3.202 1.353 4.155 2.7.14.198.368.316.611.317.243 0 .471-.117.612-.314.955-1.339 2.19-2.694 4.159-2.694 1.796 0 3.729 1.148 3.729 3.668 0 2.671-2.881 5.673-8.5 11.127-5.454-5.285-8.5-8.389-8.5-11.127 0-1.125.389-2.069 1.124-2.727.673-.604 1.625-.95 2.61-.95z"
                        fillRule="nonzero"
                    />
                </svg>

                {/* comment */}
                <svg
                    onClick={() => setViewSlideUp(true)}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                >
                    <path d="M12 3c5.514 0 10 3.476 10 7.747 0 4.272-4.48 7.748-9.986 7.748-.62 0-1.092-.046-1.759-.097-1 .776-1.774 1.403-3.485 1.962.26-1.383-.113-2.259-.514-3.259-2.383-1.505-4.256-3.411-4.256-6.354 0-4.271 4.486-7.747 10-7.747zm0-2c-6.627 0-12 4.363-12 9.747 0 3.13 1.816 5.916 4.641 7.699.867 2.167-1.084 4.008-3.143 4.502 3.085.266 6.776-.481 9.374-2.497 7.08.54 13.128-3.988 13.128-9.704 0-5.384-5.373-9.747-12-9.747z" />
                </svg>

                {/* share */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                >
                    <path d="M5 10v7h10.797l1.594 2h-14.391v-9h-3l4-5 4 5h-3zm14 4v-7h-10.797l-1.594-2h14.391v9h3l-4 5-4-5h3z" />
                </svg>

                {/* send */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                >
                    <path d="M24 0l-6 22-8.129-7.239 7.802-8.234-10.458 7.227-7.215-1.754 24-12zm-15 16.668v7.332l3.258-4.431-3.258-2.901z" />
                </svg>
            </div>
            <p className="subtext">
                <span onClick={() => setViewSlideUp(true)}>X replies</span> •{' '}
                <span>{thread.likes.length} likes</span>
            </p>
        </article>
    );
}
