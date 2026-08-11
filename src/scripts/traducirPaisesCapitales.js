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

try {
  await conectarDB();

  const paises = await Pais.find();

  for (const pais of paises) {
    const nombrePaisOriginal = pais.name.common;

    const traduccionPais = countries.getName(pais.cca2, "es");

    const nombrePaisEspanol = traduccionPais || nombrePaisOriginal;

    const capitalesTraducidas = (pais.capital || []).map(traducirCapital);

    pais.name.common = nombrePaisEspanol;

    pais.normalizedName = normalizeText(nombrePaisEspanol);

    pais.capital = capitalesTraducidas;

    pais.normalizedCapital = capitalesTraducidas.map(normalizeText);

    await pais.save();
  }
} catch (error) {
  console.error("❌ Error al traducir países y capitales:", error.message);
} finally {
  process.exit();
}