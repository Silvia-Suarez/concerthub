import type { Concert } from "../../types";
import ConcertCard from "./ConcertCard";

// Tipo de las props: recibe un arreglo de conciertos
type Props = {
  concerts: Concert[];
  onAddToCart: (concert: Concert) => void;
}

// Componente que renderiza la lista (grid) de tarjetas de conciertos.
// Usa .map() para recorrer el arreglo y crear un ConcertCard por cada concierto.
// La prop "key" es necesaria en React para identificar cada elemento de la lista de forma única.
export default function ConcertList({ concerts, onAddToCart }: Props) {
  return (
    <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" aria-label="Concerts list">
      {concerts.map((c) => (
        <ConcertCard key={c.id} concert={c} onAddToCart={onAddToCart} />
      ))}
    </section>
  );
}
