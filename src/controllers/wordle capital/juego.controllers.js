import Pais from "../../models/pais.models.js";
import { obtenerNumeroDelDia } from "../../utilities/obtenerNumeroDelDia.js";

export const obtenerWordleCapital = async (req, res) => {
  try {
    const numeroDelDia = obtenerNumeroDelDia();

    const dificultad =
      req.query.dificultad === "dificil" ? "dificil" : "normal";

    const paises = await Pais.find({
      dificultad,
      capital: { $exists: true, $ne: [] },
    }).sort({ normalizedName: 1 });

    if (paises.length === 0) {
      return res.status(404).json({
        mensaje: `No se encontraron países de dificultad ${dificultad}`,
      });
    }

    const indice = numeroDelDia % paises.length;

    const paisSeleccionado = paises[indice];

    res.status(200).json({
      fecha: new Date().toISOString().split("T")[0],
      juego: "encontra-la-capital",
      dificultad,
      ciudad: paisSeleccionado.capital[0],
      pais: paisSeleccionado.name.common,
    });
  } catch (error) {
    console.error("❌ Error al obtener el desafío diario:", error);

    res.status(500).json({
      mensaje: "Error al obtener el desafío diario",
    });
  }
};