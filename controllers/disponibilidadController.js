const { Tutor, Programacion, Disponibilidad } = require("../models");
const sequelize = require("../config/config.json");
const { Op } = require("sequelize");
const { format, parseISO } = require("date-fns");

exports.getAllDisponibilidadTutor = async (req, res) => {
  try {
    const ahora = new Date();
    const ahoraFinDefault = new Date(ahora);
    ahoraFinDefault.setHours(23, 59, 0, 0);

    const idTutor = req.body.id_tutor;
    const fecha = req.body.fecha ? new Date(req.body.fecha) : ahora;
    const horaInicio = req.body.hora_inicio
      ? req.body.hora_inicio
      : `${String(ahora.getHours()).padStart(2, "0")}:${String(
          ahora.getMinutes()
        ).padStart(2, "0")}`;
    const horaFin = req.body.hora_fin
      ? req.body.hora_fin
      : `${String(ahoraFinDefault.getHours()).padStart(2, "0")}:${String(
          ahoraFinDefault.getMinutes()
        ).padStart(2, "0")}`;

    if (!idTutor) {
      return res.status(400).json({ error: "El ID del Tutor es requerido." });
    }

    const disponibilidades = await Disponibilidad.findAll({
      where: {
        id_tutor: idTutor,
        tipo_sesion: req.body.tipo_sesion,
        fecha: format(fecha, "yyyy-MM-dd"),
        hora_inicio: {
          [Op.gte]: horaInicio,
        },
        hora_fin: {
          [Op.lte]: horaFin,
        },
      },
      include: [{ model: Tutor }],
    });

    if (disponibilidades.length === 0) {
      res.status(404).json({
        error:
          "No existen disponibilidad para el tutor con los criterios consultados.",
      });
    } else {
      res.status(200).json({ disponibilidades });
    }
  } catch (error) {
    console.error("Error al obtener disponibilidades:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
};

exports.getDisponibilidadById = async (req, res) => {
  try {
    const disponibilidad = await Disponibilidad.findByPk(req.params.id, {
      include: [{ model: Tutor }],
    });
    if (!disponibilidad) {
      return res.status(404).json({ error: "Disponibilidad no encontrada." });
    }
    res.status(200).json({ disponibilidad });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createDisponibilidad = async (req, res) => {
  const { id_tutor, tipo_sesion, fecha, hora_inicio, hora_fin } = req.body;
  try {
    if (!id_tutor || !tipo_sesion || !fecha || !hora_inicio || !hora_fin) {
      return res.status(400).json({ error: "Todos los campos son requeridos" });
    }
    const disponibilidad = await Disponibilidad.create(req.body);
    res.status(201).json({
      disponibilidad,
      messagemessage: "Disponibilidad creada exitosamente.",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateDisponibilidad = async (req, res) => {
  const { id_tutor, tipo_sesion, fecha, hora_inicio, hora_fin } = req.body;
  try {
    if (
      !req.params.id ||
      !id_tutor ||
      !tipo_sesion ||
      !fecha ||
      !hora_inicio ||
      !hora_fin
    ) {
      return res.status(400).json({ error: "Todos los campos son requeridos" });
    }
    const disponibilidad = await Disponibilidad.findByPk(req.params.id);
    if (!disponibilidad) {
      return res.status(404).json({ error: "Disponibilidad no encontrada" });
    }
    await disponibilidad.update(req.body);
    res.status(200).json({
      disponibilidad,
      message: "Disponibilidad actualizada exitosamente.",
    });
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
    res.status(200).json({ message: "Disponibilidad eliminada" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
