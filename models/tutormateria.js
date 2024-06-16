'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TutorMateria extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TutorMateria.init({
    Id_Tutor: DataTypes.INTEGER,
    Id_Materia: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TutorMateria',
  });
  return TutorMateria;
};