import type { Concert } from "../types";

// Arreglo con los datos de los conciertos disponibles en la aplicación.
// Cada objeto sigue la interfaz Concert definida en types.ts.
export const concerts: Concert[] = [
  {
    id: 1,
    title: "Indie Night Live",
    date: "2026-03-10",
    venue: "Teatro Luna",
    city: "Medellín",
    price: 85000,
    genre: "Indie",
    status: "AVAILABLE",
  },
  {
    id: 2,
    title: "Salsa Classics",
    date: "2026-03-18",
    venue: "Plaza Sonora",
    city: "Cali",
    price: 65000,
    genre: "Salsa",
    status: "AVAILABLE",
  },
  {
    id: 3,
    title: "Rock Fest",
    date: "2026-04-02",
    venue: "Arena Norte",
    city: "Bogotá",
    price: 120000,
    genre: "Rock",
    status: "SOLD_OUT",
  },
  {
    id: 4,
    title: "Electro Session",
    date: "2026-04-09",
    venue: "Club Aurora",
    city: "Cartagena",
    price: 95000,
    genre: "Electronic",
    status: "AVAILABLE",
  },
  {
    id: 5,
    title: "Acoustic Sunset",
    date: "2026-04-15",
    venue: "Parque Central",
    city: "Barranquilla",
    price: 55000,
    genre: "Acoustic",
    status: "SOLD_OUT",
  },
];
