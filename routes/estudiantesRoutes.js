const express = require("express");
const router = express.Router();
const estudianteController = require("../controllers/estudianteController");
const authMiddleware = require("../middleware/authMiddleware");
const authorizeMiddleware = require("../middleware/authorizeMiddleware");

router.get(
  "/",
  [authMiddleware, authorizeMiddleware("ADMIN")],
  estudianteController.getAllEstudiantes
);
router.get(
  "/:id",
  [authMiddleware, authorizeMiddleware("ADMIN", "TUTOR")],
  estudianteController.getEstudianteById
);
router.post(
  "/",
  [authMiddleware, authorizeMiddleware("ADMIN")],
  estudianteController.createEstudiante
);
router.put(
  "perfil/:id",
  [authMiddleware, authorizeMiddleware("ADMIN", "ESTUDIANTE")],
  estudianteController.updateEstudiante
);
router.delete(
  "/:id",
  [authMiddleware, authorizeMiddleware("ADMIN", "ESTUDIANTE")],
  estudianteController.deleteEstudiante
);

module.exports = router;
