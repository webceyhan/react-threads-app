const shortenUrl = (url) => {
    const { hostname, pathname } = new URL(url);
    return hostname.replace('www.', '') + pathname;
};

export default function Header({ user, viewThreadsFeed, setViewThreadsFeed }) {
    return (
        <header>
            <div className="info-container">
                <div className="user-info-container">
                    <h1>{user.name}</h1>
                    <p>
                        {user.handle}
                        <span className="threads-info">threads.net</span>
                    </p>
                </div>
                <div className="img-container">
                    <img src={user.avatarUrl} alt="avatar" />
                </div>
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
