export const obtenerNumeroDelDia = () => {
  const fechaInicio = new Date("2026-07-22T00:00:00");

  const fechaActual = new Date();

  const diferenciaEnMilisegundos =
    fechaActual - fechaInicio;

  const milisegundosPorDia =
    1000 * 60 * 60 * 24;

  return Math.floor(
    diferenciaEnMilisegundos / milisegundosPorDia
  );
};