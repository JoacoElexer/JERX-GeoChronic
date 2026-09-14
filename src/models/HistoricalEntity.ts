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
    timePeriod: TimePeriod;
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
    startDate: Date;
    endDate?: Date;
}