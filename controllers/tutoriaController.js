const { where } = require("sequelize");
const {
  Tutor,
  Estudiante,
  Materia,
  Programacion,
  Facturacion,
  Tutoria,
  Disponibilidad,
} = require("../models");
const { calcularHoras } = require("./utils/calcularHorasUtils");
const { obtenerValorHora } = require("./utils/getValorHoraUtils");
const {
  isValidDisponibilidadTutor,
} = require("./utils/validarDisponibilidadTutorUtils");

exports.getAllTutorias = async (req, res) => {
  try {
    const tutorias = await Tutoria.findAll({
      include: [
        { model: Tutor },
        { model: Estudiante },
        { model: Materia },
        { model: Programacion },
        { model: Facturacion },
      ],
    });
    if (tutorias.length === 0) {
      res.status(404).json({
        error: "No existen tutorias con los criterios consultados.",
      });
    } else {
      res.status(200).json({ tutorias: tutorias });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllTutoriasByTutor = async (req, res) => {
  try {
    const tutorias = await Tutoria.findAll({
      where: { id_tutor: req.params.id_tutor },
      include: [
        { model: Tutor },
        { model: Estudiante },
        { model: Materia },
        { model: Programacion },
        { model: Facturacion },
      ],
    });
    if (tutorias.length === 0) {
      res.status(404).json({
        error: "No existen tutorias con los criterios consultados.",
      });
    } else {
      res.status(200).json({ tutorias: tutorias });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllTutoriasByEstudiante = async (req, res) => {
  try {
    const tutorias = await Tutoria.findAll({
      where: { id_estudiante: req.params.id_estudiante },
      include: [
        { model: Tutor },
        { model: Estudiante },
        { model: Materia },
        { model: Programacion },
        { model: Facturacion },
      ],
    });
    if (tutorias.length === 0) {
      res.status(404).json({
        error: "No existen tutorias con los criterios consultados.",
      });
    } else {
      res.status(200).json({ tutorias: tutorias });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTutoriaById = async (req, res) => {
  try {
    const tutoria = await Tutoria.findByPk(req.params.id, {
      include: [
        { model: Tutor },
        { model: Estudiante },
        { model: Materia },
        { model: Programacion },
        { model: Facturacion },
      ],
    });
    if (!tutoria) {
      return res.status(404).json({ error: "Tutoria no encontrada." });
    } else {
      res.status(200).json({ tutoria: tutoria });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createTutoria = async (req, res) => {
  const { id_tutor, id_estudiante, id_materia, programacion } = req.body;
  try {
    if (!id_tutor || !id_estudiante || !id_materia || !programacion) {
      return res.status(400).json({ error: "Todos los campos son requeridos" });
    }

    const tutor = await Tutor.findByPk(id_tutor);
    if (!tutor) {
      return res.status(404).json({ error: "Tutor no encontrado." });
    }
    const estudiante = await Estudiante.findByPk(id_estudiante);
    if (!estudiante) {
      return res.status(404).json({ error: "Estudiante no encontrado." });
    }
    const materia = await Materia.findByPk(id_materia);
    if (!materia) {
      return res.status(404).json({ error: "Materia no encontrada." });
    }

    let programacionNew = null;

    // Crear nueva programación
    const disponibilidad = await Disponibilidad.findByPk(
      req.body.programacion.id_disponibilidad
    );
    if (!disponibilidad) {
      return res.status(404).json({ error: "Disponibilidad no encontrada." });
    }

    const validedDisponibilidad = await isValidDisponibilidadTutor(
      disponibilidad,
      req.body.programacion,
      id_tutor
    );

    if (!validedDisponibilidad.isValid) {
      return res.status(400).json({ error: validedDisponibilidad.message });
    }

    programacionNew = await Programacion.create(req.body.programacion);

    // Calcular horas de tutoría
    const horas = await calcularHoras(
      programacionNew.hora_inicio + ":00",
      programacionNew.hora_fin + ":00"
    );

    // Obtener valor por hora de la tutoría
    const valorHora = await obtenerValorHora(id_tutor, id_materia);

    // Crear nueva facturación
    const facturacionNew = await Facturacion.create({
      horas_tutoria: horas,
      valor_hora: valorHora,
      valor_total: horas * valorHora,
    });

    // Crear nueva tutoría
    const tutoria = await Tutoria.create({
      id_tutor: id_tutor,
      id_estudiante: id_estudiante,
      id_materia: id_materia,
      id_programacion: programacionNew.id,
      id_facturacion: facturacionNew.id,
    });

    res.status(201).json({
      tutoria: tutoria,
      programacion: programacionNew,
      facturacion: facturacionNew,
      message: "Tutoria creada exitosamente.",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
    throw error;
  }
};

exports.updateTutoria = async (req, res) => {
  const { hora_inicio, hora_fin } = req.body;
  try {
    if (!req.params.id || !hora_inicio || !hora_fin) {
      return res.status(400).json({ error: "Todos los campos son requeridos" });
    }

    const tutoriaUpdate = await Tutoria.findByPk(req.params.id);
    if (!tutoriaUpdate) {
      return res.status(404).json({ error: "La Tutoria no fue encontrada." });
    }

    const programacionUpdate = await Programacion.findByPk(
      tutoriaUpdate.id_programacion,
      {
        include: [{ model: Disponibilidad }],
      }
    );
    const facturacionUpdate = await Facturacion.findByPk(
      tutoriaUpdate.id_facturacion
    );
    if (
      !programacionUpdate ||
      !programacionUpdate.Disponibilidad ||
      !facturacionUpdate
    ) {
      return res
        .status(404)
        .json({ error: "La Programación o Facturación no fue encontrada." });
    }

    // Se completa el objeto programación enviado por el Body.
    req.body.programacion.id = programacionUpdate.id;
    req.body.programacion.fecha = programacionUpdate.fecha;

    const validedDisponibilidad = await isValidDisponibilidadTutor(
      programacionUpdate.Disponibilidad,
      req.body.programacion,
      tutoriaUpdate.id_tutor
    );

    if (!validedDisponibilidad.isValid) {
      return res.status(400).json({ error: validedDisponibilidad.message });
    }

    // Solo se permite actualizar las horas dentro de la misma fecha.
    programacionUpdate.hora_inicio = req.body.programacion.hora_inicio;
    programacionUpdate.hora_fin = req.body.programacion.hora_fin;
    await programacionUpdate.save();

    // Calcular horas de tutoría
    const horas = await calcularHoras(
      programacionUpdate.hora_inicio + ":00",
      programacionUpdate.hora_fin + ":00"
    );

    // Obtener valor por hora de la tutoría
    const valorHora = await obtenerValorHora(
      tutoriaUpdate.id_tutor,
      tutoriaUpdate.id_materia
    );

    // Asignar los nuevos valores a la instancia de facturacionUpdate
    facturacionUpdate.horas_tutoria = horas;
    facturacionUpdate.valor_hora = valorHora;
    facturacionUpdate.valor_total = horas * valorHora;

    // Actualizar facturación
    await facturacionUpdate.save();

    // Se consulta nuevamente la tutoria con las actualizaciones de
    // las asociaciones.
    const tutoria = await Tutoria.findByPk(tutoriaUpdate.id, {
      include: [
        { model: Tutor },
        { model: Estudiante },
        { model: Materia },
        { model: Programacion },
        { model: Facturacion },
      ],
    });

    res.status(201).json({
      tutoria: tutoria,
      programacion: programacionUpdate,
      facturacion: facturacionUpdate,
      message: "Tutoria actualizada exitosamente.",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
    throw error;
  }
};

exports.cancelarTutoria = async (req, res) => {
  try {
    const tutoria = await Tutoria.findByPk(req.params.id);
    if (!tutoria) {
      return res.status(404).json({ error: "Tutoria no encontrada." });
    }

    tutoria.estado = "Cancelada";
    await tutoria.save();

    res.json({ message: "Tutoria Cancelada." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
