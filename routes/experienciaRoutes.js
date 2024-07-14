const express = require("express");
const router = express.Router();
const experienciaController = require("../controllers/experienciaController");
const authMiddleware = require("../middleware/authMiddleware");
const authorizeMiddleware = require("../middleware/authorizeMiddleware");

router.get(
  "/",
  [authMiddleware, authorizeMiddleware(["ADMIN", "TUTOR", "ESTUDIANTE"])],
  experienciaController.getAllExperiencias
);
router.get(
  "/tutor/:id_tutor",
  [authMiddleware, authorizeMiddleware(["ADMIN", "TUTOR", "ESTUDIANTE"])],
  experienciaController.getAllExperienciasTutor
);
router.get(
  "/:id",
  [authMiddleware, authorizeMiddleware(["ADMIN", "TUTOR", "ESTUDIANTE"])],
  experienciaController.getExperienciaById
);
router.post(
  "/",
  [authMiddleware, authorizeMiddleware(["TUTOR"])],
  experienciaController.createExperiencia
);
router.put(
  "/:id",
  [authMiddleware, authorizeMiddleware(["TUTOR"])],
  experienciaController.updateExperiencia
);
router.delete(
  "/:id",
  [authMiddleware, authorizeMiddleware(["TUTOR"])],
  experienciaController.deleteExperiencia
);

module.exports = router;
