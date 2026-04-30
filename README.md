# ✈️ SkyGuide - Explorador de Aeropuertos (Frontend React)

## React Basics - Proyecto 11 - RTC

> 🚀 **Deploy en vivo:** [https://skyguide-p11.vercel.app/](https://skyguide-p11.vercel.app/)

Interfaz de usuario para una plataforma de exploración de aeropuertos de España, construida con **React** i **Vite**. La aplicación permite a los usuarios consultar información técnica de aeropuertos, visualizar el clima en tiempo real y el estado de los vuelos mediante APIs externas, además de poner a prueba sus conocimientos con un sistema de quiz interactivo.

## 🚀 Tecnologías utilizadas

*   **React & Vite** - Biblioteca para la interfaz de usuario y entorno de desarrollo ultra rápido.
*   **JavaScript (ES6+)** - Lógica de componentes y gestión de estados asíncronos.
*   **CSS3** - Diseño modular, Flexbox, CSS Variables y adaptabilidad 100% Responsive.
*   **Aviationstack API** - Integración de datos aeronáuticos en tiempo real.
*   **OpenWeather API** - Consulta de condiciones meteorológicas dinámicas.

## 📂 Estructura del Proyecto
```text
📦 ReactBasics_P11_SkyGuide
┣ 📂 public           # Assets estáticos 
┣ 📂 src
┃ ┣ 📂 components     # Componentes modulares y reutilizables
┃ ┃ ┣ 📂 AirportCard  # Tarjeta individual de presentación de aeropuerto
┃ ┃ ┣ 📂 AirportGrid  # Cuadrícula para listar aeropuertos
┃ ┃ ┣ 📂 ExplorerHero # Cabecera principal del explorador
┃ ┃ ┣ 📂 Footer       # Pie de página
┃ ┃ ┣ 📂 Header       # Barra de navegación superior
┃ ┃ ┣ 📂 LiveFlights  # Gestión de vuelos en tiempo real (LiveFlights, FlightRow)
┃ ┃ ┗ 📂 LiveWeather  # Componente de visualización meteorológica
┃ ┣ 📂 data           # Mocks (JSON) y scripts de extracción de datos
┃ ┃ ┣ 📂 airports-spain
┃ ┃ ┗ 📂 flights-mock
┃ ┣ 📂 pages          # Vistas principales de la aplicación
┃ ┃ ┣ 📂 AirportDetail
┃ ┃ ┣ 📂 AirportsQuiz
┃ ┃ ┣ 📂 Explorer
┃ ┃ ┗ 📂 TopAirports
┃ ┣ 📂 utils          # Funciones de utilidad compartidas
┃ ┃ ┣ 📜 quizLogic.js
┃ ┃ ┣ 📜 shuffleAndPick.js
┃ ┃ ┗ 📜 weatherUtils.js
┃ ┣ 📜 App.css        # Estilos principales de la aplicación
┃ ┣ 📜 App.jsx        # Enrutador y estructura base
┃ ┗ 📜 main.jsx       # Punto de entrada de React
┣ 📜 .env             # Variables de entorno (API Keys)
┣ 📜 .env.example     # Plantilla de configuración de entorno
┣ 📜 .gitignore       # Archivos ignorados por Git
┗ 📜 package.json     # Dependencias y scripts de Vite
```

## 🛠️ Instalación y Configuración

1.  **Clonar el repositorio:**

    ```bash
    git clone [https://github.com/roliver97/ReactBasics_P11_SkyGuide.git](https://github.com/roliver97/ReactBasics_P11_SkyGuide.git)
    cd ReactBasics_P11_SkyGuide
    ```

2.  **Instalar dependencias:**

    ```bash
    npm install
    ```

3.  **Configurar variables de entorno:**
    Crea un archivo `.env` en la raíz basándote en `.env.example`:

    ```bash
    VITE_AVIATIONSTACK_KEY=tu_clave_aqui
    VITE_OPENWEATHER_KEY=tu_clave_aqui
    ```

4.  **Arranca el entorno de desarrollo:**
    ```bash
    npm run dev
    ```

## 🧩 Arquitectura de React

El proyecto se basa en una arquitectura orientada a la **Separación de Responsabilidades**, manteniendo un árbol de componentes claro y funcional:

- **Utils Centralizados:** Extracción de la lógica compleja de negocio (como el filtrado meteorológico en `weatherUtils.js` o la gestión del juego en `quizLogic.js`) fuera de los componentes visuales para facilitar su lectura y mantenimiento.
- **Jerarquía de Componentes:** Componentes como `LiveFlights` gestionan la lógica de filtrado y peticiones, delegando la representación visual a componentes hijos más pequeños como `FlightRow`.
- **Mocks Dinámicos (API Toggle):** Uso de datos locales (JSON) combinados con scripts de extracción (extract-photos-script.js) para asegurar la estabilidad del desarrollo. Se incluye un conmutador manual (const USE_REAL_API = false / true) en componentes clave como LiveFlights.jsx que permite alternar fácilmente entre datos simulados y peticiones a la API real, evitando agotar las cuotas de uso durante la programación.

**Por defecto, la aplicación utiliza datos locales (JSON) para asegurar la estabilidad del desarrollo (const USE_REAL_API = false). Para activar las peticiones a la API real, basta con cambiar esta constante a true en el componente LiveFlights.jsx**

## 🔐 UX y Funcionalidades

- **Detección Dinámica de Dispositivo:** Uso de listeners de `resize` con limpieza de efectos (`useEffect cleanup`) para adaptar la UI en tiempo real según el ancho de pantalla.
- **Filtrado Cronológico:** Algoritmos para mostrar salidas de vuelos próximas respecto a la hora actual.
- **Feedback Visual:** Implementación de estados de carga para mejorar la percepción de velocidad durante las peticiones de red asíncronas.

## 📡 Integración con APIs Externas

La aplicación consume datos de dos fuentes principales:

- **Aviationstack:** Obtención de números de vuelo, rutas (IATA), horarios programados y estados de retraso.
- **OpenWeather:** Información sobre temperatura yTens tota la raó, m'he inventat carpetes com `context`, `hooks` o `services` pensant en estructures de React genèriques, però el teu projecte és molt més net i va directe al gra.

---

Autor: Roman Oliver Gil
