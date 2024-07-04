const express = require("express");
const router = express.Router();
const soporteAcademicoController = require("../controllers/soporteAcademicoController");
const authMiddleware = require("../middleware/authMiddleware");
const authorizeMiddleware = require("../middleware/authorizeMiddleware");

router.get(
  "/:id_tutor",
  [authMiddleware, authorizeMiddleware(["ADMIN", "TUTOR", "ESTUDIANTE"])],
  soporteAcademicoController.getAllSoportesAcademicosTutor
);
router.get(
  "/:id",
  [authMiddleware, authorizeMiddleware(["TUTOR"])],
  soporteAcademicoController.getSoportesAcademicosById
);
router.post(
  "/",
  [authMiddleware, authorizeMiddleware(["TUTOR"])],
  soporteAcademicoController.createSoporteAcademico
);
router.put(
  "/:id",
  [authMiddleware, authorizeMiddleware(["TUTOR"])],
  soporteAcademicoController.updateSoporteAcademico
);
router.delete(
  "/:id",
  [authMiddleware, authorizeMiddleware(["TUTOR"])],
  soporteAcademicoController.deleteSoporteAcademico
);

module.exports = router;
