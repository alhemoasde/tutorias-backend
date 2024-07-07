const express = require("express");
const router = express.Router();
const archivoController = require("../controllers/archivoController");
const authMiddleware = require("../middleware/authMiddleware");
const authorizeMiddleware = require("../middleware/authorizeMiddleware");

const {
  uploadFoto,
  uploadSoporteAcademico,
} = require("../config/multerConfig");

router.get(
  "/",
  [authMiddleware, authorizeMiddleware(["ADMIN", "TUTOR", "ESTUDIANTE"])],
  archivoController.getAllArchivos
);
router.get(
  "/:id",
  [authMiddleware, authorizeMiddleware(["ADMIN", "TUTOR", "ESTUDIANTE"])],
  archivoController.getArchivoById
);
router.post(
  "/photo/:id_usuario",
  [authMiddleware, authorizeMiddleware(["ADMIN", "TUTOR", "ESTUDIANTE"])],
  uploadFoto.single("foto"),
  archivoController.createArchivoFotoPerfil
);
router.post(
  "/soporte/:id_soporte",
  [authMiddleware, authorizeMiddleware(["TUTOR"])],
  uploadSoporteAcademico.single("soportePdf"),
  archivoController.createArchivoSoporteAcademico
);
router.delete(
  "/:id",
  [authMiddleware, authorizeMiddleware(["ADMIN", "TUTOR", "ESTUDIANTE"])],
  archivoController.deleteArchivo
);
router.get(
  "/download/:id",
  [authMiddleware, authorizeMiddleware(["ADMIN", "TUTOR", "ESTUDIANTE"])],
  archivoController.getDownloadArchivo
);

module.exports = router;
