// Importa los modelos y módulos necesarios
const { parse, differenceInHours } = require("date-fns");

const calcularHoras = async (hora_inicio, hora_fin) => {
  try {
    if (!hora_inicio || !hora_fin) {
      console.error("Hora de inicio o fin nul o vacia.");
      return 0;
    }

    // Parsing de las horas de inicio y fin
    const horaInicio = parse(hora_inicio, "HH:mm:ss", new Date());
    const horaFin = parse(hora_fin, "HH:mm:ss", new Date());

    // Calcular la diferencia en horas
    const horas = differenceInHours(horaFin, horaInicio);
    return horas;
  } catch (error) {
    console.error(
      "Error calculando las horas entre hora de inicio y fin.",
      error.message
    );
    throw error;
  }
};

module.exports = { calcularHoras };
