import { useEffect, useState } from 'react';
import { ago, fetchApi } from '../utils';
import { CommentIcon, LikeIcon, SendIcon, ShareIcon } from '../icons';

export default function Thread({
    user,
    thread,
    setViewSlideUp,
    setSelectedThread,
}) {
    const [wasLiked, setWasLiked] = useState(false);
    const [repliesCount, setRepliesCount] = useState(0);

    useEffect(() => {
        countReplies();
        setWasLiked(checkIfLiked());
    }, [thread]);

    const updateThread = async () => {
        await fetchApi(`threads/${thread.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(thread),
        });
    };

    const countReplies = async () => {
        setRepliesCount(
            (await fetchApi(`threads?replyTo=${thread.id}`)).length
        );
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
