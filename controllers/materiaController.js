const { Tutor, Tutoria, TutorMateria, Materia } = require("../models");

exports.getAllMatarias = async (req, res) => {
  try {
    const materias = await Materia.findAll({
      include: [
        { model: Tutor },
        { model: Tutoria },
        { model: TutorMateria }
      ],
    });
    res.json(materias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMateriaById = async (req, res) => {
  try {
    const materia = await Materia.findByPk(req.params.id);
    if (!materia) {
      return res.status(404).json({ error: "Materia no encontrado." });
    }
    res.json(materia);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createMateria = async (req, res) => {
  try {
    const materia = await Materia.create(req.body);
    res.status(201).json(materia);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateMateria = async (req, res) => {
  try {
    const materia = await Materia.findByPk(req.params.id);
    if (!materia) {
      return res.status(404).json({ error: "Materia no encontrado" });
    }
    await materia.update(req.body);
    res.json(materia);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteMateria = async (req, res) => {
  try {
    const materia = await Materia.findByPk(req.params.id);
    if (!materia) {
      return res.status(404).json({ error: "Materia no encontrado" });
    }
    await materia.destroy();
    res.json({ message: "Materia eliminada" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
