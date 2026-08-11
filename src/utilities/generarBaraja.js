const crearGenerador = (semillaInicial) => {
  let semilla = semillaInicial;

  return () => {
    semilla = (semilla * 9301 + 49297) % 233280;

    return semilla / 233280;
  };
};

export const generarBaraja = (elementos, semilla) => {
  const baraja = [...elementos];

  const random = crearGenerador(semilla);

  for (let i = baraja.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));

    [baraja[i], baraja[j]] = [baraja[j], baraja[i]];
  }

  return baraja;
};