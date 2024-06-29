const express = require("express");
const router = express.Router();
const disponibilidadController = require("../controllers/disponibilidadController");
const authMiddleware = require("../middleware/authMiddleware");
const authorizeMiddleware = require("../middleware/authorizeMiddleware");

router.get(
  "/",
  [authMiddleware, authorizeMiddleware(["ADMIN", "TUTOR", "ESTUDIANTE"])],
  disponibilidadController.getAllDisponibilidadTutor
);
router.get(
  "/:id",
  [authMiddleware, authorizeMiddleware(["ADMIN", "TUTOR", "ESTUDIANTE"])],
  disponibilidadController.getDisponibilidadById
);
router.post(
  "/",
  [authMiddleware, authorizeMiddleware(["TUTOR"])],
  disponibilidadController.createDisponibilidad
);
router.put(
  "/:id",
  [authMiddleware, authorizeMiddleware(["TUTOR"])],
  disponibilidadController.updateDisponibilidad
);
router.delete(
  "/:id",
  [authMiddleware, authorizeMiddleware(["TUTOR"])],
  disponibilidadController.deleteDisponibilidad
);

module.exports = router;
