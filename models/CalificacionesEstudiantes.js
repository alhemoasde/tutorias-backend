"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class CalificacionesEstudiantes extends Model {
    static associate(models) {
      this.belongsTo(models.Tutoria, {
        foreignKey: "id_tutoria",
      });
      this.belongsTo(models.Estudiante, {
        foreignKey: "id_estudiante",
      });
    }
  }
  CalificacionesEstudiantes.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      fecha: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      calificacion: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      comentario: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      id_tutoria: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id_estudiante: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "CalificacionesEstudiantes",
      tableName: "Calificaciones_Estudiantes",
      timestamps: true,
    }
  );
  return CalificacionesEstudiantes;
};
