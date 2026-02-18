// Tipo literal que solo permite dos valores posibles para el estado de un concierto
export type ConcertStatus = "AVAILABLE" | "SOLD_OUT";

// Interfaz que define la estructura de un objeto Concierto.
// Cada propiedad representa un dato del concierto que se mostrará en la app.
export interface Concert {
    id: number;
    title: string;
    date: string;
    venue: string;
    city: string;
    price: number;
    genre: string
    status: ConcertStatus;
}
