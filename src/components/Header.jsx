import { shortenUrl } from '../utils';
import Avatar from './Avatar';

export default function Header({ user, viewThreadsFeed, setViewThreadsFeed }) {
    return (
        <header id="profile">
            <div className="info-container">
                <div>
                    <h1>{user.name}</h1>
                    <p>
                        {user.handle}
                        <span className="threads-badge">threads.net</span>
                    </p>
                </div>
                <Avatar url={user.avatarUrl} />
            </div>

            <p>{user.bio}</p>

            <div className="stats-container">
                <p className="subtext">
                    {user.followers.length} followers •{' '}
                    <a href={user.link} target="__blank">
                        {shortenUrl(user.link)}
                    </a>
                </p>
            </div>

            <button
                className="primary"
                onClick={() => navigator.clipboard.writeText('my profile url')}
            >
                Share Profile
            </button>

            <div className="button-container">
                <button
                    className={viewThreadsFeed ? 'active' : ''}
                    onClick={() => setViewThreadsFeed(true)}
                >
                    Threads
                </button>
                <button
                    className={!viewThreadsFeed ? 'active' : ''}
                    onClick={() => setViewThreadsFeed(false)}
                >
                    Replies
                </button>
            </div>
        </header>
    );
}
