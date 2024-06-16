'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tutoria extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tutoria.init({
    fecha_solicitud: DataTypes.DATE,
    Id_Tutor: DataTypes.INTEGER,
    Id_Estudiante: DataTypes.INTEGER,
    Id_Materia: DataTypes.INTEGER,
    Id_Disponibilidad: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Tutoria',
  });
  return Tutoria;
};