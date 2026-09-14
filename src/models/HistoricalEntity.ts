export interface HistoricalEntity {
    id: string;
    name: string;
    description: string;
    period: TimePeriod;
}

export interface City extends HistoricalEntity {
    location: Coordinates;
    area: Polygon;
    population?: number;
}

export interface Empire extends HistoricalEntity {
    period: TimePeriod;
}

export interface TradeRoute extends HistoricalEntity {
    origin: Coordinates;
    destination: Coordinates;
    waypoints: Coordinates[];
}

export interface Coordinates {
    lat: number;
    lng: number;
}

export interface Polygon {
    coordinates: Coordinates[];
}

export interface TimePeriod {
    startDate: HistoricalDate;
    endDate: HistoricalDate | "presente" | "desconocido";
}

export type HistoricalDate =
    | { type: "fecha"; fecha: Date; approximate: boolean; era: "D.C" | "A.C" }
    | { type: "año"; año: number; approximate: boolean; era: "D.C" | "A.C" }
    | { type: "siglo"; siglo: string; approximate: boolean; era: "D.C" | "A.C" };

