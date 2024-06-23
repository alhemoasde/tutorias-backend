const express = require("express");
const router = express.Router();
const tutorController = require("../controllers/tutorController");
const authMiddleware = require("../middleware/authMiddleware");
const authorizeMiddleware = require("../middleware/authorizeMiddleware");

router.get(
  "/",
  [authMiddleware, authorizeMiddleware("ADMIN")],
  tutorController.getAllTutores
);
router.get(
  "/:id",
  [authMiddleware, authorizeMiddleware("ADMIN")],
  tutorController.getTutorById
);
router.post(
  "/",
  [authMiddleware, authorizeMiddleware("ADMIN")],
  tutorController.createTutor
);
router.put(
  "/:id",
  [authMiddleware, authorizeMiddleware("ADMIN")],
  tutorController.updateTutor
);
router.delete(
  "/:id",
  [authMiddleware, authorizeMiddleware("ADMIN")],
  tutorController.deleteTutor
);

module.exports = router;
