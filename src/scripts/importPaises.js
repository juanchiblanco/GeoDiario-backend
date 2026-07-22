import axios from "axios";
import Pais from "../models/pais.models.js";
import conectarDB from "../../db/config.js";

console.log("🚀 Iniciando importación...");
await conectarDB();

// ------------------------------------
// Obtener todos los países desde la API
// ------------------------------------
const getAllCountries = async () => {
  const countries = [];

  let offset = 0;
  const limit = 25;
  let more = true;

  while (more) {
    console.log(`📥 Obteniendo países desde offset ${offset}...`);

    const response = await axios.get(
      "https://api.restcountries.com/countries/v5",
      {
        headers: {
          Authorization: `Bearer ${process.env.REST_COUNTRIES_API_KEY}`,
        },
        params: {
          limit,
          offset,
        },
      },
    );

    const data = response.data.data;

    countries.push(...data.objects);

    more = data.meta.more;
    offset += limit;
  }

  return countries;
};

// ------------------------------------
// Normalizar texto
// ------------------------------------
const normalizeText = (text) => {
  if (!text) return "";

  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .trim()
    .replace(/\s+/g, " ");
};

// ------------------------------------
// Transformar un país
// ------------------------------------
const transformarPais = (pais) => {
  const nombreComun = pais.names?.common || "";

  const nombreNormalizado = normalizeText(nombreComun);

  const capitales = pais.capitals?.map((capital) => capital.name || "") || [];

  const capitalesNormalizadas = capitales.map((capital) =>
    normalizeText(capital),
  );

  return {
    name: {
      common: nombreComun,

      official: pais.names?.official || "",

      nativeName: pais.names?.native || {},
    },

    normalizedName: nombreNormalizado,

    cca2: pais.codes?.alpha_2 || null,

    cca3: pais.codes?.alpha_3 || null,

    ccn3: pais.codes?.ccn3 || null,

    cioc: pais.codes?.cioc || null,

    region: pais.region || "",

    subregion: pais.subregion || "",

    continents: pais.continents || [],

    capital: capitales,

    normalizedCapital: capitalesNormalizadas,

    capitalInfo: pais.capitals || [],

    languages: pais.languages || [],

    currencies: pais.currencies || [],

    flag: pais.flag?.emoji || "",

    flags: {
      png: pais.flag?.url_png || "",

      svg: pais.flag?.url_svg || "",
    },

    coatOfArms: {},

    maps: {
      googleMaps: pais.links?.google_maps || "",

      openStreetMaps: pais.links?.open_street_maps || "",
    },

    population: pais.population ?? null,

    area: pais.area?.kilometers ?? null,

    latlng: pais.coordinates
      ? [pais.coordinates.lat, pais.coordinates.lng]
      : [],

    borders: pais.borders || [],

    timezones: pais.timezones || [],

    demonyms: pais.demonyms || {},

    startOfWeek: pais.date?.start_of_week || "",

    independent: pais.classification?.independent ?? null,

    unMember: pais.classification?.un_member ?? null,

    car: pais.cars || {},

    tld: pais.tlds || [],

    fifa: pais.codes?.fifa || "",

    postalCode: pais.postal_code || {},

    wordLength: nombreNormalizado.length,
  };
};

// ------------------------------------
// Ejecución principal
// ------------------------------------
try {
  const countries = await getAllCountries();

  console.log(`✅ Se obtuvieron ${countries.length} países`);

  const countriesTransformados = countries.map(transformarPais);

  console.log("✅ Países transformados correctamente");

  const paisesGuardados = await Pais.insertMany(countriesTransformados);

  console.log(`💾 Se guardaron ${paisesGuardados.length} países en MongoDB`);
} catch (error) {
  console.error(
    "❌ Error al importar países:",
    error.response?.data || error.message,
  );
}
