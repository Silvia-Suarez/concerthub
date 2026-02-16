import type { Concert } from "../../types";

// type Props = {
//     concert: Concert;
// }
export default function ConcertCard(concert: Concert) {
    const isSold: boolean = concert.status === "SOLD_OUT";
    return (
        <article className="concert-card">
            <div>
                <h3 className="concert-card-title"></h3>
                <span className="concert-card-genre"></span>
            </div>
            <div>
                <span>
                    {isSold ? "SOLD" : "AVAILABLE"}
                </span>
            </div>
            <p>
                Date: {concert.date}
            </p>
            <p>
                ${concert.price}
            </p>
            <p>
                Address: {concert.venue}
            </p>
        </article>
    );
}