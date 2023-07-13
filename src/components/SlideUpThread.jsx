import { ago } from '../utils';

export default function SlideUpThread({ user, thread }) {
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
        </article>
    );
}
