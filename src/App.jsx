import { useEffect, useState } from 'react';
import Feed from './components/Feed';
import Header from './components/Header';
import Nav from './components/Nav';
import SlideUp from './components/SlideUp';

const loggedUserId = 1;

async function fetchApi(path, options) {
    try {
        const url = 'http://localhost:3001';
        const response = await fetch(`${url}/${path}`, options);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export default function App() {
    const [user, setUser] = useState(null);

    const loadUser = async () => {
        setUser(await fetchApi(`users/${loggedUserId}`));
    };

    useEffect(() => {
        loadUser();
    }, []);

    return (
        <>
            {user && (
                <div>
                    <Nav url={user.instagramUrl} />
                    <Header user={user} />
                    <Feed />
                    {/* <SlideUp /> */}
                </div>
            )}
        </>
    );
}
