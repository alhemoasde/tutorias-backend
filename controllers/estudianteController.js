const { Tutor, Usuario, Estudiante } = require("../models");

exports.getAllEstudiantes = async (req, res) => {
  try {
    const estudiantes = await Estudiante.findAll({
      include: [{ model: Usuario }],
    });
    res.json(estudiantes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEstudianteById = async (req, res) => {
  try {
    const estudiante = await Estudiante.findByPk(req.params.id);
    if (!estudiante) {
      return res.status(404).json({ error: "Estudiante no encontrado." });
    }
    res.json(estudiante);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createEstudiante = async (req, res) => {
  try {
    const estudiante = await Estudiante.create(req.body);
    res.status(201).json(estudiante);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateEstudiante = async (req, res) => {
  try {
    const estudiante = await Estudiante.findByPk(req.params.id);
    if (!estudiante) {
      return res.status(404).json({ error: "Estudiante no encontrado" });
    }
    await estudiante.update(req.body);
    res.json(estudiante);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteEstudiante = async (req, res) => {
  try {
    const estudiante = await Estudiante.findByPk(req.params.id);
    if (!estudiante) {
      return res.status(404).json({ error: "Estudiante no encontrado" });
    }
    await estudiante.destroy();
    res.json({ message: "Estudiante eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
