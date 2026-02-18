// Componente de la barra de navegación superior.
// Muestra el nombre de la app y los enlaces de navegación.
// e.preventDefault() evita que la página se recargue al hacer clic en los enlaces.
export default function Navbar() {

    return (
        <header className="navbar">
            <h2 className="navbar-title">Concert Hub </h2>
            <nav className="navbar-links">
                <a href="#" onClick={(e) => e.preventDefault()}>Home</a>
                <a href="#" onClick={(e) => e.preventDefault()}>Concerts</a>
                <a href="#" onClick={(e) => e.preventDefault()}>Others</a>
                <a href="#" onClick={(e) => e.preventDefault()}>Cart</a>
            </nav>
        </header>
    );
}
