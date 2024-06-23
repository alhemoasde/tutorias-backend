const {
  Tutor,
  Usuario,
  Disponibilidad,
  TutorMateria,
} = require("../models");

exports.getAllTutores = async (req, res) => {
  try {
    const tutores = await Tutor.findAll({
      include: [
        { model: Usuario },
        { model: Disponibilidad },
        { model: TutorMateria },
      ],
    });
    res.json(tutores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTutorById = async (req, res) => {
  try {
    const tutor = await Tutor.findByPk(req.params.id);
    if (!tutor) {
      return res.status(404).json({ error: "Tutor no encontrado." });
    }
    res.json(tutor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createTutor = async (req, res) => {
  try {
    const tutor = await Tutor.create(req.body);
    res.status(201).json(tutor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTutor = async (req, res) => {
  try {
    const tutor = await Tutor.findByPk(req.params.id);
    if (!tutor) {
      return res.status(404).json({ error: "Tutor no encontrado" });
    }
    await tutor.update(req.body);
    res.json(tutor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTutor = async (req, res) => {
  try {
    const tutor = await Tutor.findByPk(req.params.id);
    if (!tutor) {
      return res.status(404).json({ error: "Tutor no encontrado" });
    }
    await tutor.destroy();
    res.json({ message: "Tutor eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
