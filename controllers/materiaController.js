const { Tutor, Tutoria, TutoresMaterias, Materia } = require("../models");

exports.getAllMatarias = async (req, res) => {
  try {
    const materias = await Materia.findAll({
      include: [{ model: TutoresMaterias }],
    });
    if (materias.length === 0) {
      res.status(404).json({
        error: "No existen materias con los criterios consultados.",
      });
    } else {
      res.status(200).json({ materias });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMateriaById = async (req, res) => {
  try {
    const materia = await Materia.findByPk(req.params.id, {
      include: [{ model: TutoresMaterias }],
    });
    if (!materia) {
      return res.status(404).json({ error: "Materia no encontrada." });
    } else {
      res.status(200).json({ materia });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createMateria = async (req, res) => {
  const {
    nombre,
    intensidad_horaria,
    nivel_educativo,
    id_tutor,
    costo_hora_tutoria,
  } = req.body;
  try {
    if (
      !nombre ||
      !intensidad_horaria ||
      !nivel_educativo ||
      !id_tutor ||
      !costo_hora_tutoria
    ) {
      return res.status(400).json({ error: "Todos los campos son requeridos" });
    }

    const materia = await Materia.create(req.body);

    //Asociar tutor
    console.log(materia.id);
    console.log(id_tutor);
    console.log(costo_hora_tutoria);
    const tutorMateria = await TutoresMaterias.create({
      id_tutor: id_tutor,
      id_materia: materia.id,
      costo_hora_tutoria: costo_hora_tutoria,
    });

    res.status(201).json({ materia, message: "Materia creada exitosamente." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateMateria = async (req, res) => {
  const { nombre, intensidad_horaria, nivel_educativo } = req.body;
  try {
    if (!req.params.id || !nombre || !intensidad_horaria || !nivel_educativo) {
      return res.status(400).json({ error: "Todos los campos son requeridos" });
    }
    const materia = await Materia.findByPk(req.params.id);
    if (!materia) {
      return res.status(404).json({ error: "Materia no encontrada" });
    }
    await materia.update(req.body);
    res.json({ materia, message: "Materia actualizada exitosamente." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteMateria = async (req, res) => {
  try {
    const materia = await Materia.findByPk(req.params.id);
    if (!materia) {
      return res.status(404).json({ error: "Materia no encontrado." });
    }
    await materia.destroy();
    res.json({ message: "Materia eliminada." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
