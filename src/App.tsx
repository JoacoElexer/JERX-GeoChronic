import { cities } from "./data/cities";

function App() {
    return (
        <main>
            <h1>JERX — GeoChronic</h1>

            <h2>Ciudades históricas</h2>

            {cities.map((city) => (
                <article key={city.id}>
                    <h3>{city.name}</h3>
                    <p>{city.description}</p>

                    <p>
                        Ubicación: {city.location.lat}, {city.location.lng}
                    </p>
                </article>
            ))}
        </main>
    );
}

export default App;