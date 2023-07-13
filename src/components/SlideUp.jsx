import Thread from './Thread';
import ThreadForm from './ThreadForm';

export default function SlideUp({ user, setViewSlideUp }) {
    return (
        <div className="slideup">
            <button className="close" onClick={() => setViewSlideUp(false)}>
                X
            </button>
            {/* <Thread /> */}
            {/* <Thread /> */}
            <ThreadForm />
        </div>
    );
}
