const { Estudiante, CalificacionesEstudiantes } = require("../models");

exports.getAllCalificacionEstudiante = async (req, res) => {
  try {
    const calificaciones = await CalificacionesEstudiantes.findAll({
      where: { id_estudiante: req.params.id_estudiante },
      include: [{ model: Estudiante }],
    });
    if (calificaciones.length === 0) {
      res.status(404).json({
        error: "No existen calificaciones para el Estudiante.",
      });
    } else {
      res.status(200).json({ calificaciones: calificaciones });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCalificacionById = async (req, res) => {
  try {
    const calificacion = await CalificacionesEstudiantes.findByPk(
      req.params.id,
      {
        include: [{ model: Estudiante }],
      }
    );
    if (!calificacion) {
      return res.status(404).json({ error: "Calificación no encontrada." });
    } else {
      res.status(200).json({ calificacion: calificacion });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createCalificacion = async (req, res) => {
  const { id_tutoria, id_estudiante, calificacion, comentario } = req.body;
  try {
    if (!id_tutoria || !id_estudiante || !calificacion || !comentario) {
      return res.status(400).json({ error: "Todos los campos son requeridos" });
    }

    const calificacionNew = await CalificacionesEstudiantes.create(req.body);

    res.status(201).json({
      calificacion: calificacionNew,
      message: "Calificacion creada exitosamente.",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCalificacion = async (req, res) => {
  const { calificacion, comentario } = req.body;
  try {
    if (!req.params.id || !calificacion || !comentario) {
      return res.status(400).json({ error: "Todos los campos son requeridos" });
    }
    const calificacionUpdate = await CalificacionesEstudiantes.findByPk(
      req.params.id,
      {
        include: [{ model: Estudiante }],
      }
    );
    if (!calificacionUpdate) {
      return res.status(404).json({ error: "Calificación no encontrada" });
    }
    await calificacionUpdate.update(req.body);
    res.json({
      materia: calificacionUpdate,
      message: "Calificación actualizada exitosamente.",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
