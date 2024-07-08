const { format, parseISO, isEqual } = require("date-fns");

const isDatesEqual = async (fechaA, fechaB) => {
  try {
    // Convertir las fechas en formato ISO
    const parseDateA = parseISO(fechaA);
    const parseDateB = parseISO(fechaB);

    // Formatear las fechas en "yyyy-MM-dd"
    const formattedDateA = format(parseDateA, "yyyy-MM-dd");
    const formattedDateB = format(parseDateB, "yyyy-MM-dd");

    // Comparar las fechas
    return isEqual(formattedDateA, formattedDateB);
  } catch (error) {
    console.error("Error comparando las fechas:", error.message);
    throw error;
  }
};

module.exports = { isDatesEqual };
