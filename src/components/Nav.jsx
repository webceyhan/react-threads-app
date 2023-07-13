import { GlobeIcon, InstagramIcon } from '../icons';

export default function Nav({ url }) {
    return (
        <nav>
            <GlobeIcon />

            <a href={url} target="_blank" rel="noreferrer">
                <InstagramIcon />
            </a>
        </nav>
    );
}
