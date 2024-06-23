const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();

const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/authMiddleware");

const usuarioRoutes = require("./routes/usuarioRoutes");
const rolRoutes = require("./routes/rolRoutes");
const tutorRoutes = require("./routes/tutorRoutes");

// Middleware para parsear JSON
app.use(express.json());

// Usa cors como middleware
app.use(cors());

// Rutas públicas (login y register)
app.use("/api/auth", authRoutes);

// Middleware para proteger las rutas privadas
app.use(authMiddleware);

// Rutas protegidas
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/roles", rolRoutes);
app.use("/api/tutores", tutorRoutes);
// otras rutas también se incluyen aquí

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado por el puerto ${PORT}`);
});

module.exports = app;
