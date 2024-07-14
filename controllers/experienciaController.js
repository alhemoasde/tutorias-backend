const { Tutor, Experiencia } = require("../models");

exports.getAllExperiencias = async (req, res) => {
  try {
    const experiencias = await Experiencia.findAll({
      include: [{ model: Tutor }],
    });
    if (experiencias.length === 0) {
      res.status(404).json({
        error: "No existen experiencias.",
      });
    } else {
      res.status(200).json({ experiencias: experiencias });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllExperienciasTutor = async (req, res) => {
  try {
    if (!req.params.id_tutor) {
      return res.status(400).json({ error: "No se envio el ID del Tutor" });
    }
    const experiencias = await Experiencia.findAll({
      where: { id_tutor: req.params.id_tutor },
      include: [{ model: Tutor }],
    });
    if (experiencias.length === 0) {
      res.status(404).json({
        error: "No existen experiencias para el Tutor.",
      });
    } else {
      res.status(200).json({ experiencias: experiencias });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getExperienciaById = async (req, res) => {
  try {
    const experiencia = await Experiencia.findByPk(req.params.id, {
      include: [{ model: Tutor }],
    });
    if (!experiencia) {
      return res.status(404).json({ error: "Experiencia no encontrado." });
    } else {
      res.status(200).json({ experiencia: experiencia });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createExperiencia = async (req, res) => {
  const { id_tutor, contratante, cargo, fecha_ingreso, fecha_salida } =
    req.body;
  try {
    if (
      !id_tutor ||
      !contratante ||
      !cargo ||
      !fecha_ingreso ||
      !fecha_salida
    ) {
      return res.status(400).json({ error: "Todos los campos son requeridos" });
    }

    const experienciaNew = await Experiencia.create(req.body);

    res.status(201).json({
      experiencia: experienciaNew,
      message: "Experiencia creada exitosamente.",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateExperiencia = async (req, res) => {
  const { contratante, cargo, fecha_ingreso, fecha_salida } = req.body;
  try {
    if (
      !req.params.id ||
      !contratante ||
      !cargo ||
      !fecha_ingreso ||
      !fecha_salida
    ) {
      return res
        .status(400)
        .json({ error: "Todos los campos son requeridos." });
    }
    const experienciaUpdate = await Experiencia.findByPk(req.params.id, {
      include: [{ model: Tutor }],
    });
    if (!experienciaUpdate) {
      return res.status(404).json({ error: "Experiencia no encontrada." });
    }
    await experienciaUpdate.update(req.body);
    res.json({
      experiencia: experienciaUpdate,
      message: "Experiencia actualizada exitosamente.",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteExperiencia = async (req, res) => {
  try {
    const experiencia = await Experiencia.findByPk(req.params.id);
    if (!experiencia) {
      return res.status(404).json({ error: "Experiencia no encontrada." });
    }
    await experiencia.destroy();
    res.json({ message: "Experiencia eliminada." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
