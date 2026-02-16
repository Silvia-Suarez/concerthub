export default function Navbar() {
    // const palabra: string | number = '';
    // typeof palabra === 'string' ? '' : '';

    return (
        <header className="navbar">
            <h2 className="navbar-title">Concert Hub </h2>
            <nav className="navbar-links">
                <a href="#" onClick={(e) => e.preventDefault()}>Home</a>
                <a href="#" onClick={(e) => e.preventDefault()}>Concerts</a>
                <a href="#" onClick={(e) => e.preventDefault()}>Others</a>
                <a href="#" onClick={(e) => e.preventDefault()}>Cart</a>
                {/* {title === 'tienda' ? <>
                    <a href="#cart"> Cart</a>
                </> : null} */}
            </nav>
        </header>
    );
}
