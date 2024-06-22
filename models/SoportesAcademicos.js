'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SoportesAcademicos extends Model {
    static associate(models) {
      this.belongsTo(models.Tutor, {
        foreignKey: 'Id_Tutor'
      });
    }
  }
  SoportesAcademicos.init({
    Id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    Programa_Academico: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Institucion_Educativa: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Tpo_Programa: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Area_Estudio: DataTypes.STRING,
    Condicion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Soporte_Documental: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Id_Tutor: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'SoportesAcademicos',
    tableName: 'Soportes_Academicos',
    timestamps: false
  });
  return SoportesAcademicos;
};
