const express = require("express");
const router = express.Router();
const materiaController = require("../controllers/materiaController");
const authMiddleware = require("../middleware/authMiddleware");
const authorizeMiddleware = require("../middleware/authorizeMiddleware");

router.get(
  "/",
  [authMiddleware, authorizeMiddleware(["ADMIN", "TUTOR", "ESTUDIANTE"])],
  materiaController.getAllMatarias
);
router.get(
  "/:id",
  [authMiddleware, authorizeMiddleware(["ADMIN", "TUTOR", "ESTUDIANTE"])],
  materiaController.getMateriaById
);
router.post(
  "/",
  [authMiddleware, authorizeMiddleware(["ADMIN", "TUTOR"])],
  materiaController.createMateria
);
router.put(
  "/:id",
  [authMiddleware, authorizeMiddleware(["ADMIN", "TUTOR"])],
  materiaController.updateMateria
);
router.delete(
  "/:id",
  [authMiddleware, authorizeMiddleware(["ADMIN", "TUTOR"])],
  materiaController.deleteMateria
);

module.exports = router;
