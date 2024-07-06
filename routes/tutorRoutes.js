const express = require("express");
const router = express.Router();
const tutorController = require("../controllers/tutorController");
const authMiddleware = require("../middleware/authMiddleware");
const authorizeMiddleware = require("../middleware/authorizeMiddleware");

router.get(
  "/",
  [authMiddleware, authorizeMiddleware(["ADMIN", "TUTOR", "ESTUDIANTE"])],
  tutorController.getAllTutores
);
router.get(
  "/:id",
  [authMiddleware, authorizeMiddleware(["ADMIN", "TUTOR", "ESTUDIANTE"])],
  tutorController.getTutorById
);
router.post(
  "/",
  [authMiddleware, authorizeMiddleware(["ADMIN"])],
  tutorController.createTutor
);
router.put(
  "perfil/:id",
  [authMiddleware, authorizeMiddleware(["ADMIN", "TUTOR"])],
  tutorController.updateTutor
);
router.delete(
  "/:id",
  [authMiddleware, authorizeMiddleware(["ADMIN", "TUTOR"])],
  tutorController.deleteTutor
);

module.exports = router;
