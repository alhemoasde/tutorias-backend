const express = require("express");
const router = express.Router();
const calificacionEstudianteController = require("../controllers/calificacionEstudianteController");
const authMiddleware = require("../middleware/authMiddleware");
const authorizeMiddleware = require("../middleware/authorizeMiddleware");

router.get(
  "/:id_estudiante",
  [authMiddleware, authorizeMiddleware(["ADMIN", "TUTOR", "ESTUDIANTE"])],
  calificacionEstudianteController.getAllCalificacionEstudiante
);
router.get(
  "/:id",
  [authMiddleware, authorizeMiddleware(["ADMIN", "TUTOR", "ESTUDIANTE"])],
  calificacionEstudianteController.getCalificacionById
);
router.post(
  "/",
  [authMiddleware, authorizeMiddleware(["TUTOR"])],
  calificacionEstudianteController.createCalificacion
);
router.put(
  "/:id",
  [authMiddleware, authorizeMiddleware(["TUTOR"])],
  calificacionEstudianteController.updateCalificacion
);

module.exports = router;
