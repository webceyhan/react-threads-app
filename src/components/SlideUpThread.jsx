import { useEffect, useState } from 'react';
import { useApi } from '../providers/ApiProvider';
import { ago } from '../utils';
import Avatar from './Avatar';

export default function SlideUpThread({ thread }) {
    const api = useApi();
    const [user, setUser] = useState(null);

    const loadUser = async () => {
        setUser(await api.findUserByUuid(thread.from));
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
