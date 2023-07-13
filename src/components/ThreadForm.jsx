export default function ThreadForm({ user, text, setText, postThread }) {
    return (
        <>
            <br />

            <p>
                Post or reply as <strong>@{user.handle}</strong>
            </p>

            <input
                type="text"
                value={text}
                onChange={(event) => setText(event.target.value)}
                placeholder="What's on your mind?"
                autoFocus
            />

            <button className="primary" onClick={postThread}>
                Post
            </button>
        </>
    );
}
