interface HistoricalEntity {
    id: string;
    name: string;
    description: string;
}

interface City extends HistoricalEntity {
    location: Coordinates;
    area: Polygon;
    population: number;
}

interface Empire extends HistoricalEntity {
    period: TimePeriod;
}

interface TradeRoute extends HistoricalEntity {
    origin: Coordinates;
    destination: Coordinates;
    waypoints: Coordinates[];
}

interface Coordinates {
    lat: number;
    lng: number;
}

interface Polygon {
    coordinates: Coordinates[];
}

interface TimePeriod {
    startDate: HistoricalDate;
    endDate: HistoricalDate | "presente" | "desconocido";
}

type HistoricalDate =
    | { type: "fecha"; fecha: Date; approximate: boolean; era: "D.C" | "A.C" }
    | { type: "año"; año: number; approximate: boolean; era: "D.C" | "A.C" }
    | { type: "siglo"; siglo: string; approximate: boolean; era: "D.C" | "A.C" };