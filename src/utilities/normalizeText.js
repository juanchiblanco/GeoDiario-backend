export const normalizeText = (text = "") => {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "")
    .replace(/[^A-Za-z]/g, "")
    .toUpperCase();
};
