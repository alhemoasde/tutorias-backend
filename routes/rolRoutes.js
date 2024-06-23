const express = require("express");
const router = express.Router();
const rolController = require("../controllers/rolController");
const authMiddleware = require("../middleware/authMiddleware");
const authorizeMiddleware = require("../middleware/authorizeMiddleware");

router.get(
  "/",
  [authMiddleware, authorizeMiddleware("ADMIN")],
  rolController.getAllRoles
);
router.get(
  "/:id",
  [authMiddleware, authorizeMiddleware("ADMIN")],
  rolController.getRolById
);
router.post(
  "/",
  [authMiddleware, authorizeMiddleware("ADMIN")],
  rolController.createRol
);
router.put(
  "/:id",
  [authMiddleware, authorizeMiddleware("ADMIN")],
  rolController.updateRol
);
router.delete(
  "/:id",
  [authMiddleware, authorizeMiddleware("ADMIN")],
  rolController.deleteRol
);

module.exports = router;
