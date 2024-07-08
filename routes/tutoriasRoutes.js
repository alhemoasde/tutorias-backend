const express = require("express");
const router = express.Router();
const tutoriaController = require("../controllers/tutoriaController");
const authMiddleware = require("../middleware/authMiddleware");
const authorizeMiddleware = require("../middleware/authorizeMiddleware");

router.get(
  "/",
  [authMiddleware, authorizeMiddleware(["ADMIN"])],
  tutoriaController.getAllTutorias
);
router.get(
  "/tutor/:id_tutor",
  [authMiddleware, authorizeMiddleware(["ADMIN", "TUTOR"])],
  tutoriaController.getAllTutoriasByTutor
);
router.get(
  "/estudiante/:id_estudiante",
  [authMiddleware, authorizeMiddleware(["ADMIN", "ESTUDIANTE"])],
  tutoriaController.getAllTutoriasByEstudiante
);
router.get(
  "/:id",
  [authMiddleware, authorizeMiddleware(["ADMIN", "TUTOR", "ESTUDIANTE"])],
  tutoriaController.getTutoriaById
);
router.post(
  "/",
  [authMiddleware, authorizeMiddleware(["ESTUDIANTE"])],
  tutoriaController.createTutoria
);
router.put(
  "/:id",
  [authMiddleware, authorizeMiddleware(["TUTOR", "ESTUDIANTE"])],
  tutoriaController.updateTutoria
);
router.delete(
  "/:id",
  [authMiddleware, authorizeMiddleware(["TUTOR", "ESTUDIANTE"])],
  tutoriaController.cancelarTutoria
);

module.exports = router;
