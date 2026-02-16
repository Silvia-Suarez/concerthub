import type { Concert } from "../../types";
import ConcertCard from "./ConcertCard";

type Props = {
    concerts: Concert[];
}

export default function ConcertList({ concerts }: Props) {
    return (
        <section className="grid">
            {concerts.map((c) => (
                <ConcertCard key={c.id} {...c}></ConcertCard>
            ))}
        </section>
    );
}
