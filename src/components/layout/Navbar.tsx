import { FiMusic } from "react-icons/fi";
// Componente de la barra de navegación superior.
// Muestra el nombre de la app y los enlaces de navegación.
// e.preventDefault() evita que la página se recargue al hacer clic en los enlaces.
export default function Navbar() {
  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2 text-text">
          <FiMusic className="text-brand-700" />
          <h2 className="text-lg font-semibold">ConcertHub</h2>
        </div>

        <nav className="flex items-center gap-4 text-sm text-muted" aria-label="Primary navigation">
          <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-text">
            Home
          </a>
          <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-text">
            Concerts
          </a>
          <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-text">
            Others
          </a>
        </nav>
      </div>
    </header>
  );
}