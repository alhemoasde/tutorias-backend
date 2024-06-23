'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SoportesAcademicos extends Model {
    static associate(models) {
      this.belongsTo(models.Tutor, {
        foreignKey: 'id_tutor'
      });
    }
  }
  SoportesAcademicos.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    programa_academico: {
      type: DataTypes.STRING,
      allowNull: false
    },
    institucion_educativa: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tipo_programa: {
      type: DataTypes.STRING,
      allowNull: false
    },
    area_estudio: DataTypes.STRING,
    condicion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    soporte_documental: {
      type: DataTypes.STRING,
      allowNull: false
    },
    id_tutor: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'SoportesAcademicos',
    tableName: 'Soportes_Academicos',
    timestamps: true
  });
  return SoportesAcademicos;
};
