import { useEffect, useState } from 'react';
import { ago, fetchApi } from '../utils';
import Avatar from './Avatar';

export default function SlideUpThread({ thread }) {
    const [user, setUser] = useState(null);

    const loadUser = async () => {
        // this returns an array of users matching the query
        const users = await fetchApi(`users?uuid=${thread.from}`);
        setUser(users[0]); // so we fetch the first user
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
