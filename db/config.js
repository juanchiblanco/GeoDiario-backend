import mongoose from "mongoose";

const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB);

    console.info("✅ Base de datos conectada");
  } catch (error) {
    console.error("❌ Error al conectar con la base de datos:", error);

    process.exit(1);
  }
};

export default conectarDB;