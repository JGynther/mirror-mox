import { Link } from "react-router-dom";

import { useDatabase, type Card } from "@lib/database";
import { MTGText, MTGOracleText } from "@components/mtg";

const constructImageUri = (baseUri: string, card: Card, size = "normal") =>
    `${baseUri}/${size}/${card.image}/${card.sid}.jpg`;

const constructScryfallUri = (baseUri: string, card: Card) => `${baseUri}/${card.sid}`;

type ID = { id: number };

const CardImage = ({ id }: ID) => {
    const data = useDatabase();
    const card = data.cards[id];
    const uri = constructImageUri(data.scryfall_image_base_uri, card);

    return (
        <div className="Card-Image">
            <Link to={`/cards/${id}`}>
                <img src={uri} loading="eager" />
            </Link>
        </div>
    );
};

const CardText = ({ id }: ID) => {
    const data = useDatabase();
    const card = data.cards[id];
    const scryfallUri = constructScryfallUri(data.scryfall_base_uri, card);

    return (
        <div className="Card-Info">
            <h1>
                {card.name} <MTGText>{card.mana}</MTGText>
            </h1>

            <p>{card.type}</p>

            <hr />

            <MTGOracleText>{card.oracle}</MTGOracleText>

            <hr />

            {card.flavor && (
                <p>
                    <i>{card.flavor}</i>
                </p>
            )}

            <a href={scryfallUri} target="_blank" rel="noreferrer">
                Open in Scryfall ↗
            </a>
        </div>
    );
};

const FORMATS = ["commander", "legacy", "modern", "pauper", "pioneer", "standard", "vintage"];

const Legality = ({ index }: { index: string }) => {
    switch (index) {
        case "0":
            return <div className="not-legal">Not legal</div>;
        case "1":
            return <div className="legal">Legal</div>;
        case "2":
            return <div className="banned">Banned</div>;
        case "3":
            return <div className="restricted">Restricted</div>;
    }
};

const LegalityTable = ({ id }: ID) => {
    const data = useDatabase();
    const card = data.cards[id];
    const formats = card.formats.split("");

    return (
        <div className="card-legality-table">
            {FORMATS.sort().map((format, index) => (
                <div key={index}>
                    <div>{format.charAt(0).toUpperCase() + format.slice(1)}</div>
                    <Legality index={formats[index]} />
                </div>
            ))}
        </div>
    );
};

const CardComponent = ({ id }: ID) => {
    return (
        <div className="Card">
            <CardImage id={id} />
            <CardText id={id} />
            <LegalityTable id={id} />
        </div>
    );
};

export { CardImage, CardText, CardComponent, constructScryfallUri };
export type { Card };
