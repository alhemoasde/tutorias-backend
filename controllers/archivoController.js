const { Usuario, SoportesAcademicos, Archivo } = require("../models");
const path = require("path");
const fs = require("fs");

exports.getAllArchivos = async (req, res) => {
  try {
    const files = await Archivo.findAll();
    if (files.length === 0) {
      res.status(404).json({
        error: "No existen Archivos por mostrar.",
      });
    } else {
      res.status(200).json({ files: files });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getArchivoById = async (req, res) => {
  try {
    const file = await Archivo.findByPk(req.params.id);
    if (!file) {
      return res.status(404).json({ error: "Archivo no encontrado." });
    } else {
      res.status(200).json({ file: file });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createArchivoFotoPerfil = async (req, res) => {
  const { id_usuario } = req.params;
  try {
    if (
      !req.file ||
      !id_usuario // Id del usuario bien sea Tutor o Estudiante
    ) {
      return res
        .status(400)
        .json({ error: "El archivo o el ID del Usuario no fue enviado" });
    }

    const usuario = await Usuario.findByPk(id_usuario);
    if(!usuario){
      return res
        .status(400)
        .json({ error: "El ID del Usuario no corresponde a algún existente." });
    }

    const fileEntity = await Archivo.create({
      entidad: "Usuario",
      id_entidad: id_usuario,
      nombre: req.file.originalname,
      contentType: req.file.mimetype,
      url: `uploads/photo/${id_usuario}/${req.file.filename}`,
    });

    res.status(201).json({
      file: fileEntity,
      message: "Archivo creado exitosamente.",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createArchivoSoporteAcademico = async (req, res) => {
  const { id_soporte } = req.params;
  try {
    if (
      !req.file ||
      !id_soporte // Id soporte academico
    ) {
      return res.status(400).json({
        error: "El archivo o el ID del Soportes Academicos no fue enviado",
      });
    }

    const soportAcadem = await SoportesAcademicos.findByPk(id_soporte);
    if(!soportAcadem){
      return res
        .status(400)
        .json({ error: "El ID del Soportes Academicos no corresponde a algún existente." });
    }

    const fileEntity = await Archivo.create({
      entidad: "SoportesAcademicos",
      id_entidad: id_soporte,
      nombre: req.file.originalname,
      contentType: req.file.mimetype,
      url: `uploads/pdf/${id_soporte}/${req.file.filename}`,
    });

    res.status(201).json({
      file: fileEntity,
      message: "Archivo creado exitosamente.",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteArchivo = async (req, res) => {
  try {
    const file = await Archivo.findByPk(req.params.id);
    if (!file) {
      return res.status(404).json({ error: "Archivo no encontrado." });
    }

    // Eliminar el archivo del disco
    fs.unlink(path.join(__dirname, `../${file.url}`), async (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      await file.destroy();

      return res.json({ message: "Archivo eliminado." });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDownloadArchivo = async (req, res) => {
  try {
    const file = await Archivo.findByPk(req.params.id);
    if (!file) {
      return res.status(404).json({ error: "Archivo en DB no encontrado." });
    }

    // Construir la ruta del archivo
    const filePath = path.resolve(__dirname, "../", file.url);

    // Verificar si el archivo existe
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        return res.status(404).json({
          error: "Archivo Storage no encontrado.",
          message: err.message,
        });
      }

      // Descargar el archivo
      res.download(filePath, (err) => {
        if (err) {
          res.status(500).json({ error: err.message });
        }
      });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
