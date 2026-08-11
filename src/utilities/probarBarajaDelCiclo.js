import { obtenerBarajaDelCiclo } from "./obtenerBarajaDelCiclo.js";

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

const diasAProbar = [
  0,
  1,
  2,
  8,
  9,
  10,
  11,
  18,
  19,
];

diasAProbar.forEach((numeroDelDia) => {
  const resultado = obtenerBarajaDelCiclo(
    paises,
    numeroDelDia,
    "capitales"
  );

  const paisSeleccionado =
    resultado.baraja[resultado.posicion];

  console.log(
    `Día ${numeroDelDia} | Ciclo ${resultado.ciclo} | Posición ${resultado.posicion} | País: ${paisSeleccionado}`
  );
});