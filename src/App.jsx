import Feed from './components/Feed';
import Header from './components/Header';
import Nav from './components/Nav';
import SlideUp from './components/SlideUp';
import ThreadForm from './components/ThreadForm';

export default function App() {
    return (
        <>
            <Nav />
            <Header />
            <Feed />
            <ThreadForm />
            <SlideUp />
        </>
    );
}
