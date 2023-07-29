import { useEffect, useState } from 'react';
import { useApi } from '../providers/ApiProvider';
import { ago } from '../utils';
import { CommentIcon, LikeIcon, SendIcon, ShareIcon } from '../icons';
import Avatar from './Avatar';

export default function Thread({
    user,
    thread,
    setViewSlideUp,
    setSelectedThread,
}) {
    const api = useApi();
    const [wasLiked, setWasLiked] = useState(false);
    const [repliesCount, setRepliesCount] = useState(0);

    useEffect(() => {
        countReplies();
        setWasLiked(checkIfLiked());
    }, [thread]);

    const countReplies = async () => {
        setRepliesCount((await api.threads.findByThread(thread.id)).length);
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
        api.threads.update(thread);
        setWasLiked(checkIfLiked());
    };

    const handleReply = () => {
        setSelectedThread(thread);
        setViewSlideUp(true);
    };

    return (
        <article className="feed-card">
            <div className="text-container">
                <div className="user-info">
                    <Avatar url={user.avatarUrl} />
                    <p>
                        <strong>{user.handle}</strong>
                    </p>
                </div>
                <p className="subtext">{ago(thread.timestamp)}</p>
            </div>

            <p>{thread.text}</p>

            <div className="icons">
                <LikeIcon
                    className={wasLiked ? 'liked' : ''}
                    onClick={handleToggleLike}
                />

                <CommentIcon onClick={handleReply} />

                <ShareIcon />

                <SendIcon />
            </div>
            <p className="subtext">
                <span onClick={handleReply}>{repliesCount} replies</span> •{' '}
                <span>{thread.likes.length} likes</span>
            </p>
        </article>
    );
}
