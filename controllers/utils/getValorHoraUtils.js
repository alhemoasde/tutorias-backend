// Importa los modelos y módulos necesarios
const { TutoresMaterias } = require("../../models");

const obtenerValorHora = async (id_tutor, id_materia) => {
  try {
    const tutorMateria = await TutoresMaterias.findOne({
      where: {
        id_tutor: id_tutor,
        id_materia: id_materia,
      },
    });

    if (!tutorMateria) {
      throw new Error("No se encontró la relación tutor-materia");
    }

    return tutorMateria.costo_hora_tutoria;
  } catch (error) {
    console.error(
      "Error al obtener el costo por hora de tutoría:",
      error.message
    );
    throw error;
  }
};

module.exports = { obtenerValorHora };
