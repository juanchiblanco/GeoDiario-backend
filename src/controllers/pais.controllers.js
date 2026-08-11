import Pais from "../models/pais.models.js";

export const obtenerPaises = async (req, res) => {
  try {
    const paises = await Pais.find();
    (`✅ Se encontraron ${paises.length} países`);

    res.status(200).json(paises);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      mensaje: "Error al obtener los países",
    });
  }
};
export const obtenerPaisPorId = async (req, res) => {
  try {
    const buscarPais = await Pais.findById(req.params.id);

    if (!buscarPais) {
      return res.status(404).json({
        error: "Pais no encontrado",
      });
    }

    res.status(200).json(buscarPais);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error al obtener el pais",
    });
  }
};
