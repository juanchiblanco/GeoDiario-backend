import Pais from "../models/pais.models.js";
import conectarDB from "../../db/config.js";
import paisesNormal from "../data/paisesNormal.js";

await conectarDB();

const normalizeText = (text) => {
  if (!text) return "";

  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .trim()
    .replace(/\s+/g, " ");
};

const asignarDificultad = (nombrePais) => {
  return paisesNormal.includes(normalizeText(nombrePais))
    ? "normal"
    : "dificil";
};

try {
  const paises = await Pais.find();

  let normales = 0;
  let dificiles = 0;

  for (const pais of paises) {
    const dificultad = asignarDificultad(pais.name.common);

    await Pais.updateOne(
      { _id: pais._id },
      {
        $set: {
          dificultad,
        },
      },
    );

    if (dificultad === "normal") {
      normales++;
    } else {
      dificiles++;
    }
  }
} catch (error) {
  console.error("❌ Error al actualizar dificultades:", error.message);
}
