// Importamos los hooks de React:
// - useState: para manejar el estado local del componente
// - useMemo: para memorizar valores calculados y evitar recalcularlos en cada render
// - useEffect: para ejecutar efectos secundarios (como llamadas a APIs, suscripciones, etc.)
import { useState, useMemo, useEffect } from 'react'
import "./styles/global.css"
import './App.css'
import Navbar from './components/layout/Navbar'
import ConcertList from './components/concerts/ConcertList'
import { concerts } from './data/concert'
import FilterBar from './components/concerts/FilterBar'
import type { CartItem, Concert } from './types'
import CartPanel from './components/cart/CartPanel'
import { ConcertStatusEnum } from './types'
import StateMessage from './components/ui/StateMessage'
import Button from './components/ui/Button'
import { FiAlertOctagon } from 'react-icons/fi'

function App() {
  /* =============================== Estados UX simulados =============================== */
  const [loading, setLoading] = useState(true);
  const [forceError, setForceError] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);
  /* =============================== CLASE FILTROS =============================== */
  // Estado para el texto de búsqueda que escribe el usuario
  const [searchTerm, setSearchTerm] = useState<string>("");
  // Estado para el género musical seleccionado en el filtro ("ALL" = todos los géneros)
  const [selectedGenre, setSelectedGenre] = useState<string>("ALL");
  // Estado para la ciudad seleccionada en el filtro ("ALL" = todas las ciudades)
  const [selectedCity, setSelectedCity] = useState<string>("ALL");
  // Estado booleano para mostrar solo conciertos disponibles (no agotados)
  const [onlyAvailable, setOnlyAvailable] = useState<boolean>(false)

  // useMemo extrae los géneros únicos del arreglo de conciertos y los ordena alfabéticamente.
  // El arreglo vacío [] como dependencia significa que solo se calcula una vez al montar el componente.
  const genres = useMemo(() => {
    return Array.from(new Set(concerts.map((c) => c.genre).sort()))
  }, []);

  // Igual que arriba, pero para las ciudades únicas
  const cities = useMemo(() => {
    return Array.from(new Set(concerts.map((c) => c.city).sort()))
  }, []);

  // useMemo filtra los conciertos cada vez que cambia alguno de los filtros.
  // Se recalcula automáticamente cuando cambian las dependencias del arreglo [searchTerm, selectedCity, ...].
  const filteredConcerts = useMemo(() => {
    // Limpiamos el término de búsqueda: quitamos espacios y lo convertimos a minúsculas
    const term = searchTerm.trim().toLowerCase();
    console.log('the term in input is:', term);

    // Filtramos el arreglo de conciertos aplicando TODOS los filtros a la vez
    const results = concerts.filter((c) => {
      // Verifica si el término coincide con el título, lugar o ciudad
      const matchesSearch = c.title.toLowerCase().includes(term) ||
        c.venue.toLowerCase().includes(term) ||
        c.city.toLowerCase().includes(term);
      // Verifica si la ciudad coincide con la seleccionada (o si es "ALL", pasan todas)
      const matchedCity = selectedCity === 'ALL' || c.city === selectedCity;
      // Verifica si el género coincide con el seleccionado
      const matchedGenre = selectedGenre === 'ALL' || c.genre === selectedGenre;
      // Si onlyAvailable es true, solo pasan los conciertos con estado "AVAILABLE"
      const matchesAvailability = !onlyAvailable || c.status === "AVAILABLE";

      // El concierto solo se incluye si cumple TODOS los filtros
      return matchesSearch && matchedCity && matchedGenre && matchesAvailability
    });
    return results;
    // se ejecuta cada vez que cambia el estado de los filtros
  }, [searchTerm, selectedCity, selectedGenre, onlyAvailable]);

  // Función para reiniciar todos los filtros a sus valores por defecto
  function handleReset() {
    setSearchTerm("");
    setSelectedCity("ALL");
    setSelectedGenre("ALL");
    setOnlyAvailable(false);
  }
  /* =============================== CLASE CARRITO =============================== */

  const [cart, setCart] = useState<CartItem[]>([]);

  function addToCart(concert: Concert) {
    if (concert.status === ConcertStatusEnum.sold_out) return;

    setCart((prev) => {
      // .find() es un metodo que se usa para buscar un elemento en un array
      // y devuelve el primer elemento que cumple la condicion
      // en este caso, se busca el elemento que tiene el mismo id que el concierto que se pasa por parametro
      // si se encuentra, se actualiza el qty
      // si no, se agrega el concierto al carrito
      const existing = prev.find((i) => i.concert.id === concert.id);
      if (existing) {
        return prev.map((i) => i.concert.id === concert.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { concert, qty: 1 }]
    });
  }
  function removeFromCart(concertId: number) {
    // .filter() es un metodo que se usa para filtrar un array
    // y devuelve un nuevo array con los elementos que cumplen la condicion
    // en este caso, se filtra el array para que no incluya el elemento que tiene el mismo id que el concierto que se pasa por parametro
    // esto hace que se elimine el concierto del carrito
    setCart((prev) => prev.filter((i) => i.concert.id !== concertId));
  }

  function updateQty(concertId: number, qty: number) {
    // .isFinite() es un metodo que se usa para verificar si un numero es finito
    // y devuelve true si es finito, false si no es finito
    // en este caso, se verifica si el qty es un numero finito
    // si no es un numero finito, se retorna
    if (!Number.isFinite(qty)) return;
    console.log('the qty is:', qty);
    setCart((prev) => prev.map((i) => (i.concert.id === concertId ?
      // Habia cometido un error aqui, estaba usando i.qty en lugar de qty
      // esto hacia que no se actualizara el qty correctamente
      // ahora se actualiza el qty correctamente
      { ...i, qty: qty } : i))
    )
  }
  function clearCart() {
    setCart([]);
  }
  // ====== Vista principal con estados ======
  const showError = forceError;
  const showEmpty = !loading && !showError && filteredConcerts.length === 0;
  return (
    <div className='min-h-screen bg-page'>

      {/* Barra de navegación superior */}
      <Navbar />
      <main className='mx-auto max-w-6xl px-6 py-6'>
        <div className="flex flex-col gap-2">
          <h1 className="m-0 text-2xl font-semibold">Upcoming Concerts...</h1>

          {/* Solo para demo docente (puedes quitarlo luego) */}
          <div className="mt-2 flex items-center gap-2">
            <Button variant="secondary" onClick={() => setForceError((v) => !v)}>
              <FiAlertOctagon />
              Toggle error (demo)
            </Button>
          </div>
        </div>

        {/* Barra de filtros: recibe los estados y las funciones para actualizarlos (props) */}
        <FilterBar
          searchTerm={searchTerm}
          onSearchTerm={setSearchTerm}
          genres={genres}
          selectedGenre={selectedGenre}
          onSelectedGenre={setSelectedGenre}
          cities={cities}
          selectedCity={selectedCity}
          onSelectedCity={setSelectedCity}
          onlyAvailable={onlyAvailable}
          onSetOnlyAvailable={setOnlyAvailable}
          onReset={handleReset}
        />
        <div className="mt-3 flex justify-end">
          <span className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted shadow-card">
            Results: {filteredConcerts.length}
          </span>
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-[2fr,1fr]">
          <section>
            {loading ? (
              <StateMessage type="loading" title="Loading concerts..." description="Please wait a moment." />
            ) : showError ? (
              <StateMessage
                type="error"
                title="Something went wrong"
                description="This is a simulated error for learning UI states."
                actionText="Try again"
                onAction={() => setForceError(false)}
              />
            ) : showEmpty ? (
              <StateMessage
                type="empty"
                title="No results"
                description="Try changing the filters or resetting them."
                actionText="Reset filters"
                onAction={handleReset}
              />
            ) : (
              <ConcertList concerts={filteredConcerts} onAddToCart={addToCart} />
            )}
          </section>

          <CartPanel items={cart} onRemove={removeFromCart} onQtyChange={updateQty} onClear={clearCart} />
        </div>
      </main>
    </div>
  );
}

export default App
