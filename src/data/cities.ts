import type { City } from "../models/HistoricalEntity";

export const cities: City[] = [
    {
        id: "rome",
        name: "Roma",
        description: "Ciudad de la península itálica que se convirtió en el centro de la República y posteriormente del Imperio Romano.",
        period: {
            startDate: {
                type: "año",
                año: 753,
                approximate: true,
                era: "A.C"
            },
            endDate: {
                type: "año",
                año: 476,
                approximate: true,
                era: "D.C"
            }
        },
        location: {
            lat: 41.9028,
            lng: 12.4964
        },
        area: {
            coordinates: []
        }
    },
    {
        id: "athens",
        name: "Atenas",
        description: "Ciudad de la región de Ática y uno de los principales centros políticos, culturales y filosóficos de la antigua Grecia.",
        period: {
            startDate: {
                type: "año",
                año: 508,
                approximate: true,
                era: "A.C"
            },
            endDate: {
                type: "año",
                año: 146,
                approximate: true,
                era: "A.C"
            }
        },
        location: {
            lat: 37.9838,
            lng: 23.7275
        },
        area: {
            coordinates: []
        }
    }
];

