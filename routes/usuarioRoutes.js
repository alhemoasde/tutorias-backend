const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");
const authMiddleware = require("../middleware/authMiddleware");
const authorizeMiddleware = require("../middleware/authorizeMiddleware");

router.get(
  "/",
  [authMiddleware, authorizeMiddleware(["ADMIN"])],
  usuarioController.getAllUsuarios
);
router.get(
  "/:id",
  [authMiddleware, authorizeMiddleware(["ADMIN"])],
  usuarioController.getUsuarioById
);
router.post(
  "/",
  [authMiddleware, authorizeMiddleware(["ADMIN"])],
  usuarioController.createUsuario
);
router.put(
  "/:id",
  [authMiddleware, authorizeMiddleware(["ADMIN"])],
  usuarioController.updateUsuario
);
router.delete(
  "/:id",
  [authMiddleware, authorizeMiddleware(["ADMIN"])],
  usuarioController.deleteUsuario
);

module.exports = router;
