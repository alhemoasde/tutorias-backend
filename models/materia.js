'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Materia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Materia.init({
    nombre: DataTypes.STRING,
    intensidad_horaria: DataTypes.INTEGER,
    nivel_academico: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Materia',
  });
  return Materia;
};