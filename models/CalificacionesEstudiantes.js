"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class CalificacionesEstudiantes extends Model {
    static associate(models) {
      this.belongsTo(models.Tutoria, {
        foreignKey: "Id_Tutoria",
      });
      this.belongsTo(models.Estudiante, {
        foreignKey: "Id_Estudiante",
      });
    }
  }
  CalificacionesEstudiantes.init(
    {
      Id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      Fecha: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      Calificacion: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Comentario: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      Id_Tutoria: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Id_Estudiante: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "CalificacionesEstudiantes",
      tableName: "Calificaciones_Estudiantes",
      timestamps: false,
    }
  );
  return CalificacionesEstudiantes;
};
