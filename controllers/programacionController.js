const { where } = require("sequelize");
const { Disponibilidad, Programacion, Tutoria } = require("../models");

exports.getAllProgramaciones = async (req, res) => {
  try {
    const programacion = await Programacion.findAll({
      include: [{ model: Disponibilidad }],
    });
    if (programacion.length === 0) {
      res.status(404).json({
        error: "No existen Programaciones con los criterios consultados.",
      });
    } else {
      res.status(200).json({ programacion: programacion });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProgramacionId = async (req, res) => {
  try {
    const programacion = await Programacion.findByPk(req.params.id, {
      include: [{ model: Disponibilidad }],
    });
    if (!programacion) {
      return res.status(404).json({ error: "Programacion no encontrada." });
    } else {
      res.status(200).json({ programacion: programacion });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProgramacionByTutor = async (req, res) => {
  try {
    const programacion = await Programacion.findAll({
      include: [
        {
          model: Disponibilidad,
          where: {
            id_tutor: req.params.id,
          },
        },
      ],
    });
    if (!programacion) {
      return res
        .status(404)
        .json({ error: "Programacion para el Tutor no encontrada." });
    } else {
      res.status(200).json({ programacion: programacion });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProgramacionByEstudiante = async (req, res) => {
  try {
    const programacion = await Programacion.findAll({
      include: [
        {
          model: Tutoria,
          where: {
            id_estudiante: req.params.id,
          },
        },
      ],
    });
    if (!programacion) {
      return res
        .status(404)
        .json({ error: "Programacion para el Estudiante no encontrada." });
    } else {
      res.status(200).json({ programacion: programacion });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
