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

function App() {
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

  // useEffect se ejecuta después del primer render.
  // Aquí se podría usar para cargar datos de una API, por ejemplo.
  useEffect(()=>{
    
  },[])

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

  return (
    <>
      {/* Barra de navegación superior */}
      <Navbar></Navbar>

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

      <main>
        <h1>Upcoming ...</h1>
        {/* Renderizado condicional: si no hay resultados muestra un mensaje, si hay muestra la lista */}
        {filteredConcerts.length === 0 ?
          <section>
            <h2> There is no results</h2>
            <p> Try changing the filters or resetting them</p>
          </section> :
          <ConcertList concerts={filteredConcerts} />
        }
      </main>
    </>
  )
}

export default App
