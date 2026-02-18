import type { Concert } from "../../types";

enum ConcertStatusEnum {
    available = "AVAILABLE",
    sold_out = "SOLD_OUT"
}

type Props = {
    concert: Concert;
}
export default function ConcertCard({ concert }: Props) {
    const isSold: boolean = concert.status === ConcertStatusEnum.sold_out;
    return (
        <article className="concert-card">
            <div>
                <h3 className="concert-card-title"></h3>
                <span className="concert-card-genre"></span>
            </div>
            <div>
                <span>
                    {isSold ? ConcertStatusEnum.sold_out : ConcertStatusEnum.available}
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