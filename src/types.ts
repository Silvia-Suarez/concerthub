export type ConcertStatus = "AVAILABLE" | "SOLD_OUT";
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