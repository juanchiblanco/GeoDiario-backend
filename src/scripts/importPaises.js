import axios from "axios";

console.log("🚀 Iniciando importación...");
console.log(process.env.REST_COUNTRIES_API_KEY);

try {
  const response = await axios.get(
    "https://api.restcountries.com/countries/v5",
    {
      headers: {
        Authorization: `Bearer ${process.env.REST_COUNTRIES_API_KEY}`,
      },
    }
  );

  console.log(response.data);
} catch (error) {
  console.error(error.response?.data || error.message);
}