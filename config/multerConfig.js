const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Función para crear directorio si no existe
const createDirectory = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Configuración de almacenamiento para fotos de perfil
const storageFoto = multer.diskStorage({
  destination: (req, file, cb) => {
    const { id_usuario } = req.params;
    if (!id_usuario || !file) {
      return cb(
        new Error("El id_usuario no fue proporcionado en la solicitud")
      );
    }
    const baseDir = path.join(__dirname, "../uploads/photo/"); // Directorio base
    const entityDir = path.join(baseDir, id_usuario); // Directorio basado en id_usuario

    // Crear directorio si no existe
    createDirectory(entityDir);

    cb(null, entityDir);
  },
  filename: (req, file, cb) => {
    const filename = `${Date.now()}_${file.originalname}`;
    cb(null, filename);
  },
});

// Configuración de almacenamiento para soportes académicos
const storageSoporteAcademico = multer.diskStorage({
  destination: (req, file, cb) => {
    const { id_soporte } = req.params;
    const baseDir = path.join(__dirname, "../uploads/pdf/"); // Directorio base
    const entityDir = path.join(baseDir, id_soporte); // Directorio basado en id_tutor

    // Crear directorio si no existe
    createDirectory(entityDir);

    cb(null, entityDir);
  },
  filename: (req, file, cb) => {
    const filename = `${Date.now()}_${file.originalname}`;
    cb(null, filename);
  },
});

// Filtro para validar el tipo de archivo
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "application/pdf" ||
    file.mimetype.startsWith("image/")
  ) {
    cb(null, true);
  } else {
    cb(new Error("Tipo de archivo no permitido"), false);
  }
};

const uploadFoto = multer({ storage: storageFoto, fileFilter: fileFilter });
const uploadSoporteAcademico = multer({
  storage: storageSoporteAcademico,
  fileFilter: fileFilter,
});

module.exports = { uploadFoto, uploadSoporteAcademico };
