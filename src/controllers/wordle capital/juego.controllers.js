import Pais from "../../models/pais.models.js";
import { obtenerNumeroDelDia } from "../../utilities/obtenerNumeroDelDia.js";

export const obtenerWordleCapital = async (req, res) => {
  try {
     const numeroDelDia = obtenerNumeroDelDia();

    const paises = await Pais.find({
      capital: { $exists: true, $ne: [] },
    }).sort({ normalizedName: 1 });

    const indice = numeroDelDia % paises.length;

    const paisSeleccionado = paises[indice];

    res.status(200).json({
      fecha: new Date().toISOString().split("T")[0],
      juego: "encontra-la-ciudad",
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