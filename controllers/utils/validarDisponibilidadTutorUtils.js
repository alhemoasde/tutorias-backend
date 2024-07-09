// Importa los modelos y módulos necesarios
const { Disponibilidad, Programacion } = require("../../models");
const { calcularHoras } = require("./calcularHorasUtils");
const { isDatesEqual } = require("./validarIgualdadFechasUtils");

const isValidDisponibilidadTutor = async (
  disponibilidad,
  programacion,
  id_tutor
) => {
  try {
    let response = {
      isValid: false,
      message: "",
    };
    const disponibilidadTutor = await Disponibilidad.findOne({
      where: {
        id: disponibilidad.id,
        id_tutor: id_tutor,
      },
    });

    // Se valida si la disponibilida corresponde al tutor
    if (!disponibilidadTutor) {
      console.error("La Disponibilidad no corresponde al Tutor");
      response.message = "La Disponibilidad no corresponde al Tutor.";
      return response;
    }

    // Se valida que la fecha a programar coincida con la establecida en la Disponibilidad
    const isEqualDates = await isDatesEqual(
      disponibilidadTutor.fecha,
      programacion.fecha
    );
    if (!isEqualDates) {
      console.error(
        "La fecha a programar con coincide con la fecha de la disponibilidad"
      );
      response.isValid = false;
      response.message =
        "La fecha a programar con coincide con la fecha de la disponibilidad.";
      return response;
    }

    // Se obtienen las programaciones asociadas a la disponibilidad
    // Si la programación tiene ID se esta en proceso de actualización, 
    // se omite dicha programacion de los resultados.
    const programaciones = null;
    if (programacion.id) {
      programaciones = await Programacion.findAll({
        where: {
          id_disponibilidad: disponibilidad.id,
          id: programacion.id,
        },
      });
    } else {
      programaciones = await Programacion.findAll({
        where: {
          id_disponibilidad: disponibilidad.id,
        },
      });
    }

    // Obtener las horas que contempla la disponibilidad
    const horasDisponibilidad = await calcularHoras(
      disponibilidad.hora_inicio,
      disponibilidad.hora_fin
    );

    // Obtener las horas que se van a programar
    const horasAProgramar = await calcularHoras(
      programacion.hora_inicio + ":00",
      programacion.hora_fin + ":00"
    );
    let totalHorasProgramadas = 0;

    // Obtener las horas ya programadas de la disponibilidad
    for (const programacion of programaciones) {
      totalHorasProgramadas += await calcularHoras(
        programacion.hora_inicio,
        programacion.hora_fin
      );
    }

    // Se calculan las horas disponibles.
    console.log("Horas horasDisponibilidad:" + horasDisponibilidad);
    console.log("Horas totalHorasProgramadas:" + totalHorasProgramadas);
    const horasDisponibles = horasDisponibilidad - totalHorasProgramadas;

    console.log("Horas Disponibles:" + horasDisponibles);
    console.log("Horas A programar:" + horasAProgramar);
    console.log(horasAProgramar > horasDisponibles);

    // Se valida si es posible asignar mas horas.
    if (horasAProgramar > horasDisponibles) {
      console.error(
        "La Disponibilidad seleccionada no tiene horas disponibles"
      );
      response.message =
        "La Disponibilidad seleccionada no tiene horas disponibles.";
      return response;
    }

    // Si todas la validaciones son superadas.
    response.isValid = true;
    response.message = "Validación finalizada.";
    return response;
  } catch (error) {
    console.error(
      "Error procesando la valides de la disponibilidad seleccionada.",
      error.message
    );
    throw error;
  }
};

module.exports = { isValidDisponibilidadTutor };
