const jwt = require("jsonwebtoken");
const { Usuario } = require("../models");

// Clave secreta para JWT
const JWT_SECRET = "NewApp_Dev_Agil_Group";

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "No se envio el token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;

    // Opcional: adjunte el objeto de usuario a la solicitud.
    const user = await Usuario.findByPk(req.userId);
    if (!user) {
      return res.status(401).json({ error: "Token invalido" });
    }
    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({ error: "Token invalido" });
  }
};

module.exports = authMiddleware;
