import { generarBaraja } from "./generarBaraja.js";

const generarSemilla = (texto) => {
  let semilla = 0;

  for (let i = 0; i < texto.length; i++) {
    semilla = (semilla << 5) - semilla + texto.charCodeAt(i);

    semilla |= 0;
  }

  return Math.abs(semilla);
};

export const obtenerBarajaDelCiclo = (
  elementos,
  numeroDelDia,
  nombreJuego
) => {
  const cantidadElementos = elementos.length;

  const ciclo = Math.floor(
    numeroDelDia / cantidadElementos
  );

  const posicion = numeroDelDia % cantidadElementos;

  let ultimoElementoAnterior = null;

  if (ciclo > 0) {
    const semillaAnterior = generarSemilla(
      `${nombreJuego}-${ciclo - 1}`
    );

    const barajaAnterior = generarBaraja(
      elementos,
      semillaAnterior
    );

    ultimoElementoAnterior =
      barajaAnterior[barajaAnterior.length - 1];
  }

  let baraja;
  let intento = 0;

  do {
    const semilla = generarSemilla(
      `${nombreJuego}-${ciclo}-${intento}`
    );

    baraja = generarBaraja(
      elementos,
      semilla
    );

    intento++;
  } while (
    ciclo > 0 &&
    baraja[0] === ultimoElementoAnterior
  );

  return {
    baraja,
    posicion,
    ciclo,
  };
};