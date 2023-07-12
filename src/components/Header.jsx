export default function Header() {
    return (
        <header>
            <div className="info-container">
                <div className="user-info-container">
                    <h1>user name</h1>
                    <p>
                        handle <span className="threads-info">threads.net</span>
                    </p>
                </div>
                <div className="img-container">
                    <img src="" alt="avatar" />
                </div>
            </div>

            <p>bio</p>

            <div className="stats-container">
                <p className="subtext">
                    X followers - <a href="#">link</a>
                </p>
            </div>

            <button
                className="primary"
                onClick={() => navigator.clipboard.writeText('my profile url')}
            >
                Share Profile
            </button>

            <div className="button-container">
                <button className="active">Threads</button>
                <button>Replies</button>
            </div>
        </header>
    );
}
