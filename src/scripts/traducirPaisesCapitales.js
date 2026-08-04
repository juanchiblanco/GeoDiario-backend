import countries from "i18n-iso-countries";

import conectarDB from "../../db/config.js";
import Pais from "../models/pais.models.js";
import capitalesEspanol from "../data/capitalesEspanol.js";

const normalizeText = (text) => {
  if (!text) return "";

  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .trim()
    .replace(/\s+/g, " ");
};

const traducirCapital = (capital) => {
  return capitalesEspanol[capital] || capital;
};

const capitalYaTraducida = (capital) => {
  return Object.values(capitalesEspanol).includes(capital);
};

try {
  console.log("🌎 Iniciando traducción de países y capitales...");

  await conectarDB();

  const paises = await Pais.find();

  console.log(`📦 Se encontraron ${paises.length} países`);

  let paisesTraducidos = 0;

  const paisesSinTraducir = [];

  const capitalesSinTraducir = new Set();

  for (const pais of paises) {
    const nombrePaisOriginal = pais.name.common;

    const traduccionPais = countries.getName(pais.cca2, "es");

    const nombrePaisEspanol = traduccionPais || nombrePaisOriginal;

    if (!traduccionPais) {
      paisesSinTraducir.push({
        codigo: pais.cca2,
        nombre: nombrePaisOriginal,
      });
    }

    const capitalesTraducidas = (pais.capital || []).map((capital) => {
      const existeComoClave = Object.prototype.hasOwnProperty.call(
        capitalesEspanol,
        capital,
      );

      const existeComoTraduccion = capitalYaTraducida(capital);

      if (!existeComoClave && !existeComoTraduccion) {
        capitalesSinTraducir.add(capital);
      }

      return traducirCapital(capital);
    });

    pais.name.common = nombrePaisEspanol;

    pais.normalizedName = normalizeText(nombrePaisEspanol);

    pais.capital = capitalesTraducidas;

    pais.normalizedCapital = capitalesTraducidas.map(normalizeText);

    await pais.save();

    paisesTraducidos++;

    console.log(`✅ ${nombrePaisEspanol} — ${capitalesTraducidas.join(", ")}`);
  }
  console.log("Traducción terminada correctamente");
  console.log(`🌎 Países actualizados: ${paisesTraducidos}`);

  console.log("🌎 PAÍSES SIN TRADUCCIÓN");

  if (paisesSinTraducir.length === 0) {
    console.log("✅ No quedaron países sin traducir");
  } else {
    paisesSinTraducir.forEach((pais) => {
      console.log(`❌ ${pais.codigo || "SIN CÓDIGO"} — ${pais.nombre}`);
    });
  }

  console.log("🏙️ CAPITALES SIN TRADUCCIÓN");

  if (capitalesSinTraducir.size === 0) {
    console.log("✅ No quedaron capitales sin traducir");
  } else {
    [...capitalesSinTraducir]
      .sort((a, b) => a.localeCompare(b))
      .forEach((capital) => {
        console.log(`"${capital}": "",`);
      });
  }

  console.log("");
  console.log(`📊 Total de países sin traducción: ${paisesSinTraducir.length}`);

  console.log(`📊 Total de capitales pendientes: ${capitalesSinTraducir.size}`);
} catch (error) {
  console.error("❌ Error al traducir países y capitales:", error.message);
} finally {
  process.exit();
}
