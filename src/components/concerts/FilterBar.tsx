// Tipo de las props que recibe el componente FilterBar.
// Incluye los valores actuales de cada filtro y las funciones callback para actualizarlos.
// Este patrón se llama "lifting state up": el estado vive en el padre (App) y se pasa al hijo.
type Props = {
    searchTerm: string;
    onSearchTerm: (value: string) => void;
    genres: string[];
    selectedGenre: string;
    onSelectedGenre: (value: string) => void;
    cities: string[];
    selectedCity: string;
    onSelectedCity: (value: string) => void;
    onlyAvailable: boolean;
    onSetOnlyAvailable: (value: boolean) => void;
    onReset: () => void;

}

// Componente de la barra de filtros.
// Contiene: campo de búsqueda, selectores de género y ciudad, checkbox y botón de reset.
export default function FilterBar({
    searchTerm,
    onSearchTerm,
    genres,
    selectedGenre,
    onSelectedGenre,
    cities,
    selectedCity,
    onSelectedCity,
    onlyAvailable,
    onSetOnlyAvailable,
    onReset
}: Props) {

    return (
        <section>
            <div>
                {/* Campo de texto para buscar por título, lugar o ciudad */}
                <label>
                    <span> Search </span>
                    <input
                        type="text"
                        className="filters-input"
                        minLength={3}
                        value={searchTerm}
                        placeholder="Title, venue city"
                        onChange={(e) => {
                            console.log('input Title, venue city', e.target.value);
                            // Llama la función del padre para actualizar el estado de búsqueda
                            onSearchTerm(e.target.value)
                        }}
                    />
                </label>

                {/* Selector desplegable para filtrar por género musical */}
                <label>
                    <span>Genre</span>
                    <select
                        className="filters-select"
                        value={selectedGenre}
                        onChange={(e) => {
                            console.log('input Title, venue city', e.target.value);
                            onSelectedGenre(e.target.value)
                        }}
                    >
                        <option value={"ALL"}>All</option>
                        {/* Genera una opción por cada género único extraído de los datos */}
                        {genres.map((g) => <option key={g} value={g}>{g}</option>)}
                    </select>
                </label>

                {/* Selector desplegable para filtrar por ciudad */}
                <label>
                    <span>City</span>
                    <select
                        className="filters-select"
                        value={selectedCity}
                        onChange={(e) => {
                            console.log('input Title, venue city', e.target.value);
                            onSelectedCity(e.target.value)}}
                    >
                        <option value={"ALL"}>All</option>
                        {cities.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                </label>
            </div>
            <div>
                {/* Checkbox para mostrar solo los conciertos disponibles (no agotados) */}
                <label>
                    <input type="checkbox" checked={onlyAvailable} onChange={(e) => onSetOnlyAvailable(e.target.checked)} />
                    <span>OnlyAvailable</span>
                </label>
                {/* Botón para reiniciar todos los filtros a su valor por defecto */}
                <button className="btn" type="button" onClick={() => {onReset(); console.log("reset")}}>Reset Filters</button>
            </div>
        </section>
    );
}
