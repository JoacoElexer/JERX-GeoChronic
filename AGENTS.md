# AGENTS.md — JERX GeoChronic

## 1. Propósito del proyecto

**JERX — GeoChronic** es un atlas histórico-geográfico interactivo.

El objetivo es combinar el aprendizaje de Historia y Geografía con el desarrollo de software mediante una aplicación que permita explorar:

- ciudades históricas;
- civilizaciones;
- imperios;
- batallas y otros acontecimientos;
- personas históricas;
- rutas comerciales;
- periodos históricos;
- información geográfica.

La aplicación deberá permitir relacionar **cuándo** ocurrió algo con **dónde** ocurrió y visualizarlo posteriormente mediante un mapa interactivo/3D.

JERX también funciona como proyecto de aprendizaje para practicar:

- TypeScript;
- React;
- POO;
- interfaces y tipos;
- arquitectura;
- Git/GitHub;
- Mapbox GL JS;
- procesamiento y transformación de datasets.

---

## 2. Principio principal de desarrollo

### No sobre-diseñar.

JERX es un proyecto de aprendizaje y exploración. No se deben introducir abstracciones, patrones, capas, servicios, clases o sistemas complejos simplemente porque podrían ser útiles en el futuro.

Regla:

> Si el diseño actual resuelve correctamente el problema que tenemos ahora, se mantiene y se continúa desarrollando.

Los modelos pueden modificarse posteriormente cuando aparezca una necesidad real.

No convertir decisiones sencillas en discusiones de arquitectura indefinidas.

---

## 3. Stack actual

- React
- TypeScript
- Vite
- Mapbox GL JS
- Git
- GitHub

### Estado actual

El proyecto se encuentra en una etapa temprana de modelado y preparación de datos.

El flujo inmediato es:

```text
Datos históricos
      ↓
Transformación / adaptación
      ↓
Modelos de JERX
      ↓
React
      ↓
Mapbox
```

No se requiere backend ni base de datos para el MVP inicial.

---

## 4. Arquitectura inicial

La estructura propuesta es:

```text
src/
├── models/
│   ├── HistoricalEntity.ts
│   ├── Coordinates.ts
│   ├── Polygon.ts
│   └── TimePeriod.ts
│
├── data/
│   ├── cities.ts
│   ├── empires.ts
│   └── tradeRoutes.ts
│
├── components/
├── map/
├── services/
├── App.tsx
└── main.tsx
```

Esta estructura es orientativa.

**No crear carpetas o capas que todavía no sean necesarias.**

Por ejemplo, no crear un sistema completo de `services`, `repositories`, `adapters`, etc. hasta que exista código que justifique esa separación.

---

## 5. Modelo histórico actual

El modelo base actual es:

```ts
interface HistoricalEntity {
    id: string;
    name: string;
    description: string;
    period: TimePeriod;
}
```

Las entidades especializadas pueden extenderlo:

```ts
interface City extends HistoricalEntity {
    location: Coordinates;
    area: Polygon;
    population?: number;
}

interface Empire extends HistoricalEntity {
}

interface TradeRoute extends HistoricalEntity {
    origin: Coordinates;
    destination: Coordinates;
    waypoints: Coordinates[];
}
```

### Geografía

```ts
interface Coordinates {
    lat: number;
    lng: number;
}

interface Polygon {
    coordinates: Coordinates[];
}
```

### Periodos

```ts
interface TimePeriod {
    startDate: HistoricalDate;
    endDate?: HistoricalDate;
}
```

### Fechas históricas

Actualmente se utiliza un discriminated union:

```ts
type HistoricalDate =
    | {
        type: "date";
        date: Date;
        approximate: boolean;
        era: "D.C" | "A.C";
    }
    | {
        type: "year";
        year: number;
        approximate: boolean;
        era: "D.C" | "A.C";
    }
    | {
        type: "century";
        century: string;
        approximate: boolean;
        era: "D.C" | "A.C";
    };
```

### Importante

Este modelo está **congelado por ahora**.

No rediseñar `HistoricalDate`, `TimePeriod` o las entidades únicamente por posibles problemas futuros. Si durante la implementación aparece un caso real que el modelo no puede representar correctamente, entonces se evalúa el cambio.

---

## 6. Relaciones entre interfaces

Usar `extends` únicamente cuando la relación conceptual sea correcta.

Ejemplo:

```ts
interface City extends HistoricalEntity
```

es correcto porque una ciudad histórica es una entidad histórica.

En cambio:

```ts
interface City extends Coordinates
```

es incorrecto porque una ciudad **no es** unas coordenadas. Una ciudad **tiene** una ubicación:

```ts
location: Coordinates;
```

Preferir composición cuando una entidad contiene otra información.

---

## 7. Datos históricos

Los datos históricos **no deben inventarse** para llenar el proyecto.

El usuario está utilizando JERX también para aprender Historia, por lo que el agente puede encargarse de investigar y preparar los datos históricos.

La primera fuente de datos considerada para el proyecto es **Pleiades**, un gazetteer histórico/geográfico del mundo antiguo.

Objetivo:

```text
Dataset externo
      ↓
Lectura
      ↓
Transformación
      ↓
Modelo JERX
```

### Regla importante

El formato del dataset externo **no debe convertirse automáticamente en el modelo interno de JERX**.

Los datos externos pueden tener campos y convenciones diferentes. Debe existir una transformación cuando sea necesaria.

Esto permite que posteriormente JERX pueda incorporar otras fuentes sin acoplar su modelo interno al formato de una sola fuente.

---

## 8. Calidad y procedencia de datos

Cuando se agreguen datos históricos:

- no inventar fechas;
- no inventar coordenadas;
- no inventar población;
- indicar incertidumbre cuando la fuente la indique;
- conservar identificadores de la fuente cuando sean útiles;
- respetar las licencias de los datasets;
- documentar la fuente cuando sea relevante.

La precisión histórica importa especialmente para datos temporales y geográficos.

---

## 9. Código de datos vs código de aplicación

El usuario ha establecido una separación clara:

### El agente puede encargarse de:

- investigar información histórica;
- preparar datasets;
- escribir archivos de datos;
- transformar datos históricos;
- explicar la procedencia de los datos.

### El usuario debe participar especialmente en:

- arquitectura;
- lógica de aplicación;
- TypeScript;
- React;
- componentes;
- integración de Mapbox;
- decisiones de implementación;
- resolución de errores.

La intención es que el proyecto sea colaborativo y educativo, no un proyecto generado completamente por el agente.

---

## 10. Estilo de colaboración

El usuario prefiere aprender mediante implementación y revisión.

Cuando se trabaje con código:

1. explicar primero el problema;
2. explicar por qué ocurre;
3. orientar hacia la solución;
4. permitir que el usuario implemente cuando sea una buena oportunidad de aprendizaje;
5. revisar el código del usuario;
6. proporcionar código completo cuando el usuario lo solicite explícitamente o cuando el código corresponda a datos históricos que el usuario no puede conocer.

No entregar grandes cantidades de código innecesariamente.

---

## 11. Cuestionar decisiones

No asumir que la propuesta del usuario es correcta solo por ser su propuesta.

Si existe un problema real:

- señalarlo directamente;
- explicar la razón;
- proponer una alternativa;
- dejar que el usuario tome la decisión cuando corresponda.

Sin embargo, no convertir cada posibilidad teórica en un problema.

La prioridad es:

```text
Problema real
    ↓
Solución suficiente
    ↓
Continuar
```

No:

```text
Posible problema futuro
    ↓
Nueva abstracción
    ↓
Otra abstracción
    ↓
Arquitectura innecesariamente compleja
```

---

## 12. Mapbox y geometría

JERX eventualmente utilizará Mapbox para visualizar información geográfica.

Representaciones previstas:

- `Coordinates` → puntos;
- `Polygon` → áreas;
- rutas → líneas/recorridos;
- entidades históricas → capas y elementos visuales.

No diseñar toda la arquitectura de Mapbox antes de tener una primera visualización funcionando.

Primero conseguir:

```text
Datos → mapa → entidad visible
```

y después añadir interacción, filtros, timeline, capas y visualización 3D.

---

## 13. Desarrollo por sprints

El proyecto se desarrolla mediante sprints pequeños.

Cada sprint debe tener:

- objetivo;
- tareas concretas;
- conceptos a aprender;
- implementación;
- pruebas;
- revisión;
- resultado.

Evitar convertir un sprint en una planificación enorme.

El objetivo de cada sprint debe ser suficientemente pequeño para producir algo funcional.

---

## 14. Git

Usar Git desde el principio.

Los commits deben representar cambios comprensibles.

Ejemplos:

```text
feat: add historical date model
feat: add city dataset adapter
feat: render historical cities
fix: correct city coordinates
refactor: extract historical entity types
```

Evitar commits que mezclen muchos cambios sin relación.

---

## 15. Qué NO hacer

No:

- crear backend antes de necesitarlo;
- crear una base de datos antes de necesitarla;
- crear clases solo para "usar POO";
- crear patrones de diseño solo por cumplir una regla;
- crear abstracciones genéricas sin un caso de uso;
- llenar modelos con propiedades hipotéticas;
- inventar información histórica;
- convertir todos los datos en clases;
- asumir que todo debe ser configurable desde el principio;
- rediseñar una interfaz estable por problemas que todavía no existen.

---

## 16. Criterio para introducir una nueva abstracción

Antes de crear una clase, interfaz, servicio o capa nueva, responder:

1. ¿Qué problema actual resuelve?
2. ¿Tenemos código que justifique su existencia?
3. ¿Hace el código más claro?
4. ¿Reduce duplicación o complejidad real?
5. ¿Podemos resolverlo de forma más sencilla?

Si no existe un problema real, probablemente no necesitamos la abstracción todavía.

---

## 17. Objetivo inmediato

El siguiente flujo que debe completarse es:

```text
Dataset histórico
      ↓
lectura del dataset
      ↓
transformación al modelo JERX
      ↓
City[]
      ↓
React
      ↓
visualización básica
```

Después:

```text
City[]
      ↓
Mapbox
      ↓
ciudades visibles en el mapa
```

Y posteriormente se incorporarán:

- timeline;
- filtros temporales;
- imperios;
- civilizaciones;
- eventos;
- rutas;
- capas geográficas;
- visualización 3D.

---

## 18. Regla final

JERX debe evolucionar desde **datos reales + necesidades reales**.

No intentar construir desde el principio el sistema histórico definitivo.

> **Hazlo funcionar. Entiéndelo. Después mejóralo cuando exista una razón.**
