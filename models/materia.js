'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Materia extends Model {
    static associate(models) {
      this.hasMany(models.TutoresMaterias, {
        foreignKey: 'Id_Materia'
      });
      this.hasMany(models.Tutoria, {
        foreignKey: 'Id_Materia'
      });
    }
  }
  Materia.init({
    Id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Intensidad_Horaria: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Nivel_Educativo: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Materia',
    tableName: 'Materias',
    timestamps: false
  });
  return Materia;
};
