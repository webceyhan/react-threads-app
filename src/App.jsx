const Nav = () => <nav>Nav</nav>;

const Header = () => <header>Header</header>;

const Thread = () => <article>Thread</article>;

const ThreadForm = () => <form>ThreadForm</form>;

const Feed = () => (
    <main>
        <Thread />
        <Thread />
        <Thread />
    </main>
);

const SlideUp = () => (
    <div>
        <Thread />
        <Thread />
    </div>
);

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
