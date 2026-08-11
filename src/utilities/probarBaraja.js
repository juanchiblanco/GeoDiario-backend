import { generarBaraja } from "./generarBaraja.js";

const paises = [
  "Argentina",
  "Brasil",
  "Canadá",
  "España",
  "Francia",
  "Italia",
  "Japón",
  "México",
  "Perú",
  "Uruguay",
];

const baraja = generarBaraja(paises, 12345);

console.log(baraja);
