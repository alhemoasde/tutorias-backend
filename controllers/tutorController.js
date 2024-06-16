const {
  Tutor,
  NivelEducativo,
  Usuario,
  Disponibilidad,
  TutorMateria,
} = require("../models");

exports.getAllTutores = async (req, res) => {
  try {
    const tutores = await Tutor.findAll({
      include: [
        { model: NivelEducativo },
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

// Otros métodos como getTutorById, createTutor, updateTutor, deleteTutor también se implementan aquí
