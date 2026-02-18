import type { Concert } from "../../types";

// Enum que mapea los estados del concierto a sus valores de texto.
// Usar un enum hace el código más legible y evita errores al escribir los strings manualmente.
enum ConcertStatusEnum {
    available = "AVAILABLE",
    sold_out = "SOLD_OUT"
}

// Definimos el tipo de las props que recibe este componente.
// Solo necesita un objeto de tipo Concert.
type Props = {
    concert: Concert;
}

// Componente que muestra la tarjeta individual de un concierto.
// Recibe un objeto "concert" por destructuración de props.
export default function ConcertCard({ concert }: Props) {
    // Variable booleana que indica si el concierto está agotado
    const isSold: boolean = concert.status === ConcertStatusEnum.sold_out;

    return (
        <article className="concert-card">
            <div>
                {/* Título del concierto */}
                <h3 className="concert-card-title">
                    {concert.title}
                </h3>
                {/* Género musical */}
                <span className="concert-card-genre">
                    {concert.genre}
                </span>
            </div>
            <div>
                {/* Muestra el estado: "SOLD_OUT" si está agotado, "AVAILABLE" si hay entradas */}
                <span>
                    {isSold ? ConcertStatusEnum.sold_out : ConcertStatusEnum.available}
                </span>
            </div>
            {/* Información adicional: fecha, precio y ubicación */}
            <p>
                Date: {concert.date}
            </p>
            <p>
                ${concert.price}
            </p>
            <p>
                Address: {concert.venue} - City: {concert.city}
            </p>
        </article>
    );
}