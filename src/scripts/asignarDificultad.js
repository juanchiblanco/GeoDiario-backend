import paisesNormal from "../data/paisesNormal.js"
import pais from "../models/pais.models.js"

const dificultad = paisesNormal.includes(pais.name.common.toUpperCase())
  ? "normal"
  : "dificil";