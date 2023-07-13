import { useEffect, useState } from 'react';
import { findUserByUuid } from '../api';
import { ago } from '../utils';
import Avatar from './Avatar';

export default function SlideUpThread({ thread }) {
    const [user, setUser] = useState(null);

    const loadUser = async () => {
        setUser(await findUserByUuid(thread.from));
    };

    useEffect(() => {
        loadUser();
    }, []);

    return (
        <article className="feed-card">
            <div className="text-container">
                <div className="user-info">
                    <Avatar url={user?.avatarUrl} />
                    <p>
                        <strong>{user?.handle}</strong>
                    </p>
                </div>
                <p className="subtext">{ago(thread.timestamp)}</p>
            </div>

            <p>{thread.text}</p>
        </article>
    );
}
