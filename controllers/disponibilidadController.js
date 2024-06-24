const { Tutor, Programacion, Disponibilidad } = require("../models");

exports.getAllDisponibilidadTutor = async (req, res) => {
  try {
    const ahora = new Date();
    const ahoraFinDefault = new Date(ahora);
    ahoraFinDefault.setHours(ahoraFinDefault.getHours() + 3);

    const idTutor = req.body.id_tutor;
    const fecha = req.body.fecha ? new Date(req.body.fecha) : ahora;
    const horaInicio = req.body.horaInicio
      ? req.body.horaInicio
      : `${String(ahora.getHours()).padStart(2, "0")}:${String(
          ahora.getMinutes()
        ).padStart(2, "0")}`;
    const horaFin = req.body.horaFin
      ? req.body.horaFin
      : `${String(ahoraFinDefault.getHours()).padStart(2, "0")}:${String(
          ahoraFinDefault.getMinutes()
        ).padStart(2, "0")}`;

    if (!idTutor) {
      return res.status(400).json({ error: "id_tutor es requerido" });
    }

    const disponibilidades = await Disponibilidad.findAll({
      where: {
        id_tutor: idTutor,
        fecha: fecha,
        hora_inicio: {
          [db.Sequelize.Op.gte]: horaInicio,
        },
        hora_fin: {
          [db.Sequelize.Op.lte]: horaFin,
        },
      },
      include: [{ model: Tutor }, { model: Programacion }],
    });

    res.json(disponibilidades);
  } catch (error) {
    console.error("Error al obtener disponibilidades:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
};

exports.getDisponibilidadById = async (req, res) => {
  try {
    const disponibilidad = await Disponibilidad.findByPk(req.params.id);
    if (!disponibilidad) {
      return res.status(404).json({ error: "Disponibilidad no encontrado." });
    }
    res.json(disponibilidad);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createDisponibilidad = async (req, res) => {
  try {
    const disponibilidad = await Disponibilidad.create(req.body);
    res.status(201).json(disponibilidad);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateDisponibilidad = async (req, res) => {
  try {
    const disponibilidad = await Disponibilidad.findByPk(req.params.id);
    if (!disponibilidad) {
      return res.status(404).json({ error: "Disponibilidad no encontrada" });
    }
    await disponibilidad.update(req.body);
    res.json(disponibilidad);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteDisponibilidad = async (req, res) => {
  try {
    const disponibilidad = await Disponibilidad.findByPk(req.params.id);
    if (!disponibilidad) {
      return res.status(404).json({ error: "Disponibilidad no encontrado" });
    }
    await disponibilidad.destroy();
    res.json({ message: "Disponibilidad eliminada" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
