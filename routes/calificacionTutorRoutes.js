const express = require("express");
const router = express.Router();
const calificacionTutorController = require("../controllers/calificacionTutorController");
const authMiddleware = require("../middleware/authMiddleware");
const authorizeMiddleware = require("../middleware/authorizeMiddleware");

router.get(
  "/:id_tutor",
  [authMiddleware, authorizeMiddleware(["ADMIN", "TUTOR", "ESTUDIANTE"])],
  calificacionTutorController.getAllCalificacionTutor
);
router.get(
  "/:id",
  [authMiddleware, authorizeMiddleware(["ADMIN", "TUTOR", "ESTUDIANTE"])],
  calificacionTutorController.getCalificacionById
);
router.post(
  "/",
  [authMiddleware, authorizeMiddleware(["ESTUDIANTE"])],
  calificacionTutorController.createCalificacion
);
router.put(
  "/:id",
  [authMiddleware, authorizeMiddleware(["ESTUDIANTE"])],
  calificacionTutorController.updateCalificacion
);

module.exports = router;
