import Pais from "../../models/pais.models.js";
import { obtenerNumeroDelDia } from "../../utilities/obtenerNumeroDelDia.js";
import { obtenerBarajaDelCiclo } from "../../utilities/obtenerBarajaDelCiclo.js";

export const obtenerWordlePais = async (req, res) => {
  try {
    const numeroDelDia = obtenerNumeroDelDia();

    const dificultad = req.query.dificultad || "normal";

    const filtro = {};

    if (dificultad === "normal") {
      filtro.dificultad = "normal";
    }

    const paises = await Pais.find(filtro).sort({
      normalizedName: 1,
    });

    if (paises.length === 0) {
      return res.status(404).json({
        mensaje: "No hay países disponibles para esta dificultad",
      });
    }

    const resultadoBaraja = obtenerBarajaDelCiclo(
      paises,
      numeroDelDia,
      "paises"
    );

    const paisSeleccionado =
      resultadoBaraja.baraja[resultadoBaraja.posicion];

    res.status(200).json({
      fecha: new Date().toISOString().split("T")[0],
      juego: "encontra-el-pais",
      dificultad,
      pais: paisSeleccionado.name.common,
      bandera: paisSeleccionado.flags?.png || "",
      banderaEmoji: paisSeleccionado.flag || "",
    });
  } catch (error) {
    console.error("❌ Error al obtener el desafío diario:", error);

    res.status(500).json({
      mensaje: "Error al obtener el desafío diario",
    });
  }
};