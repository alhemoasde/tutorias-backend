const { Tutor, SoportesAcademicos } = require("../models");

exports.getAllSoportesAcademicosTutor = async (req, res) => {
  try {
    const soporte = await SoportesAcademicos.findAll({
      where: { id_tutor: req.params.id_tutor },
      include: [{ model: Tutor }],
    });
    if (soporte.length === 0) {
      res.status(404).json({
        error: "No existen soportes academicos para el Tutor.",
      });
    } else {
      res.status(200).json({ soporteAcademico: soporte });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSoportesAcademicosById = async (req, res) => {
  try {
    const soporte = await SoportesAcademicos.findByPk(req.params.id, {
      include: [{ model: Tutor }],
    });
    if (!soporte) {
      return res
        .status(404)
        .json({ error: "Soporte academico no encontrado." });
    } else {
      res.status(200).json({ soporteAcademico: soporte });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createSoporteAcademico = async (req, res) => {
  const {
    id_tutor,
    programa_academico,
    institucion_educativa,
    tipo_programa,
    area_estudio,
    soporte_documental,
  } = req.body;
  try {
    if (
      !id_tutor ||
      !programa_academico ||
      !institucion_educativa ||
      !tipo_programa ||
      !area_estudio ||
      !soporte_documental
    ) {
      return res.status(400).json({ error: "Todos los campos son requeridos" });
    }

    const soporteNew = await SoportesAcademicos.create(req.body);

    res.status(201).json({
      soporteAcademico: soporteNew,
      message: "Soporte creado exitosamente.",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateSoporteAcademico = async (req, res) => {
  const {
    programa_academico,
    institucion_educativa,
    tipo_programa,
    area_estudio,
    soporte_documental,
  } = req.body;
  try {
    if (
      !req.params.id ||
      !programa_academico ||
      !institucion_educativa ||
      !tipo_programa ||
      !area_estudio ||
      !soporte_documental
    ) {
      return res.status(400).json({ error: "Todos los campos son requeridos" });
    }
    const soporteUpdate = await SoportesAcademicos.findByPk(req.params.id, {
      include: [{ model: Tutor }],
    });
    if (!soporteUpdate) {
      return res.status(404).json({ error: "Soporte academico no encontrado" });
    }
    await soporteUpdate.update(req.body);
    res.json({
      soporteAcademico: soporteUpdate,
      message: "Soporte academico actualizado exitosamente.",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteSoporteAcademico = async (req, res) => {
  try {
    const soporteAcademico = await SoportesAcademicos.findByPk(req.params.id);
    if (!soporteAcademico) {
      return res.status(404).json({ error: "Soporte academico no encontrado." });
    }
    await soporteAcademico.destroy();
    res.json({ message: "Soporte academico eliminado." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
