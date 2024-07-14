const express = require("express");
const router = express.Router();
const contactoController = require("../controllers/contactoController");
const authorizeMiddleware = require("../middleware/authorizeMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

router.get(
  "/",
  [authMiddleware, authorizeMiddleware(["ADMIN"])],
  contactoController.getAllContactos
);
router.get(
  "/:id",
  [authMiddleware, authorizeMiddleware(["ADMIN"])],
  contactoController.getContactoById
);
router.post("/", contactoController.createContacto);

router.delete(
  "/:id",
  [authMiddleware, authorizeMiddleware(["ADMIN"])],
  contactoController.deleteContacto
);

module.exports = router;
