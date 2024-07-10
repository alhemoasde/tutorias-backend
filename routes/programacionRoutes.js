const express = require("express");
const router = express.Router();
const programacionController = require("../controllers/programacionController");
const authMiddleware = require("../middleware/authMiddleware");
const authorizeMiddleware = require("../middleware/authorizeMiddleware");

router.get(
  "/",
  [authMiddleware, authorizeMiddleware(["ADMIN", "TUTOR", "ESTUDIANTE"])],
  programacionController.getAllProgramaciones
);
router.get(
  "/:id",
  [authMiddleware, authorizeMiddleware(["ADMIN", "TUTOR", "ESTUDIANTE"])],
  programacionController.getProgramacionId
);
router.get(
  "/tutor/:id",
  [authMiddleware, authorizeMiddleware(["ADMIN", "TUTOR", "ESTUDIANTE"])],
  programacionController.getProgramacionByTutor
);
router.get(
  "/estudiante/:id",
  [authMiddleware, authorizeMiddleware(["ADMIN", "TUTOR", "ESTUDIANTE"])],
  programacionController.getProgramacionByEstudiante
);
module.exports = router;
